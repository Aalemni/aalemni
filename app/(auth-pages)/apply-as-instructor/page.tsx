"use server";
import ApplyAsInstructorPage from "@/components/apply_instructor/apply_instructor";
import { getAllSpecialties } from "@/supabase/actions/specialties_actions";

export default async function Page() {
  const specialties_res = await getAllSpecialties();
  const specialties = specialties_res.data;
  return (
    <>
      <ApplyAsInstructorPage specialties={specialties} />
    </>
  );
}
