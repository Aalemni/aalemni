"use client";

import type * as React from "react";
import { usePathname } from "next/navigation";

import { AalemniSidebar } from "./sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { useTranslation } from "@/contexts/translation-context";
import { User } from "@/types/types";

interface MainLayoutProps {
  children: React.ReactNode;
  showSidebar?: boolean;
  logged_in_user: User;
}

export function MainLayout({
  children,
  showSidebar = true,
  logged_in_user,
}: MainLayoutProps) {
  const pathname = usePathname();
  const { t } = useTranslation();

  type UserRole = "admin" | "instructor" | "student";

  // Determine user role based on URL path if user not found
  const getUserRole = () => {
    if (!pathname) return "student";
    if (pathname.startsWith("/admin")) return "admin";
    if (pathname.startsWith("/instructor")) return "instructor";
    if (pathname.startsWith("/student")) return "student";
    return "student";
  };
  let userRole = logged_in_user.role;
  if (!logged_in_user.role && logged_in_user.role.length < 0) {
    userRole = getUserRole();
  }

  if (!showSidebar) {
    return <>{children}</>;
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AalemniSidebar userRole={userRole as UserRole} />
        <SidebarInset className="flex-1">
          <header className="flex h-16 items-center gap-4 border-b bg-background px-6">
            <SidebarTrigger />
            <div className="flex-1" />
            {/* <LanguageSwitcher /> */}
            <ModeToggle />
            <Button variant="outline">{t("common.help")}</Button>
          </header>
          <main className="flex-1">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
