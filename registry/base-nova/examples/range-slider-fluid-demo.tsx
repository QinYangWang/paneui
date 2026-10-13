"use client"

import { RangeSliderFluid } from "@/registry/base-nova/ui/range-slider-fluid"

export default function RangeSliderFluidDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <RangeSliderFluid label="Opacity" defaultValue={72} />
      <RangeSliderFluid
        label="Monthly budget"
        min={0}
        max={500}
        step={10}
        defaultValue={180}
        formatValue={(v) => `$${v}`}
      />
    </div>
  )
}
