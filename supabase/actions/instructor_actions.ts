import { createClient } from "@/supabase/utils/server";
import {
  CourseReview,
  FullInstructorTestimonial,
  Instructor_detail,
  Instructor_Review,
  Instructor_testimonial_raw,
  Simplified_Course,
} from "@/types/types";

type GetAllInstructorTestimonialsResponse = {
  success: boolean;
  message: string;
  data: FullInstructorTestimonial[];
};

type GetAllInstructorReviewsResponse = {
  success: boolean;
  message: string;
  data: Instructor_Review[];
  averageRating: number;
};

type GetAllInstructorCoursesReviewsResponse = {
  success: boolean;
  message: string;
  data: CourseReview[];
  courses: Simplified_Course[];
};

export const getFullInstructorTestimonials =
  async (): Promise<GetAllInstructorTestimonialsResponse> => {
    const supabase = await createClient();

    const { data: testimonials, error: testimonialError } = await supabase.from(
      "instructor_testimonials"
    ).select(`
        *,
        instructor:instructorid (
          userid,
          fullname,
          username,
          email,
          phonenumber,
          role,
          status
        )
      `);

    const { data: instructorDetails, error: detailError } = await supabase
      .from("instructor_details")
      .select("*");

    if (testimonialError || detailError || !testimonials) {
      console.error("Error fetching data:", testimonialError, detailError);
      return {
        success: false,
        message: "Error fetching testimonials or instructor details.",
        data: [],
      };
    }

    const merged = testimonials.map(
      (testimonial: Instructor_testimonial_raw) => {
        const detail = instructorDetails.find(
          (d: Instructor_detail) => d.instructorid === testimonial.instructorid
        );

        return {
          testimonialid: testimonial.testimonialid,
          instructorid: testimonial.instructorid,
          description: testimonial.description,
          rate: testimonial.rate,
          userid: testimonial.instructor.userid,
          fullname: testimonial.instructor.fullname,
          username: testimonial.instructor.username,
          email: testimonial.instructor.email,
          phonenumber: testimonial.instructor.phonenumber,
          role: testimonial.instructor.role,
          status: testimonial.instructor.status,
          detailid: detail?.detailid || null,
          bio: detail?.bio || null,
          experience: detail?.experience || null,
          certificates: detail?.certificates || null,
          instructor_role: detail?.role || null,
        };
      }
    );

    return {
      success: true,
      message: "success",
      data: merged,
    };
  };

export const getFullInstructorReviews = async ({
  instructor_id = "",
}): Promise<GetAllInstructorReviewsResponse> => {
  const supabase = await createClient();

  const { data: reviews, error: reviewError } = await supabase
    .from("instructor_reviews")
    .select(
      `*,
        users:userid (
          userid,
          fullname,
          username,
          email,
          phonenumber,
          role,
          status
        )
      `
    )
    .eq("instructorid", instructor_id);

  if (reviewError || !reviews) {
    console.error("Error fetching data:", reviewError);
    return {
      success: false,
      message: "Error fetching reviews or instructor details.",
      data: [],
      averageRating: 0,
    };
  }

  const { data: avgRateData, error: avgError } = await supabase.rpc(
    "get_instructor_avg_rating",
    { instructor_id }
  );

  if (avgError) {
    console.error("Error fetching average rating:", avgError);
    return {
      success: false,
      message: "Error fetching average rating.",
      data: [],
      averageRating: 0,
    };
  }

  const averageRating = avgRateData ?? 0;

  return {
    success: true,
    message: "success",
    data: reviews,
    averageRating: averageRating,
  };
};

export const getInstructorCoursesReviews = async ({
  instructor_id = "",
}): Promise<GetAllInstructorCoursesReviewsResponse> => {
  const supabase = await createClient();

  const { data: reviews, error: reviewError } = await supabase
    .from("course_reviews")
    .select(
      `*, courses!inner(*),
          users:userid (
          userid,
          fullname,
          username,
          email,
          phonenumber,
          role,
          status
        )`
    ) // join with courses where the course exists
    .eq("courses.instructorid", instructor_id)
    .eq("isdeleted", false);

  if (reviewError) {
    console.error("Error fetching data:", reviewError);
    return {
      success: false,
      message: "Error fetching course reviews",
      data: [],
      courses: [],
    };
  }

  const { data: courses, error: courseError } = await supabase
    .from("courses")
    .select(`*`)
    .eq("instructorid", instructor_id);

  if (courseError) {
    console.error("Error fetching data:", courseError);
    return {
      success: false,
      message: "Error fetching instructor courses.",
      data: [],
      courses: [],
    };
  }
  return {
    success: true,
    message: "Course Reviews Fetched Successfully.",
    data: reviews,
    courses: courses,
  };
};
