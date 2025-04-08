"use server";
import CoursesPage from "@/components/courses/courses";
import { getAllCourses } from "@/supabase/actions/course_actions";
import { Course_courses } from "@/types/types";

type GetAllCoursesResponse = {
  success: boolean;
  message: string;
  data: Course_courses[];
};

type PageProps = {
  searchParams: { q?: string; category?: string }; // should be a promise
};
export default async function Page({ searchParams }: PageProps) {
  const categoryquery = searchParams.category || "";
  const searchquery = searchParams.q || "";
  const courses: GetAllCoursesResponse = await getAllCourses(
    searchquery,
    categoryquery
  );

  console.log(courses);
  return (
    <>
      <CoursesPage courses={courses.data} />
    </>
  );
}
