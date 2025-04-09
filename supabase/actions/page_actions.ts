import { createClient } from "@/supabase/utils/server";

type PagePayload = {
  lessonid: string;
  name: string;
  title: string;
  overview?: string;
  content?: string;
  display_order: number;
  estimatedduration: number;
  completed?: boolean;
};

type UpdatePagePayload = Partial<Omit<PagePayload, "lessonid">> & {
  pageid: string;
};

type PageResponse = {
  success: boolean;
  message: string;
  data?: any;
};

export const getPagesForLesson = async (
  lessonid: string
): Promise<PageResponse> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("page")
    .select("*")
    .eq("lessonid", lessonid)
    .order("display_order", { ascending: true });

  if (error) {
    return { success: false, message: error.message };
  }

  return {
    success: true,
    message: "Pages retrieved successfully.",
    data,
  };
};

export const addPage = async (payload: PagePayload): Promise<PageResponse> => {
  const supabase = await createClient();

  const { data, error } = await supabase.from("page").insert(payload).select();

  if (error) {
    return { success: false, message: error.message };
  }

  return {
    success: true,
    message: "Page added successfully.",
    data: data?.[0],
  };
};

export const updatePage = async (
  payload: UpdatePagePayload
): Promise<PageResponse> => {
  const { pageid, ...fieldsToUpdate } = payload;
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("page")
    .update(fieldsToUpdate)
    .eq("pageid", pageid)
    .select();

  if (error) {
    return { success: false, message: error.message };
  }

  return {
    success: true,
    message: "Page updated successfully.",
    data: data?.[0],
  };
};

export const deletePage = async (pageid: string): Promise<PageResponse> => {
  const supabase = await createClient();

  const { error } = await supabase.from("page").delete().eq("pageid", pageid);

  if (error) {
    return { success: false, message: error.message };
  }

  return {
    success: true,
    message: "Page deleted successfully.",
  };
};
