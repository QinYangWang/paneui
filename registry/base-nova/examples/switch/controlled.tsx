"use client"

import * as React from "react"

import { Label } from "@/registry/base-nova/ui/label"
import { Switch } from "@/registry/base-nova/ui/switch"

export default function SwitchControlled() {
  const [enabled, setEnabled] = React.useState(false)
  return (
    <div className="flex flex-col items-start gap-2">
      <Label className="gap-3">
        <Switch checked={enabled} onCheckedChange={setEnabled} />
        Vacation mode
      </Label>
      <p className="text-sm text-muted-foreground">
        {enabled ? "Replies are paused until you switch this off." : "Your agent answers new messages as usual."}
      </p>
    </div>
  )
}
