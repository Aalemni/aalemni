"use server";
import HomePage from "@/components/home/home";
import React from "react";
import { createClient } from "@/supabase/utils/server";
import { getAllCategories } from "@/supabase/actions/category_actions";
import { getFeaturedCoursesWithDetails } from "@/supabase/actions/course_actions";
import { getAllTestimonials } from "@/supabase/actions/public_testimonials_actions";
import { getFeaturesByCompany } from "@/supabase/actions/company_features_actions";

export default async function Page() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const categories_res = await getAllCategories();
  const categories = categories_res.data;

  const featured_courses_res = await getFeaturedCoursesWithDetails();
  const featured_courses = featured_courses_res.data;

  const testimonials_res = await getAllTestimonials();
  const testimonials = testimonials_res.data;

  const features_res = await getFeaturesByCompany(1);
  const features = features_res.data;

  return (
    <>
      <HomePage
        user={user}
        categories={categories}
        featured_courses={featured_courses}
        testimonials={testimonials}
        company_features={features}
      />
    </>
  );
}
