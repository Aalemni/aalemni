import { createClient } from "@/supabase/utils/server";
import { Level_courses } from "@/types/types";

type GetAllLevelsResponse = {
  success: boolean;
  message: string;
  data: Level_courses[];
};

type AddLevelResponse = {
  success: boolean;
  message: string;
};

type EditLevelResponse = {
  success: boolean;
  message: string;
};

type DeleteLevelResponse = {
  success: boolean;
  message: string;
};

// Get all course levels
export const getAllCourseLevels = async (): Promise<GetAllLevelsResponse> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("course_levels")
    .select("*")
    .order("display_order", { ascending: true });

  if (error) {
    return {
      success: false,
      message: error.message,
      data: [],
    };
  }

  return {
    success: true,
    message: "Course levels retrieved successfully",
    data: data || [],
  };
};

// Add a new course level
export const addCourseLevel = async (
  level: Omit<Level_courses, "levelid"> // Omit the ID field since it is auto-generated
): Promise<AddLevelResponse> => {
  const supabase = await createClient();

  const { data, error } = await supabase.from("course_levels").insert([level]);

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }

  return {
    success: true,
    message: "Course level added successfully",
  };
};

// Edit an existing course level
export const editCourseLevel = async (
  levelId: string,
  updatedFields: Partial<Level_courses>
): Promise<EditLevelResponse> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("course_levels")
    .update(updatedFields)
    .eq("id", levelId);

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }

  return {
    success: true,
    message: "Course level updated successfully",
  };
};

// Delete a course level
export const deleteCourseLevel = async (
  levelId: string
): Promise<DeleteLevelResponse> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("course_levels")
    .delete()
    .eq("id", levelId);

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }

  return {
    success: true,
    message: "Course level deleted successfully",
  };
};
