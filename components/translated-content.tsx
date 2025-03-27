"use client"

import { useTranslation } from "@/contexts/translation-context"
import type { TranslationKey } from "@/lib/translations"

interface TranslatedContentProps {
  translationKey: TranslationKey
}

export function TranslatedContent({ translationKey }: TranslatedContentProps) {
  const { t } = useTranslation()
  return <>{t(translationKey)}</>
}

