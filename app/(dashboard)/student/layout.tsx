"use server";
import type React from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { createClient } from "@/supabase/utils/server";
import { redirect } from "next/navigation";
import { getLoggedInUser } from "@/supabase/actions/user_actions";
import { toast } from "react-toastify";

export default async function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect("/login");
  }
  const logged_in_user_res = await getLoggedInUser(user.id);
  const allowedRoles = ["student", "admin"];

  if (!allowedRoles.includes(logged_in_user_res.data[0].role)) {
    const errorMessage = encodeURIComponent(
      "You're Not Authorized To Access This Page"
    );

    redirect(`/login?error=${errorMessage}`);
  }
  return (
    <MainLayout showSidebar={true} logged_in_user={logged_in_user_res.data[0]}>
      {children}
    </MainLayout>
  );
}
