"use server";

import { createClient } from "@/supabase/utils/server";
import { Course_courses, CoursePayload } from "@/types/types";

const validateCourseData = (data: Partial<CoursePayload>) => {
  const requiredFields = [
    "title",
    "name",
    "overview",
    "description",
    "levelId",
    "price",
  ];
  const missing = requiredFields.filter(
    (key) => !data[key as keyof CoursePayload]
  );
  if (missing.length > 0) {
    return `Missing required fields: ${missing.join(", ")}`;
  }
  return null;
};

export const createCourse = async (formData: FormData) => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      success: false,
      message: "You must be signed in to create a course.",
    };
  }

  const course: Partial<CoursePayload> = {
    title: formData.get("title")?.toString() || "",
    overview: formData.get("overview")?.toString() || "",
    description: formData.get("description")?.toString() || "",
    levelId: formData.get("levelId")?.toString() || "",
    price: parseFloat(formData.get("price")?.toString() || "0"),
    keyTopics: formData.get("keyTopics")?.toString()?.split(",") || [],
    resources: formData.get("resources")?.toString()?.split(",") || [],
  };

  const previewImage = formData.get("previewImage")?.toString();
  if (previewImage) {
    course.previewImage = previewImage;
  }

  const validationError = validateCourseData(course);
  if (validationError) {
    return { success: false, message: validationError };
  }

  const { error } = await supabase.from("courses").insert([
    {
      ...course,
      instructorId: user.id,
    },
  ]);

  if (error) {
    return {
      success: false,
      message: `Error creating course: ${error.message}`,
    };
  }

  return { success: true, message: "Course created successfully" };
};

type GetAllCoursesResponse = {
  success: boolean;
  message: string;
  data: Course_courses[];
};

export const getAllCourses = async (
  query = "",
  category = ""
): Promise<GetAllCoursesResponse> => {
  console.log(query, category);
  const supabase = await createClient();

  // Start with the basic query
  let queryBuilder = supabase
    .from("courses")
    .select("*, instructor:instructorid(*), category:categoryid(*)")
    .ilike("title", `%${query}%`); // Filter by title if there's a query

  // Add a filter for category if a category is provided
  if (category) {
    queryBuilder = queryBuilder.eq("categoryid", category);
  }

  // Execute the query
  const { data, error } = await queryBuilder;

  // Handle the error and return the result
  if (error) {
    return { success: false, message: error.message, data: [] };
  }

  return {
    success: true,
    message: "Courses retrieved successfully",
    data: data || [],
  };
};

export const getCoursesByCategories = async (
  categoryIds: string | string[]
) => {
  const supabase = await createClient();

  const searchCategoryIds = Array.isArray(categoryIds)
    ? categoryIds
    : categoryIds
      ? [categoryIds]
      : [];

  // get all courses in case no filter on categories was done
  if (searchCategoryIds.length === 0) {
    const { data: allCourses, error } = await supabase
      .from("courses")
      .select("*");

    if (error) {
      return {
        success: false,
        message: `Error fetching all courses: ${error.message}`,
      };
    }

    return {
      success: true,
      data: allCourses,
    };
  }

  // get based on categories if there's a filter
  const { data: courseCategoryMatches, error: fetchError } = await supabase
    .from("course_categories")
    .select("courseId")
    .filter("categoryIds", "cs", `{${searchCategoryIds.join(",")}}`);

  if (fetchError) {
    return {
      success: false,
      message: `Error fetching course categories: ${fetchError.message}`,
    };
  }

  const matchedCourseIds = courseCategoryMatches.map((row) => row.courseId);

  if (matchedCourseIds.length === 0) {
    return {
      success: true,
      data: [],
      message: "No courses found for the provided category IDs.",
    };
  }

  const { data: courses, error: coursesError } = await supabase
    .from("courses")
    .select("*")
    .in("id", matchedCourseIds);

  if (coursesError) {
    return {
      success: false,
      message: `Error fetching courses: ${coursesError.message}`,
    };
  }

  return {
    success: true,
    message: "Courses Fetched Successfully",
    data: courses,
  };
};

