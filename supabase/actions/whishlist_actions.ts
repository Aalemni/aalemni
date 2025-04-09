import { createClient } from "@/supabase/utils/server";

type WishlistResponse = {
  success: boolean;
  message: string;
  data?: string[];
};

export const getUserWishlist = async (
  userid: string
): Promise<WishlistResponse> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("course_wishlist")
    .select("courseids")
    .eq("userid", userid)
    .single();

  if (error) {
    return { success: false, message: error.message };
  }

  return {
    success: true,
    message: "Wishlist retrieved successfully",
    data: data?.courseids || [],
  };
};

export const addCoursesToWishlist = async (
  userid: string,
  newCourseIds: string[]
): Promise<WishlistResponse> => {
  const supabase = await createClient();

  const { data: existingWishlist } = await supabase
    .from("course_wishlist")
    .select("*")
    .eq("userid", userid)
    .single();

  if (!existingWishlist) {
    const { error: insertError } = await supabase
      .from("course_wishlist")
      .insert({ userid, courseids: newCourseIds });

    if (insertError) {
      return { success: false, message: insertError.message };
    }

    return {
      success: true,
      message: "Wishlist created and courses added.",
      data: newCourseIds,
    };
  } else {
    const uniqueCourseIds = Array.from(
      new Set([...(existingWishlist.courseids || []), ...newCourseIds])
    );

    const { error: updateError } = await supabase
      .from("course_wishlist")
      .update({ courseids: uniqueCourseIds })
      .eq("userid", userid);

    if (updateError) {
      return { success: false, message: updateError.message };
    }

    return {
      success: true,
      message: "Courses added to existing wishlist.",
      data: uniqueCourseIds,
    };
  }
};

export const removeCoursesFromWishlist = async (
  userid: string,
  courseIdsToRemove: string[]
): Promise<WishlistResponse> => {
  const supabase = await createClient();

  const { data: wishlist, error: fetchError } = await supabase
    .from("course_wishlist")
    .select("courseids")
    .eq("userid", userid)
    .single();

  if (fetchError) {
    return { success: false, message: fetchError.message };
  }

  const updatedCourseIds = (wishlist?.courseids || []).filter(
    (id: string) => !courseIdsToRemove.includes(id)
  );

  const { error: updateError } = await supabase
    .from("course_wishlist")
    .update({ courseids: updatedCourseIds })
    .eq("userid", userid);

  if (updateError) {
    return { success: false, message: updateError.message };
  }

  return {
    success: true,
    message: "Courses removed from wishlist.",
    data: updatedCourseIds,
  };
};

export const resetUserWishlist = async (
  userid: string
): Promise<WishlistResponse> => {
  const supabase = await createClient();

  const { error } = await supabase
    .from("course_wishlist")
    .update({ courseids: [] })
    .eq("userid", userid);

  if (error) {
    return { success: false, message: error.message };
  }

  return {
    success: true,
    message: "Wishlist reset successfully.",
    data: [],
  };
};
