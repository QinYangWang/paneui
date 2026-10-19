"use client"

import { PaneuiLogoIcon } from "@/components/icons"
import { TextLink } from "@/components/docs/text-link"
import { setSiteLocale, SITE_LOCALES, T, useSiteLocale } from "@/lib/site-locale"
import { cn } from "@/lib/utils"

const GITHUB_URL = "https://github.com/QinYangWang/ui"

const LABELS: Record<(typeof SITE_LOCALES)[number], string> = { en: "English", zh: "中文" }

function LocaleSwitch({ className }: { className?: string }) {
  const locale = useSiteLocale()
  return (
    <div role="group" aria-label="Language" className={cn("flex rounded-lg bg-secondary p-0.5", className)}>
      {SITE_LOCALES.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setSiteLocale(l)}
          aria-pressed={locale === l}
          className={cn(
            "h-6 rounded-md px-2.5 text-ui-sm font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring/50",
            locale === l ? "bg-card text-foreground shadow-chip" : "text-muted-foreground hover:text-foreground"
          )}
        >
          {LABELS[l]}
        </button>
      ))}
    </div>
  )
}

export function LandingFooter() {
  return (
    <footer className="flex flex-col gap-4 border-t border-border pt-6">
      <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
        <span className="flex items-center gap-2 font-semibold">
          <PaneuiLogoIcon size={18} className="text-foreground" />
          paneui
        </span>
        <span className="text-ui-sm text-muted-foreground">MIT License</span>
        <nav className="ms-auto flex flex-wrap items-center gap-x-5 gap-y-2">
          <TextLink href={GITHUB_URL}>GitHub</TextLink>
          <TextLink href="/docs/installation">
            <T en="Installation" zh="安装" />
          </TextLink>
          <TextLink href="/docs/components">
            <T en="Components" zh="组件一览" />
          </TextLink>
          <TextLink href="/docs/theming">
            <T en="Theming" zh="主题" />
          </TextLink>
        </nav>
        <LocaleSwitch />
      </div>
    </footer>
  )
}
