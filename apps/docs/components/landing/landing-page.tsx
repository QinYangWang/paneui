"use client"

import { LocaleProvider } from "@paneui/ui/components/locale-provider"
import { useSiteLocale, useT } from "@/lib/site-locale"

import { GetStarted, Install, Quote } from "./closing"
import { Features } from "./features"
import { Hero } from "./hero"
import { Kinds } from "./kinds"
import { LandingFooter, LandingHeader } from "./landing-chrome"

import "./landing.css"

/**
 * The homepage: a light, paper-toned page with a sky hero and pastel cards, each holding live
 * library components. It follows the site theme; dark mode swaps the scenery for night tones.
 */
export function LandingPage({ count, codeHtml }: { count: number; codeHtml: string }) {
  const locale = useSiteLocale()
  const t = useT()
  return (
    <LocaleProvider locale={locale}>
      <div className="lp min-h-screen overflow-x-clip text-foreground">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-card focus:p-3 focus-visible:ring-2 focus-visible:ring-ring/50"
        >
          {t({ en: "Skip to content", zh: "跳转到内容" })}
        </a>
        <LandingHeader />
        <main id="main" className="flex flex-col gap-24 pb-24 sm:gap-32 sm:pb-32">
          <Hero />
          <Kinds count={count} />
          <Quote>{t({ en: "“Every part of these windows is a live component. Press anything.”", zh: "「这些窗口里的每一块都是真实组件，随便点。」" })}</Quote>
          <div className="flex flex-col gap-6 sm:gap-10">
            <Features codeHtml={codeHtml} />
          </div>
          <Quote align="end">{t({ en: "“Made for apps people keep open all day.”", zh: "「为整天开着的应用而做。」" })}</Quote>
          <Install />
          <GetStarted />
        </main>
        <LandingFooter />
      </div>
    </LocaleProvider>
  )
}
