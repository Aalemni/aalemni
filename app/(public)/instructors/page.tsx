"use server";
import { createClient } from "@/supabase/utils/server";
import IntructorDeatils from "@/components/instructor/all_instructor/instructor";
import React from "react";
import { fetchInstructorsWithDetails } from "@/supabase/actions/instructor";

export default async function Page() {
  const instructors = await fetchInstructorsWithDetails();

  console.log("Fetched instructors passed:", instructors);

  return <IntructorDeatils instructors={instructors} />;
}
