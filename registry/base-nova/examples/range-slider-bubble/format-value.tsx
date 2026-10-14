"use client"

import { RangeSliderBubble } from "@/registry/base-nova/ui/range-slider-bubble"

function formatDuration(minutes: number) {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return h ? `${h}h ${m.toString().padStart(2, "0")}m` : `${m}m`
}

export default function RangeSliderBubbleFormatValue() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-1">
      <span className="text-sm font-medium text-foreground">Focus session length</span>
      <RangeSliderBubble
        label="Focus session length"
        min={15}
        max={180}
        step={15}
        defaultValue={90}
        formatValue={formatDuration}
      />
    </div>
  )
}
