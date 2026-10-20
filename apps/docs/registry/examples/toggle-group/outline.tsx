"use client"

import { ToggleGroup, ToggleGroupItem } from "@paneui/ui/components/toggle-group"

export default function ToggleGroupOutline() {
  return (
    <ToggleGroup variant="outline" size="sm" defaultValue={["50"]} aria-label="Image width">
      {["25", "50", "75", "100"].map((w) => (
        <ToggleGroupItem key={w} value={w}>
          {w}%
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  )
}
