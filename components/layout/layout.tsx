"use client"

import type * as React from "react"
import { usePathname } from "next/navigation"

import { AalemniSidebar } from "./sidebar"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  const pathname = usePathname()

  // Determine user role based on URL path
  const getUserRole = () => {
    if (pathname.startsWith("/admin")) return "admin"
    if (pathname.startsWith("/trainer")) return "trainer"
    return "student"
  }

  const userRole = getUserRole()

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <AalemniSidebar userRole={userRole} />
        <SidebarInset className="flex-1">
          <header className="flex h-16 items-center gap-4 border-b bg-background px-6">
            <SidebarTrigger />
            <div className="flex-1" />
            <ModeToggle />
            <Button variant="outline">Help</Button>
          </header>
          <main className="flex-1 p-6">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}

