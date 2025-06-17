"use server";

import { createClient } from "@/supabase/utils/server";
import ApplyAsPartnerPage from "@/components/apply_partner/apply_partner";
import { getAllPartnershipTypes } from "@/supabase/actions/partners_action";
import { getLoggedInUser } from "@/supabase/actions/user_actions";
import { redirect } from "next/navigation";

export default async function Page() {
  const { data: partnership_types } = await getAllPartnershipTypes();

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const logged_in_user_res = await getLoggedInUser(user.id);
  const logged_in_user = logged_in_user_res.data?.[0];

  if (!logged_in_user) {
    return redirect("/login");
  }

  return (
    <ApplyAsPartnerPage
      partnership_types={partnership_types}
      logged_in_user={logged_in_user}
    />
  );
}
