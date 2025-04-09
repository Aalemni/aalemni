import { createClient } from "@/supabase/utils/server";
import { Tag_courses } from "@/types/types";

type GetAllTagsResponse = {
  success: boolean;
  message: string;
  data: Tag_courses[];
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

// Get all tags
export const getAllTags = async (): Promise<GetAllTagsResponse> => {
  const supabase = await createClient();

  const { data, error } = await supabase.from("tags").select("*");

  if (error) {
    return {
      success: false,
      message: error.message,
      data: [],
    };
  }

  return {
    success: true,
    message: "Tags retrieved successfully",
    data: data || [],
  };
};

// Add a new tag
export const addCategory = async (
  tag: Omit<Tag_courses, "tagid"> // Omit the ID field since it is auto-generated
): Promise<AddCategoryResponse> => {
  const supabase = await createClient();

  const { data, error } = await supabase.from("tags").insert([tag]);

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

// Edit an existing tag
export const editCategory = async (
  tagId: string,
  updatedFields: Partial<Tag_courses>
): Promise<EditCategoryResponse> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("tags")
    .update(updatedFields)
    .eq("id", tagId);

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

// Delete a tag
export const deleteCategory = async (
  tagId: string
): Promise<DeleteCategoryResponse> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("tags")
    .delete()
    .eq("id", tagId);

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
