"use client"

import { RangeSliderBubble } from "@/registry/base-nova/ui/range-slider-bubble"

export default function RangeSliderBubbleDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-1">
      <div className="flex justify-between text-sm">
        <span className="font-medium text-foreground">Max price per night</span>
        <span className="text-muted-foreground">Drag the thumb</span>
      </div>
      <RangeSliderBubble
        label="Max price per night"
        min={40}
        max={400}
        step={5}
        defaultValue={160}
        formatValue={(v) => `$${v}`}
      />
    </div>
  )
}
