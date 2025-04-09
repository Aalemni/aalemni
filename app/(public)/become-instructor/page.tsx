"use server";
import BecomeInstructorPage from "@/components/become_instructor/become_instructor";
import { getFullInstructorTestimonials } from "@/supabase/actions/instructor_actions";

export default async function Page() {
  const instructor_testimonial_res = await getFullInstructorTestimonials();
  const instructor_testimonials = instructor_testimonial_res.data;
  return (
    <>
      <BecomeInstructorPage instructor_testimonials={instructor_testimonials} />
    </>
  );
}
