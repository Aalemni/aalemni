"use server";

import { encodedRedirect } from "@/utils/utils";
import { createClient } from "@/supabase/utils/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const signUpAction = async (formData: FormData) => {
  const name = formData.get("name")?.toString();
  const email = formData.get("email")?.toString();
  const username = formData.get("username")?.toString();
  const password = formData.get("password")?.toString();
  const confirm_password = formData.get("confirm_password")?.toString();
  const agree_terms = formData.get("agree_terms")?.toString();
  const phone = formData.get("phone")?.toString();
  const role = formData.get("role")?.toString() || "student";
  const rolee = formData.get("role")?.toString() || "student";
  const supabase = await createClient();
  const origin = (await headers()).get("origin") || "https://yourapp.com";

  if (!name)
    return {
      message: "Name is required!",
      success: false,
    };
  if (!username)
    return {
      message: "Username is required!",
      success: false,
    };
  if (!phone)
    return {
      message: "Phone number is required!",
      success: false,
    };
  if (!email || !password || !confirm_password) {
    return {
      message: "Email and password are required!",
      success: false,
    };
  }
  if (password !== confirm_password)
    return {
      message: "Password and Confirm Password should be the same!",
      success: false,
    };
  if (!agree_terms || agree_terms === "0") {
    return {
      message: "You must agree to the terms to sign up!",
      success: false,
    };
  }

  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    phone,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (authError) {
    console.error("Error signing up:", authError.code, authError.message);
    return {
      message: "An Error Occured: " + authError.message,
      success: false,
    };
  }

  const userID = authData.user?.id;
  if (!userID) {
    console.error("Error: User ID not found after sign-up.");
    return {
      message: "User creation failed. Please try again.",
      success: false,
    };
  }

  const { data, error } = await supabase.from("users").insert([
    {
      userid: userID,
      fullname: name,
      email,
      phonenumber: phone,
      username,
      role,
      status: "active",
    },
  ]);
  if (error) {
    return {
      message: "An Error Occured:" + error.message,
      success: false,
    };
  }

  console.log("User inserted successfully:", data);
  return {
    message:
      "Thanks for signing up! Please check your email for a verification link.",
    success: true,
  };
};

// export const signInAction = async (formData: FormData) => {
//   const email = formData.get("email") as string;
//   const password = formData.get("password") as string;
//   const supabase = await createClient();

//   const { error } = await supabase.auth.signInWithPassword({
//     email,
//     password,
//   });

//   if (error) {
//     return {
//       message: "An Error Occured: " + error.message,
//       success: false,
//     };
//   }

//   return {
//     message: "You have been logged in successfully!",
//     success: true,
//   };
// };

export const signInAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = await createClient();

  const { data: authData, error: authError } =
    await supabase.auth.signInWithPassword({
      email,
      password,
    });

  if (authError) {
    return {
      message: "An error occurred: " + authError.message,
      success: false,
    };
  }

  const userId = authData?.user?.id;
  if (!userId) {
    return {
      message: "Failed to retrieve user ID.",
      success: false,
    };
  }

  const { data: userData, error: userError } = await supabase
    .from("users")
    .select("role")
    .eq("userid", userId)
    .single();

  if (userError || !userData) {
    return {
      message: userError.message,
      success: false,
    };
  }

  return {
    message: "You have been logged in successfully!",
    success: true,
    role: userData.role,
  };
};

export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get("origin");
  const callbackUrl = formData.get("callbackUrl")?.toString();

  if (!email) {
    return {
      message: "Email is required!",
      success: false,
    };
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?redirect_to=/protected/reset-password`,
  });

  if (error) {
    console.error(error.message);
    return {
      message: "An Error Occured: " + error?.message,
      success: false,
    };
  }

  if (callbackUrl) {
    return redirect(callbackUrl);
  }

  return {
    message: "Check your email for a link to reset your password.",
    success: true,
  };
};

export const resetPasswordAction = async (formData: FormData) => {
  const supabase = await createClient();

  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!password || !confirmPassword) {
    return {
      message: "Password and confirm password are required",
      success: false,
    };
  }

  if (password !== confirmPassword) {
    return {
      message: "Passwords do not match!",
      success: false,
    };
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    return {
      message: "An Error Occured: " + error.message,
      success: false,
    };
  }

  return {
    message: "Password updated.",
    success: true,
  };
};

export const signOutAction = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return {
    message: "You have been signed out.",
    success: true,
  };
};
