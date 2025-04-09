import { createClient } from "@/supabase/utils/server";

type LessonPayload = {
  moduleid: string;
  name: string;
  title: string;
  overview?: string;
  display_order: number;
};

type UpdateLessonPayload = Partial<Omit<LessonPayload, "moduleid">> & {
  lessonid: string;
};

type LessonResponse = {
  success: boolean;
  message: string;
  data?: any;
};

export const getLessonsForModule = async (
  moduleid: string
): Promise<LessonResponse> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("lesson")
    .select("*")
    .eq("moduleid", moduleid)
    .order("display_order", { ascending: true });

  if (error) {
    return { success: false, message: error.message };
  }

  return {
    success: true,
    message: "Lessons retrieved successfully.",
    data,
  };
};

export const addLesson = async (
  payload: LessonPayload
): Promise<LessonResponse> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("lesson")
    .insert(payload)
    .select();

  if (error) {
    return { success: false, message: error.message };
  }

  return {
    success: true,
    message: "Lesson added successfully.",
    data: data?.[0],
  };
};

export const updateLesson = async (
  payload: UpdateLessonPayload
): Promise<LessonResponse> => {
  const { lessonid, ...fieldsToUpdate } = payload;
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("lesson")
    .update(fieldsToUpdate)
    .eq("lessonid", lessonid)
    .select();

  if (error) {
    return { success: false, message: error.message };
  }

  return {
    success: true,
    message: "Lesson updated successfully.",
    data: data?.[0],
  };
};

export const deleteLesson = async (
  lessonid: string
): Promise<LessonResponse> => {
  const supabase = await createClient();

  const { error } = await supabase
    .from("lesson")
    .delete()
    .eq("lessonid", lessonid);

  if (error) {
    return { success: false, message: error.message };
  }

  return {
    success: true,
    message: "Lesson deleted successfully.",
  };
};
