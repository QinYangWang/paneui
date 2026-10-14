"use client"

import * as React from "react"

import { Button } from "@/registry/base-nova/ui/button"
import { Checkbox } from "@/registry/base-nova/ui/checkbox"
import { Label } from "@/registry/base-nova/ui/label"

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
