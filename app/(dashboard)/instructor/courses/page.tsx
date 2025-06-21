"use server";
import InstructorCourses from "@/components/instructor/courses/courses";
import { getAllCategories } from "@/supabase/actions/category_actions";
import { getAllCourses } from "@/supabase/actions/course_actions";
import { getAllCourseLevels } from "@/supabase/actions/course_level_actions";
import { Course_courses, Level_courses } from "@/types/types";

type GetAllCoursesResponse = {
  success: boolean;
  message: string;
  data: Course_courses[];
  courses_count: number;
};

type PageProps = {
  searchParams: Promise<{
    q?: string;
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    level?: string;
    duration?: string;
    currentPage?: number;
    rating?: string;
    sort?: string;
  }>;
};

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;
  const categoryquery = params.category ? params.category.split(",") : [];
  const searchquery = params.q || "";
  const levels = params.level ? params.level.split(",") : [];
  const duration = params.duration ? params.duration.split(",") : [];
  const rating = params.rating ? params.rating.split(",") : [];
  const minPrice = params.minPrice || -1;
  const maxPrice = params.maxPrice || -1;
  const currentPage = params.currentPage || 1;
  const itemsPerPage = 10;
  const sortBy = params.sort || "";

  const courses: GetAllCoursesResponse = await getAllCourses(
    searchquery,
    categoryquery,
    minPrice,
    maxPrice,
    levels,
    duration,
    rating,
    currentPage,
    itemsPerPage,
    sortBy
  );

  const course_levels_res = await getAllCourseLevels();
  const course_levels = course_levels_res.data;

  const course_categoreis_res = await getAllCategories();
  const course_categoreis = course_categoreis_res.data;

  return (
    <>
      <InstructorCourses
        courses={courses.data}
        itemsPerPage={itemsPerPage}
        courses_count={courses.courses_count}
        course_levels={course_levels}
        course_categoreis={course_categoreis}
      />
    </>
  );
}
