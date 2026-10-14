"use client"

import * as React from "react"

import { ArcPicker } from "@/registry/base-nova/ui/arc-picker"
import { Button } from "@/registry/base-nova/ui/button"

const tips = [
  { value: "0", label: "No tip" },
  { value: "10", label: "10%" },
  { value: "15", label: "15%" },
  { value: "18", label: "18%" },
  { value: "20", label: "20%" },
  { value: "25", label: "25%" },
]

export default function ArcPickerForm() {
  const [sent, setSent] = React.useState<string | null>(null)

  return (
    <form
      className="flex flex-col items-center gap-3"
      onSubmit={(event) => {
        event.preventDefault()
        setSent(String(new FormData(event.currentTarget).get("tip")))
      }}
    >
      <ArcPicker aria-label="Tip" name="tip" options={tips} defaultValue="18" side="bottom" className="w-72" />
      <Button type="submit" size="sm">
        Pay $42.60
      </Button>
      <p className="text-xs text-muted-foreground tabular-nums">{sent ? `Submitted tip=${sent}` : "Nothing submitted yet"}</p>
    </form>
  )
}
