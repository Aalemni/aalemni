import { createClient } from "@/supabase/utils/server";
import { InstructorSpecialty } from "@/types/types";

type InstructorSpecialtyResponse = {
  success: boolean;
  message: string;
  data?: InstructorSpecialty[];
};

export const getAllInstructorSpecialties =
  async (): Promise<InstructorSpecialtyResponse> => {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("instructor_specialties")
      .select("*");

    if (error) {
      return { success: false, message: error.message, data: [] };
    }

    return { success: true, message: "Instructor-specialties retrieved", data };
  };

export const addInstructorSpecialty = async (
  relation: Omit<InstructorSpecialty, "instructor_specialtiesID">
): Promise<InstructorSpecialtyResponse> => {
  const supabase = await createClient();
  const { error } = await supabase
    .from("instructor_specialties")
    .insert([relation]);

  if (error) {
    return { success: false, message: error.message };
  }

  return { success: true, message: "Relation added successfully" };
};

export const editInstructorSpecialty = async (
  instructor_specialtiesID: string,
  updates: Partial<InstructorSpecialty>
): Promise<InstructorSpecialtyResponse> => {
  const supabase = await createClient();
  const { error } = await supabase
    .from("instructor_specialties")
    .update(updates)
    .eq("instructor_specialtiesID", instructor_specialtiesID);

  if (error) {
    return { success: false, message: error.message };
  }

  return { success: true, message: "Relation updated successfully" };
};

export const deleteInstructorSpecialty = async (
  instructor_specialtiesID: string
): Promise<InstructorSpecialtyResponse> => {
  const supabase = await createClient();
  const { error } = await supabase
    .from("instructor_specialties")
    .delete()
    .eq("instructor_specialtiesID", instructor_specialtiesID);

  if (error) {
    return { success: false, message: error.message };
  }

  return { success: true, message: "Relation deleted successfully" };
};
