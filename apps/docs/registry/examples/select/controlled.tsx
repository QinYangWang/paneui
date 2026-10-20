"use client"

import * as React from "react"

import { Label } from "@paneui/ui/components/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@paneui/ui/components/select"

const frequencies = [
  { value: "daily", label: "Every day", note: "A short recap at 8:00 each morning." },
  { value: "weekly", label: "Every Monday", note: "One summary of the week before." },
  { value: "never", label: "Never", note: "You’ll only get alerts that need action." },
]

export default function SelectControlled() {
  const [frequency, setFrequency] = React.useState<string | null>("weekly")
  const current = frequencies.find((f) => f.value === frequency)
  return (
    <div className="flex w-full max-w-64 flex-col gap-2">
      <Label>Email digest</Label>
      <Select items={frequencies} value={frequency} onValueChange={setFrequency}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {frequencies.map((f) => (
            <SelectItem key={f.value} value={f.value}>
              {f.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <p className="text-sm text-pretty text-muted-foreground">{current?.note}</p>
    </div>
  )
}
