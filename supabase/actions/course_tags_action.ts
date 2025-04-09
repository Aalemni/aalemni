import { createClient } from "@/supabase/utils/server";

type ModifyTagResponse = {
  success: boolean;
  message: string;
};

export const addTagsToCourse = async (
  courseId: string,
  tagIds: string[]
): Promise<ModifyTagResponse> => {
  const supabase = await createClient();

  const { data: existing, error: fetchError } = await supabase
    .from("course_tags")
    .select("coursetagid, tagids")
    .eq("courseid", courseId)
    .maybeSingle();

  if (fetchError) {
    return { success: false, message: fetchError.message };
  }

  if (existing) {
    const existingTags = existing.tagids || [];
    const updatedTags = Array.from(new Set([...existingTags, ...tagIds]));

    const { error: updateError } = await supabase
      .from("course_tags")
      .update({ tagids: updatedTags })
      .eq("coursetagid", existing.coursetagid);

    if (updateError) {
      return { success: false, message: updateError.message };
    }

    return {
      success: true,
      message: "Tags added to existing course_tags row.",
    };
  } else {
    const { error: insertError } = await supabase.from("course_tags").insert([
      {
        courseid: courseId,
        tagids: tagIds,
      },
    ]);

    if (insertError) {
      return { success: false, message: insertError.message };
    }

    return { success: true, message: "Tags added to new course_tags row." };
  }
};

export const removeTagsFromCourse = async (
  courseId: string,
  tagsToRemove: string[]
): Promise<ModifyTagResponse> => {
  const supabase = await createClient();

  const { data: existing, error: fetchError } = await supabase
    .from("course_tags")
    .select("coursetagid, tagids")
    .eq("courseid", courseId)
    .maybeSingle();

  if (fetchError || !existing) {
    return {
      success: false,
      message: fetchError?.message || "Course tag row not found.",
    };
  }

  const updatedTags = (existing.tagids || []).filter(
    (tag: string) => !tagsToRemove.includes(tag)
  );

  const { error: updateError } = await supabase
    .from("course_tags")
    .update({ tagids: updatedTags })
    .eq("coursetagid", existing.coursetagid);

  if (updateError) {
    return { success: false, message: updateError.message };
  }

  return {
    success: true,
    message: "Selected tag(s) removed from course.",
  };
};

export const clearTagsForCourse = async (
  courseId: string
): Promise<ModifyTagResponse> => {
  const supabase = await createClient();

  const { error } = await supabase
    .from("course_tags")
    .update({ tagids: [] })
    .eq("courseid", courseId);

  if (error) {
    return { success: false, message: error.message };
  }

  return {
    success: true,
    message: "All tags cleared for course.",
  };
};
