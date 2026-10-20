"use client"

import * as React from "react"

import { Button } from "@paneui/ui/components/button"
import { Checkbox } from "@paneui/ui/components/checkbox"
import { Label } from "@paneui/ui/components/label"

export default function CheckboxControlled() {
  const [accepted, setAccepted] = React.useState(false)

  return (
    <div className="flex max-w-xs flex-col items-start gap-4">
      <Label className="gap-3">
        <Checkbox checked={accepted} onCheckedChange={setAccepted} />
        I agree to the terms of service
      </Label>
      <Button size="sm" disabled={!accepted}>
        Create account
      </Button>
    </div>
  )
}
