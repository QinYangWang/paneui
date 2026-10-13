"use client"

import * as React from "react"

import { ColorSelector, ColorSwatch } from "@/registry/base-nova/ui/color-selector"

const colors = [
  { value: "slate", label: "Slate", color: "oklch(0.55 0.02 260)" },
  { value: "blue", label: "Blue", color: "oklch(0.6 0.19 255)" },
  { value: "violet", label: "Violet", color: "oklch(0.58 0.2 295)" },
  { value: "rose", label: "Rose", color: "oklch(0.64 0.2 10)" },
  { value: "amber", label: "Amber", color: "oklch(0.8 0.16 75)" },
  { value: "emerald", label: "Emerald", color: "oklch(0.68 0.15 160)" },
]

export default function ColorSelectorDemo() {
  const [accent, setAccent] = React.useState("blue")
  const current = colors.find((c) => c.value === accent)
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-baseline justify-between text-sm">
        <span className="font-medium">Accent colour</span>
        <span className="text-muted-foreground">{current?.label}</span>
      </div>
      <ColorSelector aria-label="Accent colour" value={accent} onValueChange={setAccent}>
        {colors.map((c) => (
          <ColorSwatch key={c.value} value={c.value} color={c.color} label={c.label} />
        ))}
      </ColorSelector>
    </div>
  )
}
