"use server";
import type * as React from "react";
import { Navbar } from "./navbar";
import { Footer } from "./footer";
import { createClient } from "@/supabase/utils/server";
import { getLoggedInUser } from "@/supabase/actions/user_actions";

interface PublicLayoutProps {
  children: React.ReactNode;
}

export async function PublicLayout({ children }: PublicLayoutProps) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  let logged_in_user = null;

  if (user) {
    const logged_in_user_res = await getLoggedInUser(user.id);
    logged_in_user = logged_in_user_res.data?.[0] || null;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar user={user} logged_in_user={logged_in_user} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
