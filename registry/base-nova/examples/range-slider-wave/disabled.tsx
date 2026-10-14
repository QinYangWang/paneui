"use client"

import { RangeSliderWave } from "@/registry/base-nova/ui/range-slider-wave"

export default function RangeSliderWaveDisabled() {
  return (
    <div className="w-full max-w-sm">
      <RangeSliderWave label="Noise gate" defaultValue={30} disabled formatValue={(v) => `${v}%`} />
    </div>
  )
}
