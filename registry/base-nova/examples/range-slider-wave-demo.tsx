"use client"

import { RangeSliderWave } from "@/registry/base-nova/ui/range-slider-wave"

export default function RangeSliderWaveDemo() {
  return (
    <div className="w-full max-w-sm">
      <RangeSliderWave label="Bass boost" defaultValue={58} formatValue={(v) => `${v}%`} />
    </div>
  )
}
