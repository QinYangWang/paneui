"use client"

import * as React from "react"

import { SwatchPicker, type Swatch } from "@/registry/base-nova/ui/swatch-picker"

const colors: Swatch[] = [
  { value: "none", label: "None" },
  { value: "blue", label: "Blue", color: "var(--chart-1)" },
  { value: "orange", label: "Orange", color: "var(--chart-2)" },
  { value: "violet", label: "Violet", color: "var(--chart-3)" },
  { value: "green", label: "Green", color: "var(--chart-4)" },
  { value: "pink", label: "Pink", color: "var(--chart-5)" },
  { value: "amber", label: "Amber", color: "var(--chart-6)" },
  { value: "cyan", label: "Cyan", color: "var(--chart-7)" },
]

export default function SwatchPickerDemo() {
  const [value, setValue] = React.useState("sky")
  return (
    <div className="flex flex-col gap-3">
      <SwatchPicker label="Tag colour" swatches={colors} value={value} onValueChange={(v) => setValue(String(v))} />
      <p className="text-sm text-muted-foreground">Selected: {colors.find((c) => c.value === value)?.label}</p>
    </div>
  )
}
