"use server";
import CoursesPage from "@/pages/courses/courses";
import { getAllCourses } from "@/supabase/actions/course_actions";

export default async function Page() {
  const result = await getAllCourses();
  console.log(result);
  return (
    <>
      <CoursesPage />
    </>
  );
}
