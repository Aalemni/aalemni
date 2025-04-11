import { createClient } from "@/supabase/utils/server";
import { Specialty } from "@/types/types";

export const getAllSpecialties = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase.from("specialties").select("*");

  if (error) {
    return { success: false, message: error.message, data: [] };
  }

  return { success: true, message: "Specialties retrieved", data };
};

export const addSpecialty = async (
  specialty: Omit<Specialty, "specialityID">
) => {
  const supabase = await createClient();
  const { error } = await supabase.from("specialties").insert([specialty]);

  if (error) {
    return { success: false, message: error.message };
  }

  return { success: true, message: "Specialty added successfully" };
};

export const editSpecialty = async (
  specialityID: string,
  updates: Partial<Specialty>
) => {
  const supabase = await createClient();
  const { error } = await supabase
    .from("specialties")
    .update(updates)
    .eq("specialityID", specialityID);

  if (error) {
    return { success: false, message: error.message };
  }

  return { success: true, message: "Specialty updated successfully" };
};

export const deleteSpecialty = async (specialityID: string) => {
  const supabase = await createClient();
  const { error } = await supabase
    .from("specialties")
    .delete()
    .eq("specialityID", specialityID);

  if (error) {
    return { success: false, message: error.message };
  }

  return { success: true, message: "Specialty deleted successfully" };
};
