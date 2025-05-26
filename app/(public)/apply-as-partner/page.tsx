"use server";
import { createClient } from "@/supabase/utils/server";
import ApplyAsPartnerPage from "@/components/apply_partner/apply_partner";
import { getAllPartnershipTypes } from "@/supabase/actions/partners_action";
import React from "react";
import { getLoggedInUser } from "@/supabase/actions/user_actions";

export default async function Page() {
  const { data: partnership_types } = await getAllPartnershipTypes();

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let logged_in_user = null;

  if (user) {
    const logged_in_user_res = await getLoggedInUser(user.id);
    logged_in_user = logged_in_user_res.data?.[0] || null;
    console.log(user);
  }

  return (
    <ApplyAsPartnerPage
      partnership_types={partnership_types}
      logged_in_user={logged_in_user}
    />
  );
}
