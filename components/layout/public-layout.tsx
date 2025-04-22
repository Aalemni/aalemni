"use server";
import type * as React from "react";
import { Navbar } from "./navbar";
import { Footer } from "./footer";
import { createClient } from "@/supabase/utils/server";
import { getLoggedInUser } from "@/supabase/actions/user_actions";
import { redirect } from "next/navigation";

interface PublicLayoutProps {
  children: React.ReactNode;
}

export async function PublicLayout({ children }: PublicLayoutProps) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const logged_in_user_res = await getLoggedInUser(user.id);
  const logged_in_user = logged_in_user_res.data;

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar user={user} logged_in_user={logged_in_user[0]} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
