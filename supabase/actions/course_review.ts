import { createClient } from "@/supabase/utils/server";

type CourseReview = {
  reviewid: string;
  courseid: string;
  userid: string;
  rating: number;
  comment?: string;
  created_at?: string;
};

type ReviewResponse = {
  success: boolean;
  message: string;
  data?: CourseReview[] | CourseReview | null;
};

export const getAllReviews = async (
  query?: string
): Promise<ReviewResponse> => {
  const supabase = await createClient();

  let reviewQuery = supabase
    .from("course_reviews")
    .select("*")
    .order("created_at", { ascending: false });

  if (query) {
    reviewQuery = reviewQuery.ilike("comment", `%${query}%`);
  }

  const { data, error } = await reviewQuery;

  if (error) {
    return { success: false, message: error.message };
  }

  return {
    success: true,
    message: "Course reviews fetched successfully.",
    data: data || [],
  };
};

export const addCourseReview = async (
  review: Omit<CourseReview, "reviewid" | "created_at">
): Promise<ReviewResponse> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("course_reviews")
    .insert([review])
    .select()
    .single();

  if (error) {
    return { success: false, message: error.message };
  }

  return {
    success: true,
    message: "Review added successfully.",
    data,
  };
};

export const editCourseReview = async (
  reviewid: string,
  updates: Partial<Omit<CourseReview, "reviewid" | "courseid" | "userid">>
): Promise<ReviewResponse> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("course_reviews")
    .update(updates)
    .eq("reviewid", reviewid)
    .select()
    .single();

  if (error) {
    return { success: false, message: error.message };
  }

  return {
    success: true,
    message: "Review updated successfully.",
    data,
  };
};

export const deleteCourseReview = async (
  reviewid: string
): Promise<ReviewResponse> => {
  const supabase = await createClient();

  const { error } = await supabase
    .from("course_reviews")
    .delete()
    .eq("reviewid", reviewid);

  if (error) {
    return { success: false, message: error.message };
  }

  return {
    success: true,
    message: "Review deleted successfully.",
  };
};
