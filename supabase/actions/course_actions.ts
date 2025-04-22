"use server";

import { createClient } from "@/supabase/utils/server";
import {
  Course_by_id,
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
  courses_count: number;
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

type GetCourseByID = {
  success: boolean;
  message: string;
  data: Course_by_id;
};

export const getAllCourses_OLD = async (
  query = "",
  categories: string[] = [],
  minPrice: number = -1,
  maxPrice: number = -1,
  levels: string[] = [],
  duration: string[] = [],
  ratings: string[] = [],
  currentPage = 1,
  pageSize = 9,
  sortBy = "none"
): Promise<GetAllCoursesResponse> => {
  const supabase = await createClient();

  const validCategories = categories.filter(isUuid);
  const validLevels = levels.filter(isUuid);

  const from = (currentPage - 1) * pageSize;
  const to = from + pageSize - 1;

  let courseQuery = supabase
    .from("courses")
    .select("*, instructor:instructorid(*), category:categoryid(*)")
    .or(`title.ilike.%${query}%,overview.ilike.%${query}%`)


  const { data, count } = await supabase
    .from("courses")
    .select("*", { count: "exact" });

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

  if (courseError || !courses) {
    return {
      success: false,
      message: courseError?.message || "Failed to fetch courses",
      data: [],
      courses_count: 0,
    };
  }

  if (durationError || !durationsData) {
    return {
      success: false,
      message: durationError?.message || "Failed to fetch course durations",
      data: [],
      courses_count: 0,
    };
  }

  if (ratingsError || !ratingsData) {
    return {
      success: false,
      message: ratingsError?.message || "Failed to fetch course ratings",
      data: [],
      courses_count: 0,
    };
  }

  const durationMap = new Map<string, number>(
    durationsData.map((d: CourseDuration) => [
      d.courseid,
      d.total_duration_minutes,
    ])
  );
  const ratingMap = new Map<string, number>(
    courses.map((course) => {
      const courseRating = ratingsData.find(
        (r: CourseRating) => r.courseid === course.courseid
      );
      const average = courseRating
        ? Number(courseRating.average_rating.toFixed(1))
        : 0; // or `null`
      return [course.courseid, average];
    })
  );

  const durationRangesInMinutes = duration.map((range) => {
    const [minH, maxH] = range.split("-").map(Number);
    return {
      min: minH * 60,
      max: maxH ? maxH * 60 : Infinity,
    };
  });

  const selectedRatings = ratings.map(Number);

  const finalCourses = courses
    .map((course) => {
      const totalMinutes = durationMap.get(course.courseid);
      const avgRating = ratingMap.get(course.courseid);

      if (!totalMinutes || (!avgRating && avgRating !== 0)) {
        return null;
      }

      const matchesDuration =
        durationRangesInMinutes.length === 0 ||
        durationRangesInMinutes.some(
          (range) => totalMinutes >= range.min && totalMinutes <= range.max
        );

      const matchesRating =
        selectedRatings.length === 0 || selectedRatings.includes(avgRating);

      if (!matchesDuration || !matchesRating) return null;

      return {
        ...course,
        average_rating: avgRating,
      };
    })
    .filter(Boolean);

  let sortedCourses = finalCourses;
  sortedCourses = [...finalCourses].sort((a, b) => {
    switch (sortBy) {
      case "none":
        return 0; // No sorting
      case "rating-low":
        return a.average_rating - b.average_rating;
      case "rating-high":
        return b.average_rating - a.average_rating;
      case "newest":
        return (
          new Date(b.createdat).getTime() - new Date(a.createdat).getTime()
        );
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      default:
        return 0;
    }
  });
  console.log("sortedCourses");
  console.log(sortedCourses);

  return {
    success: true,
    message: "Courses retrieved successfully",
    data: sortedCourses,
    courses_count: count ?? 0,
  };
};

export const getAllCourses = async (
  query = "",
  categories: string[] = [],
  minPrice: number = -1,
  maxPrice: number = -1,
  levels: string[] = [],
  duration: string[] = [],
  ratings: string[] = [],
  currentPage = 1,
  pageSize = 9,
  sortBy = "none"
): Promise<GetAllCoursesResponse> => {
  const supabase = await createClient();

  const validCategories = categories.filter(isUuid);
  const validLevels = levels.filter(isUuid);
  const selectedRatings = ratings.map(Number);

  let minDuration: number | null = null;
  let maxDuration: number | null = null;
  if (duration.length > 0) {
    const allDurations = duration
      .map((range) => range.split("-").map(Number))
      .map(([minH, maxH]) => ({
        min: minH * 60,
        max: maxH ? maxH * 60 : Infinity,
      }));
    minDuration = Math.min(...allDurations.map((d) => d.min));
    maxDuration = Math.max(
      ...allDurations.map((d) => (d.max === Infinity ? 0 : d.max))
    );
    if (maxDuration === 0) maxDuration = null;
  }

  const actualMinPrice = minPrice !== -1 ? minPrice : null;
  const actualMaxPrice = maxPrice !== -1 ? maxPrice : null;

  const { data, error } = await supabase.rpc("get_filtered_courses", {
    in_text: query.trim() || null,
    in_categories: validCategories.length ? validCategories : null,
    in_min_price: actualMinPrice,
    in_max_price: actualMaxPrice,
    in_levels: validLevels.length ? validLevels : null,
    in_min_duration: minDuration,
    in_max_duration: maxDuration,
    in_ratings: selectedRatings.length ? selectedRatings : null,
    in_current_page: currentPage,
    in_page_size: pageSize,
    in_sort_by: sortBy,
    in_user_id: null,
  });

  if (error || !data) {
    return {
      success: false,
      message: error?.message || "Failed to fetch courses",
      data: [],
      courses_count: 0,
    };
  }

  const { data: courses_data, count } = await supabase
    .from("courses")
    .select("*", { count: "exact" });

  return {
    success: true,
    message: "Courses retrieved successfully",
    data,
    courses_count: count ?? 0,
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

// export const getCourseById = async () => {

// };

const emptyCourse: Course_by_id = {
  courseid: "",
  instructorid: "",
  name: "",
  title: "",
  overview: "",
  resources: null,
  levelid: "",
  createdat: "",
  updatedat: "",
  keytopics: null,
  previewimage: null,
  price: 0,
  categoryid: "",
  instructor: {
    role: "",
    email: "",
    status: "",
    userid: "",
    fullname: "",
    username: "",
    phonenumber: "",
  },
  instructor_details: {
    detailid: "",
    instructorid: "",
    bio: "",
    experience: [],
    certificates: [],
    role: "",
    languages: null,
    years_exp: 0,
    social_links: [],
  },
  category: {
    icon: "",
    color: "",
    categoryid: "",
    text_color: "",
    categoryname: "",
  },
  level: {
    name: "",
    levelid: "",
    display_order: 0,
  },
  module: [],
  totalDurationMinutes: 0,
  averageRating: 0,
  reviewCount: 0,
  reviews: [],
};

export const getCourseById = async (
  courseId: string
): Promise<GetCourseByID> => {
  const supabase = await createClient();
  const { data: courseData, error: courseError } = await supabase
    .from("courses")
    .select(
      `
      *,
      instructor:instructorid(*), category:categoryid(*), level:levelid(*),
      module:module (
        *,
        lesson:lesson (
          *,
          page:page (*)
        )
      )
    `
    )
    .eq("courseid", courseId)
    .single();

  console.log(courseError);
  if (courseError || !courseData) {
    return {
      success: false,
      message: courseError?.message || "Course not found",
      data: emptyCourse,
    };
  }
  const { data: instructor_details, error: instructorError } = await supabase
    .from("instructor_details")
    .select("*")
    .eq("instructorid", courseData?.instructorid)
    .single();

  const { data: durationData } = await supabase
    .rpc("get_course_durations")
    .eq("courseid", courseId);

  const totalDuration = durationData?.[0]?.total_duration_minutes ?? 0;

  const { data: ratingsData } = await supabase
    .rpc("get_course_ratings")
    .eq("courseid", courseId);

  const averageRating = ratingsData?.[0]?.average_rating ?? 0;

  const { count: reviewCount } = await supabase
    .from("course_reviews")
    .select("rate", { count: "exact", head: true })
    .eq("courseid", courseId);

  const { data: reviewsData, error: reviewsError } = await supabase
    .from("course_reviews")
    .select(
      `
      *,
      user:userid (
        *
      )
    `
    )
    .eq("courseid", courseId)
    .order("createdat", { ascending: false });

  if (reviewsError) {
    return {
      success: false,
      message: reviewsError.message,
      data: emptyCourse,
    };
  }

  let fullCourseData = {};
  if (courseError || instructorError) {
    console.error("Error fetching data:", courseError || instructorError);
  }
  return {
    success: true,
    message: "Course data retrieved successfully",
    data: {
      ...courseData,
      instructor_details,
      totalDurationMinutes: totalDuration,
      averageRating,
      reviewCount,
      reviews: reviewsData,
    },
  };
};
