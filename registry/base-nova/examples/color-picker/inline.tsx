"use client"

import {
  ColorPicker,
  ColorPickerArea,
  ColorPickerHexInput,
  ColorPickerHue,
  ColorPickerSwatch,
  hsvaToRgba,
  useColorPicker,
} from "@/registry/base-nova/ui/color-picker"

function RgbReadout() {
  const { hsva } = useColorPicker()
  const { r, g, b } = hsvaToRgba(hsva)
  return (
    <p className="font-mono text-xs text-muted-foreground tabular-nums">
      rgb({r} {g} {b})
    </p>
  )
}

export default function ColorPickerInline() {
  return (
    <div className="flex w-64 flex-col gap-3 frame-2xl frame-p-3 bg-card shadow-raised">
      <ColorPicker defaultValue="#e11d48">
        <ColorPickerArea />
        <ColorPickerHue />
        <div className="flex items-center gap-2">
          <ColorPickerSwatch />
          <ColorPickerHexInput />
        </div>
        <RgbReadout />
      </ColorPicker>
    </div>
  )
}
