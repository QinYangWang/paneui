"use client"

import { pick, useSiteLocale, type Localized } from "@/lib/site-locale"
import { InlineText } from "./doc-inline"

export function LocalizedInline({ text }: { text: Localized }) {
  return <InlineText text={pick(text, useSiteLocale())} />
}
