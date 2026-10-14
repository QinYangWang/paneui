"use client"

import * as React from "react"

import { ImageGeneration, type ImageGenerationStatus } from "@/registry/base-nova/ui/image-generation"

export default function ImageGenerationErrorRetry() {
  const [status, setStatus] = React.useState<ImageGenerationStatus>("error")
  const [downloads, setDownloads] = React.useState(0)
  const timer = React.useRef<number | undefined>(undefined)
  React.useEffect(() => () => window.clearTimeout(timer.current), [])

  const retry = () => {
    setStatus("generating")
    timer.current = window.setTimeout(() => setStatus("complete"), 1600)
  }

  return (
    <div className="flex w-full max-w-xs flex-col gap-2">
      <ImageGeneration
        status={status}
        prompt="Paper-cut fox in an autumn forest"
        meta="1024 × 1024"
        alt="Paper-cut fox among orange trees"
        onRetry={retry}
        onDownload={() => setDownloads((d) => d + 1)}
      >
        <div className="bg-linear-to-br from-warning/80 via-destructive/50 to-primary/40" />
      </ImageGeneration>
      <p className="text-xs text-muted-foreground tabular-nums">Downloads: {downloads}</p>
    </div>
  )
}
