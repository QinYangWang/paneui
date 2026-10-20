"use client"

import * as React from "react"

import { Input } from "@paneui/ui/components/input"
import { IosZoomLock } from "@paneui/ui/components/ios-zoom-lock"
import { Label } from "@paneui/ui/components/label"
import { Switch } from "@paneui/ui/components/switch"
import { Textarea } from "@paneui/ui/components/textarea"

export default function IosZoomLockDemo() {
  const [enabled, setEnabled] = React.useState(true)
  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <IosZoomLock enabled={enabled} />
      <div className="flex items-center gap-2">
        <Switch id="zoom-lock" checked={enabled} onCheckedChange={setEnabled} />
        <Label htmlFor="zoom-lock">Lock zoom while typing</Label>
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="zoom-lock-email">Email</Label>
        <Input id="zoom-lock-email" type="email" placeholder="you@example.com" />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="zoom-lock-note">Note</Label>
        <Textarea id="zoom-lock-note" placeholder="Anything the agent should know?" />
      </div>
    </div>
  )
}
