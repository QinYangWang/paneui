"use client"

import * as React from "react"

import { RangeSliderRuler } from "@/registry/base-nova/ui/range-slider-ruler"

export default function RangeSliderRulerCommitted() {
  const [saved, setSaved] = React.useState(21)
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <RangeSliderRuler
        label="Thermostat"
        unit="°C"
        min={10}
        max={30}
        step={0.5}
        majorEvery={4}
        gap={14}
        defaultValue={21}
        onValueCommitted={setSaved}
      />
      <p className="text-center text-xs text-muted-foreground tabular-nums">Saved: {saved.toFixed(1)} °C</p>
    </div>
  )
}
