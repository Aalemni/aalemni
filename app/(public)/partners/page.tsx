"use server";

import PartnersPage from "@/components/partners/partners";
import {
  getAllPartners,
  getAllPartnershipFeatures,
  getAllPartnershipTypes,
  getAllPartnerTestimonials,
} from "@/supabase/actions/partners_action";

export default async function Page() {
  const { data: partners } = await getAllPartners();
  const { data: partnership_types } = await getAllPartnershipTypes();
  const { data: partners_testimonials, message } =
    await getAllPartnerTestimonials();
  const { data: partnership_features } = await getAllPartnershipFeatures();
  console.log(partners);
  console.log(partnership_types);
  console.log(partners_testimonials);
  console.log(message);
  console.log(partnership_features);
  return (
    <PartnersPage
      partners={partners}
      partnership_types={partnership_types}
      partnership_features={partnership_features}
      partners_testimonials={partners_testimonials}
    />
  );
}
