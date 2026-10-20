"use client"

import * as React from "react"

import { PreviewRail } from "@paneui/ui/components/preview-rail"

const sections = [
  { id: "intro", label: "Introduction", description: "What the toolkit is and who it is for." },
  { id: "install", label: "Installation", description: "Add the registry and pull your first component." },
  { id: "theming", label: "Theming", description: "Tokens, light and dark, and the raised surfaces." },
  { id: "motion", label: "Motion", description: "Springs, easing and reduced-motion fallbacks." },
  { id: "a11y", label: "Accessibility", description: "Keyboard maps, roles and focus rings." },
  { id: "forms", label: "Forms", description: "Inputs, selects, sliders and validation." },
  { id: "overlays", label: "Overlays", description: "Popovers, dialogs, drawers and sheets." },
  { id: "data", label: "Data display", description: "Tables, trees, charts and number tickers." },
  { id: "changelog", label: "Changelog", description: "Every release, newest first." },
]

export default function PreviewRailDemo() {
  const [value, setValue] = React.useState("theming")
  const current = sections.find((s) => s.id === value)
  return (
    <div className="flex w-full max-w-md items-center gap-6">
      <PreviewRail items={sections} value={value} onValueChange={setValue} label="On this page" />
      <div className="min-w-0 flex-1 text-end">
        <p className="text-xs text-muted-foreground">Reading</p>
        <p className="text-sm font-medium">{current?.label}</p>
      </div>
    </div>
  )
}
