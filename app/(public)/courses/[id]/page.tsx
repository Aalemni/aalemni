"use server";

import CourseDetailPage from "@/components/course_by_id/course_by_id";
import { getCourseById } from "@/supabase/actions/course_actions";
import { Course, Course_by_id } from "@/types/types"; // If you created a separate type file
import { type Metadata } from "next";

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const course = (await getCourseById(id)).data;

  return {
    title: course.title,
  };
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const coursee = await getCourseById(id);
  return <CourseDetailPage course={coursee.data} />;
}
