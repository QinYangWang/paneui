"use client"

import Link from "next/link"

import { PaneuiLogoIcon } from "@paneui/ui/icons"
import { LanguageToggle } from "@/components/docs/language-toggle"
import { ThemeControls } from "@/components/docs/theme-controls"
import { T, useT, type Localized } from "@/lib/site-locale"

export const GITHUB_URL = "https://github.com/QinYangWang/paneui"

const COLUMNS: { title: Localized; links: { label: Localized; href: string; external?: boolean }[] }[] = [
  {
    title: { en: "Docs", zh: "文档" },
    links: [
      { label: { en: "Introduction", zh: "介绍" }, href: "/docs" },
      { label: { en: "Installation", zh: "安装" }, href: "/docs/installation" },
      { label: { en: "Components", zh: "组件" }, href: "/docs/components" },
      { label: { en: "Theming", zh: "主题" }, href: "/docs/theming" },
    ],
  },
  {
    title: { en: "Project", zh: "项目" },
    links: [
      { label: "GitHub", href: GITHUB_URL, external: true },
      { label: { en: "Native showcase", zh: "Native 展示" }, href: "/native/", external: true },
      { label: { en: "Changelog", zh: "更新记录" }, href: "/docs/changelog" },
      { label: "CLI", href: "/docs/cli" },
    ],
  },
]

const linkClass =
  "rounded-sm text-sm text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/50"

export function LandingFooter() {
  const t = useT()
  return (
    <footer className="overflow-hidden border-t border-border">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-2 gap-x-6 gap-y-10 px-5 pt-14 sm:px-8 lg:grid-cols-12">
        <div className="col-span-2 flex flex-col items-start gap-5 lg:col-span-6">
          <span className="flex items-center gap-2.5 text-2xl font-semibold tracking-tight">
            <PaneuiLogoIcon size={28} />
            paneui
          </span>
          <p className="max-w-xs text-pretty text-muted-foreground">
            <T en="Small panes. Big ideas." zh="一方窗格，万千可能。" />
          </p>
          <div className="flex items-center gap-1">
            <ThemeControls />
            <LanguageToggle />
          </div>
        </div>
        {COLUMNS.map((col) => (
          <nav key={t(col.title)} aria-label={t(col.title)} className="flex flex-col gap-3 lg:col-span-3">
            <h2 className="font-mono text-ui-xs text-muted-foreground uppercase tracking-wider">{t(col.title)}</h2>
            <ul className="flex flex-col gap-2">
              {col.links.map((link) => (
                <li key={link.href}>
                  {link.external ? (
                    <a href={link.href} className={linkClass} {...(link.href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}>
                      {t(link.label)}
                    </a>
                  ) : (
                    <Link href={link.href} className={linkClass}>
                      {t(link.label)}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-5 pt-12 text-ui-sm text-muted-foreground sm:px-8">
        <span>
          <T en="MIT License" zh="MIT 许可" />
        </span>
        <span className="font-mono">paneui.dev</span>
      </div>
      {/* The wordmark scales with the page as an SVG, so it can run edge to edge without an off-scale text size. */}
      <div aria-hidden className="mx-auto w-full max-w-7xl px-5 pt-10 pb-6 text-foreground sm:px-8 sm:pb-10">
        <svg viewBox="0 0 1000 280" className="block w-full">
          <g fill="none" stroke="currentColor" strokeWidth="14" strokeLinecap="round">
            <rect x="12" y="12" width="206" height="206" rx="56" />
            <path d="M12 115h206M115 12v206" />
          </g>
          <text x="262" y="196" fill="currentColor" fontSize="252" fontWeight="600" textLength="736" lengthAdjust="spacingAndGlyphs" fontFamily="var(--font-sans)">
            paneui
          </text>
        </svg>
      </div>
    </footer>
  )
}
