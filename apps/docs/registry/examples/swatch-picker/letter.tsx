"use client"

import { SwatchPicker, type Swatch } from "@paneui/ui/components/swatch-picker"

const textColors: Swatch[] = [
  { value: "default", label: "Default" },
  { value: "gray", label: "Gray", color: "var(--muted-foreground)" },
  { value: "red", label: "Red", color: "var(--destructive)" },
  { value: "yellow", label: "Yellow", color: "var(--warning)" },
  { value: "green", label: "Green", color: "var(--success)" },
  { value: "blue", label: "Blue", color: "var(--chart-1)" },
  { value: "purple", label: "Purple", color: "var(--chart-3)" },
]

export default function SwatchPickerLetter() {
  return <SwatchPicker label="Text colour" variant="letter" swatches={textColors} defaultValue="default" />
}
