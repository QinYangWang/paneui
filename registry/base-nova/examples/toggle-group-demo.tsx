"use client"

import * as React from "react"

import { AlignCenterIcon, AlignLeftIcon, AlignRightIcon, BoldIcon, ItalicIcon, UnderlineIcon } from "@/components/icons"
import { ToggleGroup, ToggleGroupItem } from "@/registry/base-nova/ui/toggle-group"

export default function ToggleGroupDemo() {
  const [marks, setMarks] = React.useState<string[]>(["bold"])
  const [align, setAlign] = React.useState<string[]>(["left"])
  return (
    <div className="flex items-center gap-3">
      <ToggleGroup multiple value={marks} onValueChange={setMarks} aria-label="Text style">
        <ToggleGroupItem value="bold" aria-label="Bold">
          <BoldIcon />
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Italic">
          <ItalicIcon />
        </ToggleGroupItem>
        <ToggleGroupItem value="underline" aria-label="Underline">
          <UnderlineIcon />
        </ToggleGroupItem>
      </ToggleGroup>
      <div className="h-5 w-px bg-border" />
      <ToggleGroup value={align} onValueChange={(v) => v.length && setAlign(v)} aria-label="Alignment">
        <ToggleGroupItem value="left" aria-label="Align left">
          <AlignLeftIcon />
        </ToggleGroupItem>
        <ToggleGroupItem value="center" aria-label="Align centre">
          <AlignCenterIcon />
        </ToggleGroupItem>
        <ToggleGroupItem value="right" aria-label="Align right">
          <AlignRightIcon />
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  )
}
