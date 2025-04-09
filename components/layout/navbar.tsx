"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GraduationCap, Menu, ChevronDown, Search } from "lucide-react";

import { cn } from "@/lib_/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ModeToggle } from "@/components/mode-toggle";
import { useTranslation } from "@/contexts/translation-context";
import { User } from "@supabase/supabase-js"; // Import User type
import { signOutAction } from "@/supabase/actions/auth_actions";

interface NavbarProps {
  user: User | null; // user can be null if not logged in
}

export function Navbar({ user }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const pathname = usePathname();
  const { t, dir } = useTranslation();

  const navItems = [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Courses",
      href: "/courses",
      children: [
        {
          title: "Web Development",
          href: "/courses?category=web-development",
        },
        {
          title: "Business",
          href: "/courses?category=business",
        },
        {
          title: "Design",
          href: "/courses?category=design",
        },
        {
          title: "Marketing",
          href: "/courses?category=marketing",
        },
        {
          title: "All Categories",
          href: "/courses",
        },
      ],
    },
    {
      title: "Instructors",
      href: "/instructors",
    },
    {
      title: "Become Instructor",
      href: "/become-instructor",
    },
    {
      title: "Partners",
      href: "/partners",
    },
    {
      title: "Community",
      href: "/community",
    },
    {
      title: "About Us",
      href: "/about",
    },
    {
      title: "Contact Us",
      href: "/contact",
    },
  ];

  const handleSignOut = async () => {
    try {
      const result = await signOutAction();
      console.log(result);
    } catch (error) {}
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent
            side={dir === "rtl" ? "right" : "left"}
            className="pr-0"
          >
            <Link
              href="/"
              className="flex items-center gap-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <img src="https://drive.google.com/thumbnail?id=1xO6CCh7O79JHeD_w-0Ojdc1oH73M2gj_" />
            </Link>

            <div className="mt-6 flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <React.Fragment key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-2 text-lg font-medium",
                        pathname === item.href && "text-primary"
                      )}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.title}
                    </Link>
                    {item.children && (
                      <div
                        className={`${dir === "rtl" ? "mr-4" : "ml-4"} flex flex-col gap-1`}
                      >
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={cn(
                              "text-sm text-muted-foreground",
                              pathname === child.href && "text-primary"
                            )}
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {child.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
              <div className="flex flex-col gap-2">
                {user ? (
                  <button
                    onClick={() => {
                      console.log("logout");
                      setIsMenuOpen(false);
                      handleSignOut();
                    }}
                    className="text-lg font-medium text-left"
                  >
                    Logout
                  </button>
                ) : (
                  <div className="flex flex-col gap-2">
                    <Link
                      href="/login"
                      className="text-lg font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      href="/signup"
                      className="text-lg font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
        <Link
          href="/"
          className={`hidden lg:flex items-center gap-2 ${dir === "rtl" ? "ml-6" : "mr-6"}`}
        >
          <img src="https://drive.google.com/thumbnail?id=1xO6CCh7O79JHeD_w-0Ojdc1oH73M2gj_" />
        </Link>
        <nav className="hidden lg:flex items-center gap-6 text-sm">
          {navItems.map((item) => (
            <div key={item.href} className="relative group">
              {item.children ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className={cn(
                        "flex items-center gap-1 px-0",
                        pathname === item.href && "text-primary"
                      )}
                    >
                      {item.title}
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-48">
                    {item.children.map((child) => (
                      <DropdownMenuItem key={child.href} asChild>
                        <Link href={child.href}>{child.title}</Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link
                  href={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-aalemni-orange",
                    pathname === item.href && "text-aalemni-orange"
                  )}
                >
                  {item.title}
                </Link>
              )}
            </div>
          ))}
        </nav>
        <div className="flex-1" />
        <div className="hidden md:flex items-center gap-4">
          {/* <LanguageSwitcher /> */}
          <ModeToggle />
          {user ? (
            <Button
              onClick={() => {
                console.log("logout");
                handleSignOut();
              }}
              variant="ghost"
              className="bg-aalemni-orange hover:bg-aalemni-orange/90 text-white"
            >
              Logout
            </Button>
          ) : (
            <>
              <Link href="/login">
                <Button
                  variant="ghost"
                  className="text-aalemni-navy hover:text-aalemni-navy hover:bg-aalemni-navy/10"
                >
                  Login
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="bg-aalemni-orange hover:bg-aalemni-orange/90 text-white">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
