"use client"

import * as React from "react"

import {
  ColorPicker,
  ColorPickerAlpha,
  ColorPickerArea,
  ColorPickerContent,
  ColorPickerHexInput,
  ColorPickerHue,
  ColorPickerSwatch,
  ColorPickerTrigger,
} from "@/registry/base-nova/ui/color-picker"

export default function ColorPickerWithAlpha() {
  const [color, setColor] = React.useState("#0ea5e980")

  return (
    <div className="flex flex-col items-center gap-2">
      <ColorPicker alpha value={color} onValueChange={setColor}>
        <ColorPickerTrigger />
        <ColorPickerContent>
          <ColorPickerArea />
          <ColorPickerHue />
          <ColorPickerAlpha />
          <div className="flex items-center gap-2">
            <ColorPickerSwatch />
            <ColorPickerHexInput />
          </div>
        </ColorPickerContent>
      </ColorPicker>
      <p className="text-xs text-muted-foreground">Overlay tint · 8-digit hex when opacity is below 100%</p>
    </div>
  )
}
