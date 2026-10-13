"use client"

import { RangeSliderInline } from "@/registry/base-nova/ui/range-slider-inline"

export default function RangeSliderInlineDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <RangeSliderInline label="Volume" defaultValue={64} />
      <RangeSliderInline label="Brightness" defaultValue={30} formatValue={(v) => `${v}%`} snapToStops />
      <RangeSliderInline
        label="Temperature"
        min={0}
        max={2}
        step={0.1}
        defaultValue={0.7}
        formatValue={(v) => v.toFixed(1)}
      />
    </div>
  )
}
