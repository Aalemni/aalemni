"use server";
import type * as React from "react";
import { Navbar } from "./navbar";
import { Footer } from "./footer";
import { createClient } from "@/supabase/utils/server";

interface PublicLayoutProps {
  children: React.ReactNode;
}

export async function PublicLayout({ children }: PublicLayoutProps) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar user={user} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
