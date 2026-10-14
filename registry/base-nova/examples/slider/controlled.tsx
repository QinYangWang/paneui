"use client"

import * as React from "react"

import { Slider } from "@/registry/base-nova/ui/slider"

export default function SliderControlled() {
  const [volume, setVolume] = React.useState(60)

  return (
    <div className="flex w-full max-w-xs flex-col gap-3">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium">Volume</span>
        <span className="text-muted-foreground tabular-nums">{volume}%</span>
      </div>
      <Slider value={volume} onValueChange={(value) => setVolume(value as number)} aria-label="Volume" />
    </div>
  )
}
