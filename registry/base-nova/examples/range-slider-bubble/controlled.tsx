"use client"

import * as React from "react"

import { RangeSliderBubble } from "@/registry/base-nova/ui/range-slider-bubble"

export default function RangeSliderBubbleControlled() {
  const [volume, setVolume] = React.useState(40)
  return (
    <div className="flex w-full max-w-sm flex-col gap-1">
      <div className="flex justify-between text-sm">
        <span className="font-medium text-foreground">Volume</span>
        <span className="text-muted-foreground tabular-nums">{volume}%</span>
      </div>
      <RangeSliderBubble label="Volume" value={volume} onValueChange={setVolume} formatValue={(v) => `${v}%`} />
    </div>
  )
}
