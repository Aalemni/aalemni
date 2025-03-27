"use client";

import { Check, ChevronDown, Globe } from "lucide-react";

import { cn } from "@/lib_/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTranslation } from "@/contexts/translation-context";
import type { Locale } from "@/lib/translations";

type Language = {
  code: Locale;
  name: string;
  nativeName: string;
  flag: string;
};

const languages: Language[] = [
  {
    code: "en",
    name: "English",
    nativeName: "English",
    flag: "🇺🇸",
  },
  {
    code: "ar",
    name: "Arabic",
    nativeName: "العربية",
    flag: "🇦🇪",
  },
];

interface LanguageSwitcherProps {
  className?: string;
  variant?: "default" | "outline" | "ghost";
}

export function LanguageSwitcher({
  className,
  variant = "outline",
}: LanguageSwitcherProps) {
  const { locale, changeLocale, t } = useTranslation();

  const currentLanguage =
    languages.find((lang) => lang.code === locale) || languages[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={variant}
          size="sm"
          className={cn("gap-1 px-2 sm:gap-2 sm:px-3", className)}
        >
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline-block">
            {currentLanguage.nativeName}
          </span>
          <span className="inline-block sm:hidden">{currentLanguage.flag}</span>
          <ChevronDown className="h-4 w-4 opacity-70" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => changeLocale(language.code)}
            className={cn(
              "flex items-center gap-2 px-3 py-2",
              locale === language.code && "font-medium"
            )}
          >
            <span className="text-base">{language.flag}</span>
            <span>{language.nativeName}</span>
            {locale === language.code && <Check className="ml-auto h-4 w-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
