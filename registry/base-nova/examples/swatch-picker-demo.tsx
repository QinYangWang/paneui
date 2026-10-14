"use client"

import * as React from "react"

import { SwatchPicker, type Swatch } from "@/registry/base-nova/ui/swatch-picker"

const colors: Swatch[] = [
  { value: "none", label: "None" },
  { value: "teal", label: "Teal", color: "var(--chart-1)" },
  { value: "lime", label: "Lime", color: "var(--chart-2)" },
  { value: "pink", label: "Pink", color: "var(--chart-3)" },
  { value: "sky", label: "Sky", color: "var(--chart-4)" },
  { value: "purple", label: "Purple", color: "var(--chart-5)" },
  { value: "blue", label: "Blue", color: "var(--chart-6)" },
  { value: "yellow", label: "Yellow", color: "var(--chart-8)" },
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
