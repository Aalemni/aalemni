import { createClient } from "@/supabase/utils/server";
import { Category_courses } from "@/types/types";

type GetAllCategoriesResponse = {
  success: boolean;
  message: string;
  data: Category_courses[];
};

export const getAllCategories = async (): Promise<GetAllCategoriesResponse> => {
  const supabase = await createClient();

  const { data, error } = await supabase.from("categories").select("*");

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
