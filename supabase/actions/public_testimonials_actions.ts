import { createClient } from "@/supabase/utils/server";
import { PublicTestimonial } from "@/types/types";

type GetAllTestimonialsResponse = {
  success: boolean;
  message: string;
  data: PublicTestimonial[];
};

type AddTestimonialResponse = {
  success: boolean;
  message: string;
};

type EditTestimonialResponse = {
  success: boolean;
  message: string;
};

type DeleteTestimonialResponse = {
  success: boolean;
  message: string;
};

// Get all testimonials
export const getAllTestimonials =
  async (): Promise<GetAllTestimonialsResponse> => {
    const supabase = await createClient();

    const { data, error } = await supabase.from("testimonials").select("*");

    if (error) {
      return {
        success: false,
        message: error.message,
        data: [],
      };
    }

    return {
      success: true,
      message: "Public Testimonials retrieved successfully",
      data: data || [],
    };
  };

// Add a new testimonial
export const addTestimonial = async (
  testimonial: Omit<PublicTestimonial, "testimonialid"> // Omit the ID field since it is auto-generated
): Promise<AddTestimonialResponse> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("testimonials")
    .insert([testimonial]);

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }

  return {
    success: true,
    message: "Testimonial added successfully",
  };
};

// Edit an existing testimonial
export const editTestimonial = async (
  testimonialId: string,
  updatedFields: Partial<PublicTestimonial>
): Promise<EditTestimonialResponse> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("testimonials")
    .update(updatedFields)
    .eq("id", testimonialId);

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }

  return {
    success: true,
    message: "Testimonial updated successfully",
  };
};

// Delete a testimonial
export const deleteTestimonial = async (
  testimonialId: string
): Promise<DeleteTestimonialResponse> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("testimonials")
    .delete()
    .eq("id", testimonialId);

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }

  return {
    success: true,
    message: "Testimonial deleted successfully",
  };
};