// export const editCourse = async (id: string, formData: FormData) => {
//   const supabase = await createClient();

//   const course: Partial<CoursePayload> = {
//     title: formData.get("title")?.toString() || "",
//     name: formData.get("name")?.toString() || "",
//     overview: formData.get("overview")?.toString() || "",
//     description: formData.get("description")?.toString() || "",
//     levelId: formData.get("levelId")?.toString() || "",
//     keyTopics: formData.get("keyTopics")?.toString()?.split(",") || [],
//     resources: formData.get("resources")?.toString()?.split(",") || [],
//   };

//   const previewImage = formData.get("previewImage")?.toString();
//   if (previewImage) {
//     course.previewImage = previewImage;
//   }

//   const validationError = validateCourseData(course);
//   if (validationError) {
//     return { success: false, message: validationError };
//   }

//   const { error } = await supabase.from("courses").update(course).eq("id", id);

//   if (error) {
//     return {
//       success: false,
//       message: `Failed to update course: ${error.message}`,
//     };
//   }

//   return { success: true, message: "Course updated successfully" };
// };

export const editCourse = async (id: string, formData: FormData) => {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (!user || userError) {
    return { success: false, message: "Unauthorized: You must be logged in." };
  }

  const { data: existingCourse, error: fetchError } = await supabase
    .from("courses")
    .select("instructorId")
    .eq("id", id)
    .single();

  if (fetchError || !existingCourse) {
    return { success: false, message: "Course not found or fetch failed." };
  }

  if (existingCourse.instructorId !== user.id) {
    return {
      success: false,
      message: "You are not authorized to edit this course.",
    };
  }

  const course: Partial<CoursePayload> = {
    title: formData.get("title")?.toString() || "",
    name: formData.get("name")?.toString() || "",
    overview: formData.get("overview")?.toString() || "",
    description: formData.get("description")?.toString() || "",
    levelId: formData.get("levelId")?.toString() || "",
    keyTopics: formData.get("keyTopics")?.toString()?.split(",") || [],
    resources: formData.get("resources")?.toString()?.split(",") || [],
  };

  const previewImage = formData.get("previewImage")?.toString();
  if (previewImage) {
    course.previewImage = previewImage;
  }

  const validationError = validateCourseData(course);
  if (validationError) {
    return { success: false, message: validationError };
  }

  const { error: updateError } = await supabase
    .from("courses")
    .update(course)
    .eq("id", id);

  if (updateError) {
    return {
      success: false,
      message: `Failed to update course: ${updateError.message}`,
    };
  }

  return { success: true, message: "Course updated successfully" };
};

// export const deleteCourse = async (id: string) => {
//   const supabase = await createClient();
//   const { error } = await supabase.from("courses").delete().eq("id", id);

//   if (error) {
//     return {
//       success: false,
//       message: `Failed to delete course: ${error.message}`,
//     };
//   }

//   return { success: true, message: "Course deleted successfully" };
// };

export const deleteCourse = async (id: string) => {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (!user || userError) {
    return { success: false, message: "Unauthorized: You must be logged in." };
  }

  const { data: course, error: fetchError } = await supabase
    .from("courses")
    .select("instructorId")
    .eq("id", id)
    .single();

  if (fetchError || !course) {
    return { success: false, message: "Course not found or fetch failed." };
  }

  if (course.instructorId !== user.id) {
    return {
      success: false,
      message: "You are not authorized to delete this course.",
    };
  }

  const { error: deleteError } = await supabase
    .from("courses")
    .delete()
    .eq("id", id);

  if (deleteError) {
    return {
      success: false,
      message: `Failed to delete course: ${deleteError.message}`,
    };
  }

  return { success: true, message: "Course deleted successfully" };
};
