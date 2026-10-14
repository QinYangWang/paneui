"use client"

import * as React from "react"

import { Button } from "@/registry/base-nova/ui/button"
import { RangeSliderWave } from "@/registry/base-nova/ui/range-slider-wave"

export default function RangeSliderWaveControlled() {
  const [gain, setGain] = React.useState(0)

  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <RangeSliderWave
        label="Gain"
        min={-12}
        max={12}
        step={1}
        value={gain}
        onValueChange={setGain}
        formatValue={(v) => `${v > 0 ? "+" : ""}${v} dB`}
      />
      <Button variant="ghost" size="sm" className="self-end" disabled={gain === 0} onClick={() => setGain(0)}>
        Flatten
      </Button>
    </div>
  )
}
