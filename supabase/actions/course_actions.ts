"use server";

import { createClient } from "@/supabase/utils/server";
import {
  Course_courses,
  Course_courses_with_level,
  CoursePayload,
} from "@/types/types";
import { validate as isUuid } from "uuid";

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

type CourseDuration = {
  courseid: string;
  total_duration_minutes: number;
};

type CourseRating = {
  courseid: string;
  average_rating: number;
};

type GetAllCoursesResponseWithLevel = {
  success: boolean;
  message: string;
  data: Course_courses_with_level[];
};
// export const getAllCourses = async (
//   query = "",
//   categories: string[] = [],
//   minPrice: number = -1,
//   maxPrice: number = -1,
//   levels: string[] = [],
//   duration: string[] = []
// ): Promise<GetAllCoursesResponse> => {
//   const validCategories = categories.filter((categoryId) => isUuid(categoryId));
//   const validLevels = levels.filter((levelId) => isUuid(levelId));

//   const supabase = await createClient();
//   console.log(categories);

//   let queryBuilder = supabase
//     .from("courses")
//     .select("*, instructor:instructorid(*), category:categoryid(*)")
//     .ilike("title", `%${query}%`);

//   if (validCategories.length > 0) {
//     console.log("Filtering by categories:", validCategories);
//     queryBuilder = queryBuilder.in("categoryid", validCategories);
//   }

//   if (validLevels.length > 0) {
//     console.log("Filtering by levels:", validLevels);
//     queryBuilder = queryBuilder.in("levelid", validLevels);
//   }

//   if (minPrice == -1 || maxPrice == -1) {
//   } else {
//     console.log("Filtering by price:", { minPrice, maxPrice });
//     queryBuilder = queryBuilder.gte("price", minPrice).lte("price", maxPrice);
//   }

//   const { data, error } = await queryBuilder;

//   if (error) {
//     return { success: false, message: error.message, data: [] };
//   }

//   return {
//     success: true,
//     message: "Courses retrieved successfully",
//     data: data || [],
//   };
// };

export const getAllCourses = async (
  query = "",
  categories: string[] = [],
  minPrice: number = -1,
  maxPrice: number = -1,
  levels: string[] = [],
  duration: string[] = [],
  ratings: string[] = []
): Promise<GetAllCoursesResponse> => {
  const supabase = await createClient();

  const validCategories = categories.filter(isUuid);
  const validLevels = levels.filter(isUuid);

  let courseQuery = supabase
    .from("courses")
    .select("*, instructor:instructorid(*), category:categoryid(*)")
    .ilike("title", `%${query}%`);

  if (validCategories.length) {
    courseQuery = courseQuery.in("categoryid", validCategories);
  }

  if (validLevels.length) {
    courseQuery = courseQuery.in("levelid", validLevels);
  }

  if (minPrice !== -1 && maxPrice !== -1) {
    courseQuery = courseQuery.gte("price", minPrice).lte("price", maxPrice);
  }

  const [coursesResult, durationsResult, ratingsResult] = await Promise.all([
    courseQuery,
    supabase.rpc("get_course_durations"),
    supabase.rpc("get_course_ratings"),
  ]);

  const { data: courses, error: courseError } = coursesResult;
  const { data: durationsData, error: durationError } = durationsResult;
  const { data: ratingsData, error: ratingsError } = ratingsResult;

  console.log(courses);
  console.log(durationsData);
  console.log(ratingsData);
  if (courseError || !courses) {
    return {
      success: false,
      message: courseError?.message || "Failed to fetch courses",
      data: [],
    };
  }

  if (durationError || !durationsData) {
    return {
      success: false,
      message: durationError?.message || "Failed to fetch course durations",
      data: [],
    };
  }

  if (ratingsError || !ratingsData) {
    return {
      success: false,
      message: ratingsError?.message || "Failed to fetch course ratings",
      data: [],
    };
  }

  const durationMap = new Map<string, number>(
    durationsData.map((d: CourseDuration) => [
      d.courseid,
      d.total_duration_minutes,
    ])
  );

  const ratingMap = new Map<string, number>(
    ratingsData.map((r: CourseRating) => [
      r.courseid,
      Number(r.average_rating.toFixed(1)),
    ])
  );

  const durationRangesInMinutes = duration.map((range) => {
    const [minH, maxH] = range.split("-").map(Number);
    return {
      min: minH * 60,
      max: maxH ? maxH * 60 : Infinity,
    };
  });

  const selectedRatings = ratings.map(Number);

  const finalCourses = courses.filter((course) => {
    const totalMinutes = durationMap.get(course.courseid);
    const avgRating = ratingMap.get(course.courseid);

    if (!totalMinutes || !avgRating) return false;

    const matchesDuration =
      durationRangesInMinutes.length === 0 ||
      durationRangesInMinutes.some(
        (range) => totalMinutes >= range.min && totalMinutes <= range.max
      );

    const matchesRating =
      selectedRatings.length === 0 || selectedRatings.includes(avgRating);

    return matchesDuration && matchesRating;
  });

  return {
    success: true,
    message: "Courses retrieved successfully",
    data: finalCourses,
  };
};

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

type SyllabusResponse = {
  success: boolean;
  message: string;
  data?: any;
};

// Course_courses_with_level
export const getFeaturedCoursesWithDetails =
  async (): Promise<GetAllCoursesResponseWithLevel> => {
    const supabase = await createClient();

    // Step 1: Get all featured course ids
    const { data: featuredCourses, error: featuredCoursesError } =
      await supabase.from("featured_courses").select("courseid");

    if (featuredCoursesError || !featuredCourses) {
      console.error("Error fetching featured courses:", featuredCoursesError);
      return {
        success: false,
        message:
          featuredCoursesError.message ||
          "Error While getting featured courses",
        data: [],
      };
    }

    // Step 2: Get courses details based on courseid from featured_courses
    const { data: courses, error: coursesError } = await supabase
      .from("courses")
      .select(
        "*, instructor:instructorid(*), category:categoryid(*), level:levelid(*)"
      )
      .in(
        "courseid",
        featuredCourses.map((course) => course.courseid)
      );

    if (coursesError || !courses) {
      console.error("Error fetching courses:", coursesError);
      return {
        success: false,
        message: coursesError.message || "Error While getting courses",
        data: [],
      };
    }

    return {
      success: true,
      message: "Featched Courses successfully",
      data: courses,
    };
  };

interface Page {
  pageid: string;
  name: string;
  title: string;
  overview?: string;
  content?: string;
  display_order: number;
  estimatedduration: number;
  completed?: boolean;
}

interface Lesson {
  lessonid: string;
  name: string;
  title: string;
  overview?: string;
  display_order: number;
  page?: Page[];
}

interface Module {
  moduleid: string;
  courseid: string;
  name: string;
  title: string;
  overview?: string;
  display_order: number;
  lesson?: Lesson[];
}

export const getCourseSyllabus = async (
  courseid: string
): Promise<SyllabusResponse> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("module")
    .select(
      `
        *,
        lesson:lessonid (
          *,
          page:pageid (
            *
          )
        )
      `
    )
    .eq("courseid", courseid)
    .order("display_order", { ascending: true });

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }

  const formattedModules = (data as Module[]).map((module: Module) => ({
    ...module,
    lessons:
      module.lesson?.map((lesson: Lesson) => ({
        ...lesson,
        pages: lesson.page || [],
      })) || [],
  }));

  return {
    success: true,
    message: "Syllabus fetched successfully.",
    data: formattedModules,
  };
};
