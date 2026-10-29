"use client"

import Link from "next/link"

import { ArrowRightIcon } from "@paneui/ui/icons"
import { Button } from "@paneui/ui/components/button"
import { LocaleProvider } from "@paneui/ui/components/locale-provider"
import { useSiteLocale, useT } from "@/lib/site-locale"

import { Hero } from "./hero"
import { LandingFooter, LandingHeader } from "./landing-chrome"
import { Accents, Faq, Figures } from "./sections"
import { Wall } from "./wall"

import "./landing.css"

/** One band of the page, split from the next by a hairline. */
function Band({ children }: { children: React.ReactNode }) {
  return <div className="border-b border-border py-20 sm:py-24">{children}</div>
}

/**
 * The homepage, in bands: a centred hero with the install command, a wall of live components,
 * numbered figures, the accents, and questions. It follows the site theme.
 */
export function LandingPage({ codeHtml }: { count: number; codeHtml: string }) {
  const locale = useSiteLocale()
  const t = useT()
  return (
    <LocaleProvider locale={locale}>
      <div className="lp min-h-screen overflow-x-clip bg-background text-foreground">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-card focus:p-3 focus-visible:ring-2 focus-visible:ring-ring/50"
        >
          {t({ en: "Skip to content", zh: "跳转到内容" })}
        </a>
        <LandingHeader />
        <main id="main">
          <Hero />
          <Band>
            <Wall />
            <div className="mt-10 flex justify-center">
              <Button variant="outline" nativeButton={false} render={<Link href="/docs/components" />}>
                {t({ en: "Browse every component", zh: "浏览全部组件" })}
                <ArrowRightIcon data-icon="inline-end" className="rtl:-scale-x-100" />
              </Button>
            </div>
          </Band>
          <Band>
            <Figures codeHtml={codeHtml} />
          </Band>
          <Band>
            <Accents />
          </Band>
          <Band>
            <Faq />
          </Band>
        </main>
        <LandingFooter />
      </div>
    </LocaleProvider>
  )
}
