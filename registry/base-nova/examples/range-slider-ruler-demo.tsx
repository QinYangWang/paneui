"use client"

import * as React from "react"

import { RangeSliderRuler } from "@/registry/base-nova/ui/range-slider-ruler"

export default function RangeSliderRulerDemo() {
  const [weight, setWeight] = React.useState(72.5)
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <RangeSliderRuler
        label="Body weight"
        unit="kg"
        min={30}
        max={150}
        step={0.5}
        majorEvery={10}
        gap={10}
        value={weight}
        onValueChange={setWeight}
      />
      <p className="text-center text-xs text-muted-foreground">Flick the scale — it coasts and snaps to the nearest 0.5 kg.</p>
    </div>
  )
}
