"use client"

import { pick, useSiteLocale, type Localized } from "@/lib/site-locale"
import { siteCopy } from "@/lib/site-copy"

/** Client boundary for localized text passed by server-rendered docs. */
export function LocalizedText({ text }: { text: Localized }) {
  const locale = useSiteLocale()
  return pick(typeof text === "string" ? siteCopy(text) : text, locale)
}


export function LocalizedDate({ iso }: { iso: string }) {
  const locale = useSiteLocale()
  const date = new Intl.DateTimeFormat(locale === "zh" ? "zh-CN" : "en", {
    year: "numeric", month: "short", day: "numeric", timeZone: "UTC",
  }).format(new Date(iso))
  return <time dateTime={iso}>{date}</time>
}
