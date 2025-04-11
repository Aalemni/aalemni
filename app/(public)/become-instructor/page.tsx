"use server";
import BecomeInstructorPage from "@/components/become_instructor/become_instructor";
import { getFullInstructorTestimonials } from "@/supabase/actions/instructor_actions";
import { getAllInstructorBenefits } from "@/supabase/actions/instructor_benefits_actions";

export default async function Page() {
  const instructor_testimonial_res = await getFullInstructorTestimonials();
  const instructor_testimonials = instructor_testimonial_res.data;

  const instructor_benefits_res = await getAllInstructorBenefits();
  const instructor_benefits = instructor_benefits_res.data;
  return (
    <>
      <BecomeInstructorPage
        instructor_testimonials={instructor_testimonials}
        instructor_benefits={instructor_benefits}
      />
    </>
  );
}
