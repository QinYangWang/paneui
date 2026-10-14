"use client"

import * as React from "react"

import { Label } from "@/registry/base-nova/ui/label"
import { Textarea } from "@/registry/base-nova/ui/textarea"

const MAX = 160

export default function TextareaWithCounter() {
  const [value, setValue] = React.useState("Running 10 minutes late, start without me.")

  return (
    <div className="flex w-full max-w-sm flex-col gap-2">
      <Label htmlFor="textarea-status">Status message</Label>
      <Textarea
        id="textarea-status"
        value={value}
        maxLength={MAX}
        onChange={(event) => setValue(event.target.value)}
        aria-describedby="textarea-status-count"
      />
      <p id="textarea-status-count" className="self-end text-xs text-muted-foreground tabular-nums">
        {value.length}/{MAX}
      </p>
    </div>
  )
}
