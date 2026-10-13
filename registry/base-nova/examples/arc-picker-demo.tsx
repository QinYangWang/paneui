"use client"

import * as React from "react"

import { ArcPicker } from "@/registry/base-nova/ui/arc-picker"

const roasts = [
  { value: "light", label: "Light" },
  { value: "cinnamon", label: "Cinnamon" },
  { value: "city", label: "City" },
  { value: "full-city", label: "Full City" },
  { value: "vienna", label: "Vienna" },
  { value: "french", label: "French" },
  { value: "italian", label: "Italian", disabled: true },
  { value: "spanish", label: "Spanish" },
]

export default function ArcPickerDemo() {
  const [roast, setRoast] = React.useState("full-city")
  const label = roasts.find((r) => r.value === roast)?.label

  return (
    <div className="flex flex-col items-center gap-3">
      <ArcPicker aria-label="Roast level" options={roasts} value={roast} onValueChange={setRoast} side="right" className="w-56" />
      <p className="text-sm text-muted-foreground">
        Roasting to <span className="font-medium text-foreground">{label}</span> · scroll, drag or use arrow keys
      </p>
    </div>
  )
}
