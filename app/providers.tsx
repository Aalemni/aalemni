"use client"

import { ThemeProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes"
import { TranslationProvider } from "@/contexts/translation-context"

export function Providers({ children, ...props }: ThemeProviderProps) {
  return (
    <ThemeProvider {...props}>
      <TranslationProvider>{children}</TranslationProvider>
    </ThemeProvider>
  )
}

