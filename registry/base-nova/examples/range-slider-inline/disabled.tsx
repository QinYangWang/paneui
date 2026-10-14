"use client"

import { RangeSliderInline } from "@/registry/base-nova/ui/range-slider-inline"

export default function RangeSliderInlineDisabled() {
  return (
    <div className="w-full max-w-sm">
      <RangeSliderInline label="Bitrate" defaultValue={70} disabled formatValue={(v) => `${v * 4} kbps`} />
    </div>
  )
}
