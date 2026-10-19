"use client"

import * as React from "react"

/**
 * Site-only language switch for the docs and landing page (not shipped in the registry).
 * English is the default and the static HTML is rendered in English; the stored choice
 * (localStorage "site-locale") swaps text on the client and sets <html lang>.
 */
export const SITE_LOCALES = ["en", "zh"] as const
export type SiteLocale = (typeof SITE_LOCALES)[number]
/** Text in every site locale. A plain string is used as-is in all locales. */
export type Localized = string | { en: string; zh: string }

const KEY = "site-locale"
const EVENT = "site-locale-change"

function read(): SiteLocale {
  try {
    const v = localStorage.getItem(KEY)
    if (v === "en" || v === "zh") return v
  } catch {
    // storage unavailable
  }
  return "en"
}

function subscribe(cb: () => void) {
  window.addEventListener(EVENT, cb)
  window.addEventListener("storage", cb)
  return () => {
    window.removeEventListener(EVENT, cb)
    window.removeEventListener("storage", cb)
  }
}

export function setSiteLocale(locale: SiteLocale) {
  try {
    localStorage.setItem(KEY, locale)
  } catch {
    // storage unavailable
  }
  document.documentElement.lang = locale === "zh" ? "zh-CN" : "en"
  window.dispatchEvent(new Event(EVENT))
}

/** Pick the text for a locale. */
export function pick(text: Localized, locale: SiteLocale): string {
  return typeof text === "string" ? text : text[locale]
}

/** Current site locale ("en" during SSR and the first client render). */
export function useSiteLocale(): SiteLocale {
  return React.useSyncExternalStore(subscribe, read, () => "en")
}

/** `const t = useT(); t({ en: "Install", zh: "安装" })` */
export function useT() {
  const locale = useSiteLocale()
  return React.useCallback((text: Localized) => pick(text, locale), [locale])
}

/** Client text node for server components: `<T en="Install" zh="安装" />`. */
export function T({ en, zh }: { en: string; zh: string }) {
  return useT()({ en, zh })
}

/** Inline script for <head>: sets <html lang> before paint from the stored choice. */
export const siteLocaleScript = `try{if(localStorage.getItem("${KEY}")==="zh")document.documentElement.lang="zh-CN"}catch(e){}`
