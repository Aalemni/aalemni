"use server";

import { createClient } from "@/supabase/utils/server";
import {
  Partner,
  PartnershipFeature,
  PartnershipType,
  PartnerTestimonial,
  PartnerTestimonialWithPartner,
} from "@/types/types";

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

export const getAllPartnershipTypes = async (): Promise<
  ApiResponse<PartnershipType[]>
> => {
  const supabase = await createClient();
  const { data, error } = await supabase.from("partnership_type").select("*");

  return {
    success: !error,
    message: error?.message || "Fetched successfully",
    data: data || [],
  };
};

export const getPartnershipTypeById = async (
  id: number
): Promise<ApiResponse<PartnershipType>> => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("partnership_type")
    .select("*")
    .eq("partnershiptypeid", id)
    .single();

  return {
    success: !error,
    message: error?.message || "Fetched successfully",
    data: data || ({} as PartnershipType),
  };
};

export const addPartnershipType = async (
  newType: Omit<PartnershipType, "partnershiptypeid">
): Promise<ApiResponse<PartnershipType>> => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("partnership_type")
    .insert(newType)
    .select()
    .single();

  return {
    success: !error,
    message: error?.message || "Created successfully",
    data: data || ({} as PartnershipType),
  };
};

export const editPartnershipType = async (
  id: number,
  updatedType: Partial<PartnershipType>
): Promise<ApiResponse<PartnershipType>> => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("partnership_type")
    .update(updatedType)
    .eq("partnershiptypeid", id)
    .select()
    .single();

  return {
    success: !error,
    message: error?.message || "Updated successfully",
    data: data || ({} as PartnershipType),
  };
};

export const deletePartnershipType = async (
  id: number
): Promise<ApiResponse<null>> => {
  const supabase = await createClient();
  const { error } = await supabase
    .from("partnership_type")
    .delete()
    .eq("partnershiptypeid", id);

  return {
    success: !error,
    message: error?.message || "Deleted successfully",
    data: null,
  };
};

export const getAllPartners = async (): Promise<ApiResponse<Partner[]>> => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("partners")
    .select("*, users:userid(*)");

  return {
    success: !error,
    message: error?.message || "Fetched successfully",
    data: data || [],
  };
};

export const getPartnerById = async (
  id: string
): Promise<ApiResponse<Partner>> => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("partners")
    .select("*, users:userid(*)")
    .eq("partnerid", id)
    .single();

  return {
    success: !error,
    message: error?.message || "Fetched successfully",
    data: data || ({} as Partner),
  };
};

export const addPartner = async (
  newPartner: Omit<Partner, "partnerid" | "partnersince">
): Promise<ApiResponse<Partner>> => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("partners")
    .insert(newPartner)
    .select()
    .single();

  return {
    success: !error,
    message: error?.message || "Created successfully",
    data: data || ({} as Partner),
  };
};

export const editPartner = async (
  id: string,
  updatedPartner: Partial<Partner>
): Promise<ApiResponse<Partner>> => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("partners")
    .update(updatedPartner)
    .eq("partnerid", id)
    .select()
    .single();

  return {
    success: !error,
    message: error?.message || "Updated successfully",
    data: data || ({} as Partner),
  };
};

export const deletePartner = async (id: string): Promise<ApiResponse<null>> => {
  const supabase = await createClient();
  const { error } = await supabase
    .from("partners")
    .delete()
    .eq("partnerid", id);

  return {
    success: !error,
    message: error?.message || "Deleted successfully",
    data: null,
  };
};

export const getAllPartnershipFeatures = async (): Promise<
  ApiResponse<PartnershipFeature[]>
> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("partnership_features")
    .select("*");
  return {
    success: !error,
    data: data ?? [],
    message: error?.message ?? "Fetched successfully",
  };
};

export const getPartnershipFeatureById = async (
  id: number
): Promise<ApiResponse<PartnershipFeature>> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("partnership_features")
    .select("*")
    .eq("partnershipfeatureid", id)
    .single();
  return {
    success: !error,
    data: data ?? null,
    message: error?.message ?? "Fetched successfully",
  };
};

export const addPartnershipFeature = async (feature: {
  name: string;
  icon?: string;
  description?: string;
  companyid?: number;
}) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("partnership_features")
    .insert(feature)
    .select()
    .single();
  return {
    success: !error,
    data: data ?? null,
    message: error?.message ?? "Feature added",
  };
};

export const updatePartnershipFeature = async (
  id: number,
  updates: {
    name?: string;
    icon?: string;
    description?: string;
    companyid?: number;
  }
) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("partnership_features")
    .update(updates)
    .eq("partnershipfeatureid", id)
    .select()
    .single();
  return {
    success: !error,
    data: data ?? null,
    message: error?.message ?? "Feature updated",
  };
};

export const deletePartnershipFeature = async (id: number) => {
  const supabase = await createClient();

  const { error } = await supabase
    .from("partnership_features")
    .delete()
    .eq("partnershipfeatureid", id);
  return {
    success: !error,
    data: null,
    message: error?.message ?? "Feature deleted",
  };
};

const empty_testimonoal = {
  testimonialid: "",
  partnerid: "",
  description: "",
  rate: 0,
  partners: {
    logo: "",
    description: "",
    websitelink: "",
    partnersince: "",
    partnerid: "",
    partnership_type: 0,
    userid: 0,
    user: {
      fullname: "",
      username: "",
      email: "",
      phonenumber: "",
      role: "",
      status: "",
    },
  },
};

export const getAllPartnerTestimonials = async (): Promise<
  ApiResponse<PartnerTestimonialWithPartner[]>
> => {
  const supabase = await createClient();

  const { data, error } = await supabase.from("partners_testimonials").select(`
        *,
        partners:partnerid (
          *,
          users:userid (*)
        )
      `);

  return {
    success: !error,
    data: data ?? [],
    message: error?.message ?? "Fetched successfully",
  };
};

export const getPartnerTestimonialById = async (
  id: number
): Promise<ApiResponse<PartnerTestimonial>> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("partners_testimonials")
    .select(
      `
        *,
        partners:partnerid (
          *,
          user:user_id (*)
        )
      `
    )
    .eq("testimonialid", id)
    .single();

  return {
    success: !error,
    data: data ?? empty_testimonoal,
    message: error?.message ?? "Fetched successfully",
  };
};

export const addPartnerTestimonial = async (testimonial: {
  partnerid: string;
  description?: string;
  rate: number;
}) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("partners_testimonials")
    .insert(testimonial)
    .select()
    .single();

  return {
    success: !error,
    data: data ?? null,
    message: error?.message ?? "Testimonial added",
  };
};

export const updatePartnerTestimonial = async (
  id: number,
  updates: {
    description?: string;
    rate?: number;
    partnerid?: string;
  }
) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("partners_testimonials")
    .update(updates)
    .eq("testimonialid", id)
    .select()
    .single();

  return {
    success: !error,
    data: data ?? null,
    message: error?.message ?? "Testimonial updated",
  };
};

export const deletePartnerTestimonial = async (id: number) => {
  const supabase = await createClient();

  const { error } = await supabase
    .from("partners_testimonials")
    .delete()
    .eq("testimonialid", id);

  return {
    success: !error,
    data: null,
    message: error?.message ?? "Testimonial deleted",
  };
};
