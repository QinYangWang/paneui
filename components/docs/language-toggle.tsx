"use client"

import { setSiteLocale, useSiteLocale } from "@/lib/site-locale"
import { Button } from "@/registry/base-nova/ui/button"

export function LanguageToggle() {
  const locale = useSiteLocale()
  return (
    <Button
      variant="ghost"
      size="sm"
      aria-label={locale === "en" ? "切换为中文" : "Switch to English"}
      onClick={() => setSiteLocale(locale === "en" ? "zh" : "en")}
    >
      <span lang="en">EN</span> / <span lang="zh-CN">中文</span>
    </Button>
  )
}
