"use server";

import { encodedRedirect } from "@/utils/utils";
import { createClient } from "@/supabase/utils/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";


export const createNote = async (formData: FormData) => {
  const title = formData.get("title")?.toString();
  const description = formData.get("description")?.toString();
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user === null) {
    return encodedRedirect(
      "error",
      "/sign-in",
      "You must be signed in to create a note"
    );
  }
  await supabase
    .from("courses")
    .insert([{ title, description, user_id: user.id }]);
  return encodedRedirect("success", "/protected", "Note created");
};
