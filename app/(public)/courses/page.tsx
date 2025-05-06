"use server";
import CoursesPage from "@/components/courses/courses";
import { getAllCategories } from "@/supabase/actions/category_actions";
import { getAllCourses } from "@/supabase/actions/course_actions";
import { getAllCourseLevels } from "@/supabase/actions/course_level_actions";
import { Category_courses, Course_courses, Level_courses } from "@/types/types";

type GetAllCoursesResponse = {
  success: boolean;
  message: string;
  data: Course_courses[];
  courses_count: number;
};

type GetAllCategoriesResponse = {
  success: boolean;
  message: string;
  data: Category_courses[];
};

type GetAllLevelsResponse = {
  success: boolean;
  message: string;
  data: Level_courses[];
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
  const itemsPerPage = 2  ;
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
  const categories_res: GetAllCategoriesResponse = await getAllCategories();
  const course_levels: GetAllLevelsResponse = await getAllCourseLevels();

  return (
    <>
      <CoursesPage
        courses={courses.data}
        categories={categories_res.data}
        course_levels={course_levels.data}
        itemsPerPage={itemsPerPage}
        courses_count={courses.courses_count}
      />
    </>
  );
}
