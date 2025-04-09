import { createClient } from "@/supabase/utils/server";
import { Level_courses } from "@/types/types";

type GetAllLevelsResponse = {
  success: boolean;
  message: string;
  data: Level_courses[];
};

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
    message: "Categories retrieved successfully",
    data: data || [],
  };
};
