import { createClient } from "@/supabase/utils/server";
import { User } from "@/types/types";

type GetLoggedInUserResponse = {
  success: boolean;
  message: string;
  data: User[];
};

export const getLoggedInUser = async (
  userid: string
): Promise<GetLoggedInUserResponse> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("userid", userid);

  if (error) {
    return {
      success: false,
      message: error.message,
      data: [],
    };
  }

  return {
    success: true,
    message: "User Not Found",
    data: data || [],
  };
};
