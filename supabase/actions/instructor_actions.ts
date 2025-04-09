import { createClient } from "@/supabase/utils/server";
import {
  FullInstructorTestimonial,
  Instructor_detail,
  Instructor_testimonial_raw,
} from "@/types/types";

type GetAllInstructorTestimonialsResponse = {
  success: boolean;
  message: string;
  data: FullInstructorTestimonial[];
};

// export const getAllInstructorTestimonials =
//   async (): Promise<GetAllInstructorTestimonialsResponse> => {
//     const supabase = await createClient();

//     const { data, error } = await supabase.from("instructor_testimonials")
//       .select(`
//       *,
//       instructor:instructorid (
//         *,
//         instructor_details:userid (*)
//       )
//     `);
//     console.log(data);
//     if (error) {
//       return {
//         success: false,
//         message: error.message,
//         data: [],
//       };
//     }
//     return {
//       success: true,
//       message: "Categories retrieved successfully",
//       data: data || [],
//     };
//   };

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
