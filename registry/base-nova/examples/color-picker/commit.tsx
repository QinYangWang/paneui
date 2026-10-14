"use client"

import * as React from "react"

import {
  ColorPicker,
  ColorPickerArea,
  ColorPickerContent,
  ColorPickerHue,
  ColorPickerTrigger,
} from "@/registry/base-nova/ui/color-picker"

export default function ColorPickerCommit() {
  const [live, setLive] = React.useState("#16a34a")
  const [saved, setSaved] = React.useState("#16a34a")
  const [saves, setSaves] = React.useState(0)

  return (
    <div className="flex flex-col items-center gap-3">
      <ColorPicker
        defaultValue={saved}
        onValueChange={setLive}
        onValueCommit={(hex) => {
          setSaved(hex)
          setSaves((n) => n + 1)
        }}
      >
        <ColorPickerTrigger />
        <ColorPickerContent>
          <ColorPickerArea />
          <ColorPickerHue />
        </ColorPickerContent>
      </ColorPicker>
      <dl className="grid grid-cols-2 gap-x-4 gap-y-1 font-mono text-xs tabular-nums">
        <dt className="text-muted-foreground">onValueChange</dt>
        <dd className="uppercase">{live}</dd>
        <dt className="text-muted-foreground">onValueCommit</dt>
        <dd className="uppercase">
          {saved} · {saves} saves
        </dd>
      </dl>
    </div>
  )
}
