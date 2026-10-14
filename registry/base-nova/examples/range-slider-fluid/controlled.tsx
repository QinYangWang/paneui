"use client"

import * as React from "react"

import { Button } from "@/registry/base-nova/ui/button"
import { RangeSliderFluid } from "@/registry/base-nova/ui/range-slider-fluid"

const presets = [25, 50, 100]

export default function RangeSliderFluidControlled() {
  const [zoom, setZoom] = React.useState(50)

  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <RangeSliderFluid label="Zoom" min={10} max={200} step={5} value={zoom} onValueChange={setZoom} />
      <div className="flex gap-2">
        {presets.map((p) => (
          <Button key={p} variant="secondary" size="sm" aria-pressed={zoom === p} onClick={() => setZoom(p)}>
            {p}%
          </Button>
        ))}
      </div>
    </div>
  )
}
