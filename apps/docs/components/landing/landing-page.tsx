"use client"

import Link from "next/link"

import { ArrowRightIcon, GithubIcon, PaneuiLogoIcon } from "@paneui/ui/icons"
import { Button } from "@paneui/ui/components/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@paneui/ui/components/tooltip"
import { LanguageToggle } from "@/components/docs/language-toggle"
import { ThemeControls } from "@/components/docs/theme-controls"
import { T, useT } from "@/lib/site-locale"

import { Gallery } from "./gallery"
import { Hero } from "./hero"
import { Install } from "./install"
import { GITHUB_URL, LandingFooter } from "./landing-footer"
import { Platforms } from "./platforms"
import { Tune } from "./tune"

function Header() {
  const t = useT()
  return (
    <header>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-5 py-4 sm:px-8">
        <Link href="/" aria-label={t({ en: "paneui home", zh: "paneui 首页" })} className="flex items-center gap-2 rounded-sm text-lg font-semibold outline-none focus-visible:ring-2 focus-visible:ring-ring/50">
          <PaneuiLogoIcon size={22} />
          paneui
        </Link>
        <nav aria-label={t({ en: "Main", zh: "主导航" })} className="flex items-center gap-1">
          <Button variant="ghost" nativeButton={false} render={<Link href="/docs/components" />} className="hidden md:inline-flex">
            <T en="Components" zh="组件" />
          </Button>
          <Button variant="ghost" nativeButton={false} render={<a href="/native/" />} className="hidden md:inline-flex">
            Native
          </Button>
          <Tooltip>
            <TooltipTrigger
              render={<Button variant="ghost" size="icon-sm" nativeButton={false} render={<a href={GITHUB_URL} target="_blank" rel="noreferrer" />} aria-label={t({ en: "GitHub repository", zh: "GitHub 仓库" })} />}
            >
              <GithubIcon />
            </TooltipTrigger>
            <TooltipContent side="bottom">GitHub</TooltipContent>
          </Tooltip>
          <ThemeControls className="hidden sm:flex" />
          <LanguageToggle />
          <Button variant="secondary" nativeButton={false} render={<Link href="/docs" />} className="ms-1 hidden sm:inline-flex">
            <T en="Docs" zh="文档" />
            <ArrowRightIcon data-icon="inline-end" className="rtl:-scale-x-100" />
          </Button>
        </nav>
      </div>
    </header>
  )
}

export function LandingPage({ count }: { count: number }) {
  return (
    <div className="min-h-screen overflow-x-clip bg-background text-foreground">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-card focus:p-3 focus-visible:ring-2 focus-visible:ring-ring/50"
      >
        <T en="Skip to content" zh="跳转到内容" />
      </a>
      <Header />
      <main id="main" className="flex flex-col gap-28 pb-28 sm:gap-40 sm:pb-40">
        <Hero />
        <Tune />
        <Platforms />
        <Gallery count={count} />
        <Install />
      </main>
      <LandingFooter />
    </div>
  )
}
