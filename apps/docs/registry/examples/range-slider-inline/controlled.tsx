"use client"

import * as React from "react"

import { Button } from "@paneui/ui/components/button"
import { RangeSliderInline } from "@paneui/ui/components/range-slider-inline"

export default function RangeSliderInlineControlled() {
  const [volume, setVolume] = React.useState(40)
  const [saved, setSaved] = React.useState(40)

  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <RangeSliderInline
        label="Alert volume"
        value={volume}
        onValueChange={setVolume}
        onValueCommitted={(v) => setSaved(v as number)}
        formatValue={(v) => `${v}%`}
      />
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs text-muted-foreground tabular-nums">Saved at {saved}%</span>
        <Button variant="ghost" size="sm" onClick={() => setVolume(40)}>
          Reset
        </Button>
      </div>
    </div>
  )
}
