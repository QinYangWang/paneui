"use client"

import * as React from "react"

import { ImageGeneration } from "@paneui/ui/components/image-generation"

export default function ImageGenerationProgress() {
  const [progress, setProgress] = React.useState(0.4)
  const status = progress >= 1 ? "complete" : progress < 0.5 ? "generating" : "refining"
  return (
    <div className="flex w-full max-w-xs flex-col gap-4">
      <ImageGeneration status={status} progress={progress} prompt="Rainy Hong Kong street, neon reflections" alt="Neon-lit street in the rain">
        <div className="bg-linear-to-b from-primary/80 via-warning/50 to-destructive/60" />
      </ImageGeneration>
      <label className="flex flex-col gap-1.5 text-sm text-muted-foreground">
        <span className="tabular-nums">Progress {Math.round(progress * 100)}%</span>
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={progress}
          onChange={(e) => setProgress(Number(e.currentTarget.value))}
          className="w-full accent-primary"
        />
      </label>
    </div>
  )
}
