"use client"

import { RangeSliderFluid } from "@/registry/base-nova/ui/range-slider-fluid"

export default function RangeSliderFluidDisabled() {
  return (
    <div className="w-full max-w-sm">
      <RangeSliderFluid label="Storage limit" defaultValue={60} disabled formatValue={(v) => `${v} GB`} />
    </div>
  )
}
