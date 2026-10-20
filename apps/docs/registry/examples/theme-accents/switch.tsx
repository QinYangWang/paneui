"use client"

import * as React from "react"

import { Button } from "@paneui/ui/components/button"
import { SegmentedControl, SegmentedControlItem } from "@paneui/ui/components/segmented-control"

const accents = [
  { value: "blue", label: "Blue" },
  { value: "green", label: "Green" },
  { value: "violet", label: "Violet" },
]

export default function ThemeAccentsSwitch() {
  const [accent, setAccent] = React.useState("blue")
  return (
    <div className="flex flex-col items-center gap-3">
      <SegmentedControl value={accent} onValueChange={setAccent} aria-label="Accent">
        {accents.map(({ value, label }) => (
          <SegmentedControlItem key={value} value={value}>
            {label}
          </SegmentedControlItem>
        ))}
      </SegmentedControl>
      <div data-accent={accent} className="flex gap-2">
        <Button>Publish</Button>
        <Button variant="outline">Preview</Button>
      </div>
    </div>
  )
}
