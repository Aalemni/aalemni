"use server";
import PartnersPage from "@/components/students/partners/partners";
import { createClient } from "@/supabase/utils/server";

export default async function Page() {
  const supabase = await createClient();

  const { data: partners, error } = await supabase
    .from("partners")
    .select(
      `
      partnerid,
      organization_name,
      email,
      partnership_goal,
      status
    `
    )
    .order("partnersince", { ascending: false });
  console.log(partners);
  if (error) {
    console.error("Error fetching partners:", error);
  }

  return <PartnersPage initialPartners={partners || []} />;
}
