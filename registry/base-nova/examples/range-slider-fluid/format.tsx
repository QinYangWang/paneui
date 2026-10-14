"use client"

import { RangeSliderFluid } from "@/registry/base-nova/ui/range-slider-fluid"

export default function RangeSliderFluidFormat() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <RangeSliderFluid
        label="Playback speed"
        min={0.5}
        max={2}
        step={0.25}
        defaultValue={1}
        formatValue={(v) => `${v}×`}
      />
      <RangeSliderFluid
        label="Sleep timer"
        min={0}
        max={90}
        step={15}
        defaultValue={30}
        formatValue={(v) => (v === 0 ? "Off" : `${v} min`)}
      />
    </div>
  )
}
