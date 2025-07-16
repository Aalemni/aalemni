"use server";

import { encodedRedirect } from "@/utils/utils";
import { createClient } from "@/supabase/utils/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import type { IntructorDetails } from "@/types/types";

export async function fetchInstructorsWithDetails(): Promise<
  IntructorDetails[]
> {
  const supabase = await createClient();

  const { data, error } = (await supabase.rpc("get_instructors")) as {
    data: IntructorDetails[] | null;
    error: any;
  };

  if (error) {
    console.error("Supabase RPC error:", error);
    return [];
  }

  if (!data) {
    console.warn("Supabase RPC returned null data");
    return [];
  }

  console.log("🔍 Raw data from Supabase:", data);

  const validInstructors: IntructorDetails[] = [];

  data.forEach((instructor) => {
    if (
      instructor.userid &&
      instructor.fullname &&
      instructor.username &&
      instructor.email &&
      instructor.status &&
      typeof instructor.average_rating === "number" &&
      instructor.bio &&
      Array.isArray(instructor.languages) &&
      typeof instructor.years_exp === "number"
    ) {
      // Optional: skip certificates or make optional checks
      validInstructors.push(instructor);
    }
  });

  console.log("✅ Valid instructors after filtering:", validInstructors);

  return validInstructors;
}
