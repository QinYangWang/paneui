"use client"

import * as React from "react"

import {
  ColorPicker,
  ColorPickerArea,
  ColorPickerContent,
  ColorPickerHexInput,
  ColorPickerHue,
  ColorPickerPreset,
  ColorPickerPresets,
  ColorPickerSwatch,
  ColorPickerTrigger,
} from "@/registry/base-nova/ui/color-picker"

const presets = [
  { value: "#3b82f6", label: "Blue" },
  { value: "#8b5cf6", label: "Violet" },
  { value: "#ec4899", label: "Pink" },
  { value: "#ef4444", label: "Red" },
  { value: "#f59e0b", label: "Amber" },
  { value: "#10b981", label: "Emerald" },
  { value: "#14b8a6", label: "Teal" },
  { value: "#64748b", label: "Slate" },
]

export default function ColorPickerDemo() {
  const [color, setColor] = React.useState("#3b82f6")

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-muted-foreground">Brand accent</span>
      <ColorPicker value={color} onValueChange={setColor}>
        <ColorPickerTrigger />
        <ColorPickerContent>
          <ColorPickerArea />
          <ColorPickerHue />
          <div className="flex items-center gap-2">
            <ColorPickerSwatch />
            <ColorPickerHexInput />
          </div>
          <ColorPickerPresets>
            {presets.map((p) => (
              <ColorPickerPreset key={p.value} value={p.value} label={p.label} />
            ))}
          </ColorPickerPresets>
        </ColorPickerContent>
      </ColorPicker>
    </div>
  )
}
