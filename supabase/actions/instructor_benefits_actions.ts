// services/instructorBenefits.js
import { createClient } from "@/supabase/utils/server";
import { Instructor_Benefit } from "@/types/types";

export const getAllInstructorBenefits = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("instructor_benefits")
    .select("*");

  if (error) {
    return { success: false, message: error.message, data: [] };
  }

  return {
    success: true,
    message: "Instructor benefits retrieved successfully",
    data,
  };
};

export const addInstructorBenefit = async (
  benefit: Omit<Instructor_Benefit, "benefitid">
) => {
  const supabase = await createClient();
  const { error } = await supabase
    .from("instructor_benefits")
    .insert([benefit]);

  if (error) {
    return { success: false, message: error.message };
  }

  return { success: true, message: "Instructor benefit added successfully" };
};

export const editInstructorBenefit = async (
  benefitID: string,
  updates: Partial<Instructor_Benefit>
) => {
  const supabase = await createClient();
  const { error } = await supabase
    .from("instructor_benefits")
    .update(updates)
    .eq("benefitID", benefitID);

  if (error) {
    return { success: false, message: error.message };
  }

  return { success: true, message: "Instructor benefit updated successfully" };
};

export const deleteInstructorBenefit = async (benefitID: string) => {
  const supabase = await createClient();
  const { error } = await supabase
    .from("instructor_benefits")
    .delete()
    .eq("benefitID", benefitID);

  if (error) {
    return { success: false, message: error.message };
  }

  return { success: true, message: "Instructor benefit deleted successfully" };
};
