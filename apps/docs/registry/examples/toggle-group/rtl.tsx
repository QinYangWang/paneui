"use client"

import * as React from "react"
import { DirectionProvider } from "@base-ui/react/direction-provider"
import { AlignLeftIcon, AlignRightIcon, BoldIcon, ItalicIcon, UnderlineIcon, AlignCenterIcon } from "@paneui/ui/icons"
import { ToggleGroup, ToggleGroupItem } from "@paneui/ui/components/toggle-group"

export default function ToggleGroupRtl() {
  const [marks, setMarks] = React.useState<string[]>(["bold"])
  const [align, setAlign] = React.useState<string[]>(["right"])
  return (
    <DirectionProvider direction="rtl">
      <div dir="rtl" className="flex items-center gap-3">
        <ToggleGroup multiple value={marks} onValueChange={setMarks} aria-label="نمط النص">
          <ToggleGroupItem value="bold" aria-label="غامق">
            <BoldIcon />
          </ToggleGroupItem>
          <ToggleGroupItem value="italic" aria-label="مائل">
            <ItalicIcon />
          </ToggleGroupItem>
          <ToggleGroupItem value="underline" aria-label="تسطير">
            <UnderlineIcon />
          </ToggleGroupItem>
        </ToggleGroup>
        <div className="h-5 w-px bg-border" />
        <ToggleGroup value={align} onValueChange={(v) => v.length && setAlign(v)} aria-label="المحاذاة">
          <ToggleGroupItem value="right" aria-label="محاذاة لليمين">
            <AlignRightIcon />
          </ToggleGroupItem>
          <ToggleGroupItem value="center" aria-label="توسيط">
            <AlignCenterIcon />
          </ToggleGroupItem>
          <ToggleGroupItem value="left" aria-label="محاذاة لليسار">
            <AlignLeftIcon />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </DirectionProvider>
  )
}
