"use server";

import { createClient } from "@/supabase/utils/server";
import InstructorReviews from "@/components/instructor/reviews/reviews";
import {
  getFullInstructorReviews,
  getInstructorCoursesReviews,
} from "@/supabase/actions/instructor_actions";
import { getAllCourseLevels } from "@/supabase/actions/course_level_actions";

export default async function Page() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const user_id = user?.id || "";
  const instructor_review_res = await getFullInstructorReviews({
    instructor_id: user_id,
  });
  const instructor_reviews = instructor_review_res.data;
  const instructor_average_rating = instructor_review_res.averageRating;

  const instructor_course_reviews_res = await getInstructorCoursesReviews({
    instructor_id: user_id,
  });
  const instructor_course_reviews = instructor_course_reviews_res.data;
  const instrucror_courses = instructor_course_reviews_res.courses;

  return (
    <>
      <InstructorReviews
        instructor_reviews={instructor_reviews}
        instructor_course_reviews={instructor_course_reviews}
        instructor_average_rating={instructor_average_rating}
        instructor_courses={instrucror_courses}
      />
    </>
  );
}
