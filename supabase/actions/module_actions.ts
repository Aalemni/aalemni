import { createClient } from "@/supabase/utils/server";

type ModulePayload = {
  courseid: string;
  name: string;
  title: string;
  overview?: string;
  display_order: number;
};

type UpdateModulePayload = Partial<Omit<ModulePayload, "courseid">> & {
  moduleid: string;
};

type ModuleResponse = {
  success: boolean;
  message: string;
  data?: any;
};

export const getModulesForCourse = async (
  courseid: string
): Promise<ModuleResponse> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("module")
    .select("*")
    .eq("courseid", courseid)
    .order("display_order", { ascending: true });

  if (error) {
    return { success: false, message: error.message };
  }

  return {
    success: true,
    message: "Modules retrieved successfully.",
    data,
  };
};

export const addModule = async (
  payload: ModulePayload
): Promise<ModuleResponse> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("module")
    .insert(payload)
    .select();

  if (error) {
    return { success: false, message: error.message };
  }

  return {
    success: true,
    message: "Module added successfully.",
    data: data?.[0],
  };
};

export const updateModule = async (
  payload: UpdateModulePayload
): Promise<ModuleResponse> => {
  const { moduleid, ...fieldsToUpdate } = payload;
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("module")
    .update(fieldsToUpdate)
    .eq("moduleid", moduleid)
    .select();

  if (error) {
    return { success: false, message: error.message };
  }

  return {
    success: true,
    message: "Module updated successfully.",
    data: data?.[0],
  };
};

export const deleteModule = async (
  moduleid: string
): Promise<ModuleResponse> => {
  const supabase = await createClient();

  const { error } = await supabase
    .from("module")
    .delete()
    .eq("moduleid", moduleid);

  if (error) {
    return { success: false, message: error.message };
  }

  return {
    success: true,
    message: "Module deleted successfully.",
  };
};
