"use client"

import Link from "next/link"

import { GithubIcon, PaneuiLogoIcon } from "@paneui/ui/icons"
import { Button } from "@paneui/ui/components/button"
import { ThemeToggle } from "@paneui/ui/components/theme-toggle"
import { Tooltip, TooltipContent, TooltipTrigger } from "@paneui/ui/components/tooltip"
import { LanguageToggle } from "@/components/docs/language-toggle"
import { ThemeControls } from "@/components/docs/theme-controls"
import { THEME_KEY } from "@/components/docs/theme-script"
import { useT, type Localized } from "@/lib/site-locale"

import { PillLink } from "./parts"

export const GITHUB_URL = "https://github.com/QinYangWang/paneui"

const navLink =
  "rounded-full px-3 py-1.5 text-ui-lg text-foreground/80 outline-none transition-colors duration-150 hover:bg-foreground/5 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/50"

/** A floating glass bar, the same on every scroll position. */
export function LandingHeader() {
  const t = useT()
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-40 px-3 pt-3 sm:px-5 sm:pt-5">
      <div className="pointer-events-auto mx-auto flex h-14 max-w-5xl items-center justify-between gap-2 rounded-full bg-card/70 ps-5 pe-2 shadow-surface backdrop-blur-xl">
        <Link
          href="/"
          aria-label={t({ en: "paneui home", zh: "paneui 首页" })}
          className="flex items-center gap-2 rounded-sm text-lg font-semibold outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
        >
          <PaneuiLogoIcon size={22} />
          paneui
        </Link>
        <nav aria-label={t({ en: "Main", zh: "主导航" })} className="hidden items-center gap-1 md:flex">
          <Link href="/docs" className={navLink}>
            {t({ en: "Docs", zh: "文档" })}
          </Link>
          <Link href="/docs/components" className={navLink}>
            {t({ en: "Components", zh: "组件" })}
          </Link>
          <a href="/native/" className={navLink}>
            Native
          </a>
        </nav>
        <div className="flex items-center gap-0.5">
          <Tooltip>
            <TooltipTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon-sm"
                  nativeButton={false}
                  render={<a href={GITHUB_URL} target="_blank" rel="noreferrer" />}
                  aria-label={t({ en: "GitHub repository", zh: "GitHub 仓库" })}
                  className="hidden sm:inline-flex"
                />
              }
            >
              <GithubIcon />
            </TooltipTrigger>
            <TooltipContent side="bottom">GitHub</TooltipContent>
          </Tooltip>
          <LanguageToggle />
          <ThemeControls className="hidden lg:flex" />
          <span className="lg:hidden">
            <ThemeToggle variant="ghost" storageKey={THEME_KEY} />
          </span>
          <PillLink href="/docs" tone="solid" size="sm" className="ms-1.5 hidden sm:inline-flex">
            {t({ en: "Get started", zh: "开始使用" })}
          </PillLink>
        </div>
      </div>
    </header>
  )
}

const LINKS: { label: Localized; href: string; external?: boolean }[] = [
  { label: { en: "Docs", zh: "文档" }, href: "/docs" },
  { label: { en: "Components", zh: "组件" }, href: "/docs/components" },
  { label: "Native", href: "/native/", external: true },
  { label: "GitHub", href: GITHUB_URL, external: true },
]

const footLink = "rounded-sm text-ui-lg text-muted-foreground outline-none transition-colors duration-150 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/50"

export function LandingFooter() {
  const t = useT()
  return (
    <footer className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 pt-10 pb-12 sm:flex-row sm:items-center sm:justify-between sm:px-8">
      <span className="flex items-center gap-2 font-semibold">
        <PaneuiLogoIcon size={18} />
        paneui
        <span className="ms-2 text-ui font-normal text-muted-foreground">{t({ en: "MIT License", zh: "MIT 许可" })}</span>
      </span>
      <nav aria-label={t({ en: "Footer", zh: "页脚" })}>
        <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
          {LINKS.map((link) => (
            <li key={link.href}>
              {link.external ? (
                <a href={link.href} className={footLink} {...(link.href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}>
                  {t(link.label)}
                </a>
              ) : (
                <Link href={link.href} className={footLink}>
                  {t(link.label)}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </footer>
  )
}
