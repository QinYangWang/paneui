"use client"

import * as React from "react"

import { BoldIcon } from "@/components/icons"
import { Toggle } from "@/registry/base-nova/ui/toggle-group"

export default function SingleToggle() {
  const [pressed, setPressed] = React.useState(false)
  return (
    <div className="flex items-center gap-3">
      <Toggle pressed={pressed} onPressedChange={setPressed} aria-label="Bold">
        <BoldIcon />
      </Toggle>
      <span className="text-sm text-muted-foreground">{pressed ? "On" : "Off"}</span>
    </div>
  )
}
