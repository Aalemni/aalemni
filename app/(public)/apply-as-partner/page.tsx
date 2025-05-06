"use server";
import ApplyAsPartnerPage from "@/components/apply_partner/apply_partner";
import { getAllPartnershipTypes } from "@/supabase/actions/partners_action";
import React from "react";

export default async function Page() {
  const { data: partnership_types } = await getAllPartnershipTypes();

  return <ApplyAsPartnerPage partnership_types={partnership_types} />;
}
