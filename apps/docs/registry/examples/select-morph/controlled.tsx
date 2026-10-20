"use client"

import * as React from "react"

import { Label } from "@paneui/ui/components/label"
import { MorphSelect, MorphSelectContent, MorphSelectItem, MorphSelectTrigger, MorphSelectValue } from "@paneui/ui/components/select-morph"

const intervals = [
  { value: "5", label: "Every 5 minutes" },
  { value: "15", label: "Every 15 minutes" },
  { value: "60", label: "Every hour" },
  { value: "1440", label: "Once a day" },
]

export default function SelectMorphControlled() {
  const [value, setValue] = React.useState<string | null>("15")
  const [open, setOpen] = React.useState(false)

  return (
    <div className="flex w-full max-w-56 flex-col gap-2">
      <Label>Sync interval</Label>
      <MorphSelect items={intervals} value={value} onValueChange={setValue} open={open} onOpenChange={setOpen}>
        <MorphSelectTrigger>
          <MorphSelectValue />
        </MorphSelectTrigger>
        <MorphSelectContent>
          {intervals.map((i) => (
            <MorphSelectItem key={i.value} value={i.value}>
              {i.label}
            </MorphSelectItem>
          ))}
        </MorphSelectContent>
      </MorphSelect>
      <p className="text-xs text-muted-foreground">
        {open ? "Picking…" : `Syncs ${intervals.find((i) => i.value === value)?.label.toLowerCase() ?? "never"}.`}
      </p>
    </div>
  )
}
