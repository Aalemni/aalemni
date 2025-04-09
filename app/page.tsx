"use server";
import HomePage from "@/components/home/home";
import React from "react";
import { createClient } from "@/supabase/utils/server";
import { getAllCategories } from "@/supabase/actions/category_actions";

export default async function Page() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const categories_res = await getAllCategories();
  const categories = categories_res.data;
  return (
    <>
      <HomePage user={user} categories={categories} />
    </>
  );
}
