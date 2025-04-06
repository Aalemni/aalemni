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
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ModeToggle } from "@/components/mode-toggle";
import { useTranslation } from "@/contexts/translation-context";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const pathname = usePathname();
  const { t, dir } = useTranslation();

  const navItems = [
    {
      title: t("common.home"),
      href: "/",
    },
    {
      title: t("common.courses"),
      href: "/courses",
      children: [
        {
          title: t("categories.webDevelopment"),
          href: "/courses?category=web-development",
        },
        {
          title: t("categories.business"),
          href: "/courses?category=business",
        },
        {
          title: t("categories.design"),
          href: "/courses?category=design",
        },
        {
          title: t("categories.marketing"),
          href: "/courses?category=marketing",
        },
        {
          title: "All Categories",
          href: "/courses",
        },
      ],
    },
    {
      title: t("common.instructors"),
      href: "/instructors",
    },
    {
      title: t("common.becomeTrainer"),
      href: "/become-instructor",
    },
    {
      title: t("common.partners"),
      href: "/partners",
    },
    {
      title: t("common.community"),
      href: "/community",
    },
    {
      title: t("common.contactUs"),
      href: "/contact",
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
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
              {/* <GraduationCap className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">Aalemni</span>*/}
            </Link>

            <div className="mt-6 flex flex-col gap-4">
              <div className="relative">
                <Search
                  className={`absolute ${dir === "rtl" ? "right-2.5" : "left-2.5"} top-2.5 h-4 w-4 text-muted-foreground`}
                />
                <Input
                  type="search"
                  placeholder={t("common.searchCourses")}
                  className={dir === "rtl" ? "pr-8" : "pl-8"}
                />
              </div>

              {/* <div className="flex items-center gap-2">
                <LanguageSwitcher />
                <ModeToggle />
              </div> */}

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
                <Link
                  href="/login"
                  className="text-lg font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t("common.login")}
                </Link>
                <Link
                  href="/signup"
                  className="text-lg font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t("common.signup")}
                </Link>
              </div>
            </div>
          </SheetContent>
        </Sheet>
        <Link
          href="/"
          className={`flex items-center gap-2 ${dir === "rtl" ? "ml-6" : "mr-6"}`}
        >
          <GraduationCap className="h-6 w-6 text-aalemni-orange" />
          <span className="text-xl font-bold text-aalemni-navy">Aalemni</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm">
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
          <div className="relative">
            <Search
              className={`absolute ${dir === "rtl" ? "right-2.5" : "left-2.5"} top-2.5 h-4 w-4 text-muted-foreground`}
            />
            <Input
              type="search"
              placeholder={t("common.searchCourses")}
              className={`w-64 ${dir === "rtl" ? "pr-8" : "pl-8"} rounded-full bg-muted`}
            />
          </div>
          {/* <LanguageSwitcher /> */}
          <ModeToggle />
          <Link href="/login">
            <Button
              variant="ghost"
              className="text-aalemni-navy hover:text-aalemni-navy hover:bg-aalemni-navy/10"
            >
              {t("common.login")}
            </Button>
          </Link>
          <Link href="/signup">
            <Button className="bg-aalemni-orange hover:bg-aalemni-orange/90 text-white">
              {t("common.signup")}
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
