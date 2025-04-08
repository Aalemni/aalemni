"use server";
import HomePage from "@/components/home/home";
import React from "react";
import { createClient } from "@/supabase/utils/server";

export default async function Page() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return (
    <>
      <HomePage user={user} />
    </>
  );
}
