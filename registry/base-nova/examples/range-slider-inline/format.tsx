"use client"

import { RangeSliderInline } from "@/registry/base-nova/ui/range-slider-inline"

export default function RangeSliderInlineFormat() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <RangeSliderInline
        label="Max tokens"
        min={256}
        max={8192}
        step={256}
        defaultValue={2048}
        formatValue={(v) => v.toLocaleString("en-US")}
      />
      <RangeSliderInline
        label="Timeout"
        min={5}
        max={120}
        step={5}
        defaultValue={30}
        formatValue={(v) => `${v}s`}
      />
    </div>
  )
}
