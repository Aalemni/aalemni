"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { type Locale, type TranslationKey, translations } from "@/lib/translations"

type TranslationContextType = {
  locale: Locale
  t: (key: TranslationKey) => string
  changeLocale: (locale: Locale) => void
  dir: "ltr" | "rtl"
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined)

export function TranslationProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en")

  const dir = locale === "ar" ? "rtl" : "ltr"

  const t = (key: TranslationKey): string => {
    return translations[locale][key] || key
  }

  const changeLocale = (newLocale: Locale) => {
    setLocale(newLocale)
    localStorage.setItem("locale", newLocale)
    document.documentElement.dir = newLocale === "ar" ? "rtl" : "ltr"
    document.documentElement.lang = newLocale
  }

  useEffect(() => {
    const savedLocale = localStorage.getItem("locale") as Locale | null
    if (savedLocale && (savedLocale === "en" || savedLocale === "ar")) {
      changeLocale(savedLocale)
    }
  }, [])

  return <TranslationContext.Provider value={{ locale, t, changeLocale, dir }}>{children}</TranslationContext.Provider>
}

export function useTranslation() {
  const context = useContext(TranslationContext)
  if (context === undefined) {
    throw new Error("useTranslation must be used within a TranslationProvider")
  }
  return context
}

