import { createClient } from "@/supabase/utils/server";
import { Category_courses } from "@/types/types";

type GetAllCategoriesResponse = {
  success: boolean;
  message: string;
  data: Category_courses[];
};

type AddCategoryResponse = {
  success: boolean;
  message: string;
};

type EditCategoryResponse = {
  success: boolean;
  message: string;
};

type DeleteCategoryResponse = {
  success: boolean;
  message: string;
};

// Get all categories
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

// Add a new category
export const addCategory = async (
  category: Omit<Category_courses, "categoryid"> // Omit the ID field since it is auto-generated
): Promise<AddCategoryResponse> => {
  const supabase = await createClient();

  const { data, error } = await supabase.from("categories").insert([category]);

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }

  return {
    success: true,
    message: "Category added successfully",
  };
};

// Edit an existing category
export const editCategory = async (
  categoryId: string,
  updatedFields: Partial<Category_courses>
): Promise<EditCategoryResponse> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("categories")
    .update(updatedFields)
    .eq("id", categoryId);

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }

  return {
    success: true,
    message: "Category updated successfully",
  };
};

// Delete a category
export const deleteCategory = async (
  categoryId: string
): Promise<DeleteCategoryResponse> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("categories")
    .delete()
    .eq("id", categoryId);

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }

  return {
    success: true,
    message: "Category deleted successfully",
  };
};
