"use client"

import { PaneuiLogoIcon } from "@paneui/ui/icons"
import { LanguageToggle } from "@/components/docs/language-toggle"

export function LandingFooter() {
  return (
    <footer className="flex flex-col gap-4 border-t border-border pt-6">
      <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
        <span className="flex items-center gap-2 font-semibold">
          <PaneuiLogoIcon size={18} className="text-foreground" />
          paneui
        </span>
        <span className="text-ui-sm text-muted-foreground">MIT License</span>
        <span className="ms-auto"><LanguageToggle /></span>
      </div>
    </footer>
  )
}
