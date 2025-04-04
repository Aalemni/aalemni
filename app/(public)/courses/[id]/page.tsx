"use server";

import CourseDetailPage from "@/pages/course_by_id/course_by_id";

export default async function Page({ params }: { params: { id: string } }) {
  return <CourseDetailPage id={`${params.id}`} />;
}
