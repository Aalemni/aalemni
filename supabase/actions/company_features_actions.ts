import { createClient } from "@/supabase/utils/server";
import { Feature } from "@/types/types";

export const addFeature = async (feature: Omit<Feature, "featureid">) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("company_features")
    .insert([feature])
    .select()
    .single();

  if (error) {
    return {
      success: false,
      message: error.message,
      data: [],
    };
  }
  return {
    success: true,
    message: "Feature added successfully",
    data: data,
  };
};

export const editFeature = async (
  featureid: number,
  updates: Partial<Omit<Feature, "featureid">>
) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("company_features")
    .update(updates)
    .eq("featureid", featureid)
    .select()
    .single();

  if (error) {
    return {
      success: false,
      message: error.message,
      data: [],
    };
  }

  return {
    success: true,
    message: "Feature updated successfully",
    data: data,
  };
};

export const deleteFeature = async (featureid: number) => {
  const supabase = await createClient();
  const { error } = await supabase
    .from("company_features")
    .delete()
    .eq("featureid", featureid);

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }

  return {
    success: true,
    message: "Feature deleted successfully",
  };
};

export const getFeaturesByCompany = async (companyid: number) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("company_features")
    .select("*")
    .eq("companyid", companyid)
    .order("featureid", { ascending: true });

  if (error) {
    return {
      success: false,
      message: error.message,
      data: [],
    };
  }

  return {
    success: true,
    message: "Features fetched successfully",
    data: data,
  };
};
