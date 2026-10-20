# Image Generation

> Shows image generation progress and results.

Page: https://paneui.dev/docs/image-generation/

## Installation

```bash
npx shadcn@latest add @paneui/image-generation
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/image-generation.json
```

Packages: `motion`.

Registry items it builds on: `@paneui/theme`, `@paneui/icons`, `@paneui/tool-result`.

## Usage

```tsx
import { ImageGeneration } from "@/components/ui/image-generation"
```

```tsx
<ImageGeneration status="generating" progress={0.4} prompt="A lighthouse at dusk">
  <img src={src} alt="" />
</ImageGeneration>
```

## Examples

### Statuses

```tsx
import { ImageGeneration, type ImageGenerationStatus } from "@/registry/base-nova/ui/image-generation"

const STATUSES: ImageGenerationStatus[] = ["queued", "generating", "refining", "error"]

export default function ImageGenerationStatuses() {
  return (
    <div className="grid w-full max-w-xl grid-cols-2 gap-4">
      {STATUSES.map((status) => (
        <ImageGeneration key={status} status={status} queuePosition={3} meta={status}>
          <div className="bg-linear-to-br from-primary via-primary/50 to-success/70" />
        </ImageGeneration>
      ))}
    </div>
  )
}
```

### Controlled Progress

```tsx
"use client"

import * as React from "react"

import { ImageGeneration } from "@/registry/base-nova/ui/image-generation"

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
```

### Aspect Ratio

```tsx
import { ImageGeneration } from "@/registry/base-nova/ui/image-generation"

export default function ImageGenerationAspectRatio() {
  return (
    <div className="flex w-full max-w-xl items-start gap-4">
      <ImageGeneration status="complete" aspectRatio="3 / 4" meta="768 × 1024 · portrait" className="flex-1">
        <div className="bg-linear-to-b from-primary/70 to-success/60" />
      </ImageGeneration>
      <ImageGeneration status="refining" progress={0.8} aspectRatio="16 / 9" meta="1792 × 1024 · wide" className="flex-1">
        <div className="bg-linear-to-r from-warning/70 to-destructive/60" />
      </ImageGeneration>
    </div>
  )
}
```

### Error and Retry

```tsx
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
        errorText="The model timed out. Your prompt is saved."
        onRetry={retry}
        onDownload={() => setDownloads((d) => d + 1)}
      >
        <div className="bg-linear-to-br from-warning/80 via-destructive/50 to-primary/40" />
      </ImageGeneration>
      <p className="text-xs text-muted-foreground tabular-nums">Downloads: {downloads}</p>
    </div>
  )
}
```

## Motion

Under reduced motion the grain, dot grid and scan sweep stop animating, the media no longer scales, and state changes apply instantly.

## Accessibility

The frame is `role="img"`: while working it reads the status and percentage, once complete it reads `alt` (falling back to `prompt`). The caption actions stay `inert` until complete.

## API Reference

### ImageGeneration

Fixed-frame surface that refines generated media in place. Also accepts every prop of `figure`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `ReactNode` | — | The generated media (img, canvas, svg). Rendered from the start so it can refine in place. |
| `status` | `"queued" \| "generating" \| "refining" \| "complete" \| "error"` | `"generating"` | Generation state. |
| `progress` | `number` | — | 0–1. Drives the blur and grain reveal; defaults per status (0, 0.3, 0.75, 1, 0). |
| `prompt` | `string` | — | Caption text, also copyable once complete. |
| `meta` | `ReactNode` | — | Small meta line, e.g. `1024 × 1024 · v6`. |
| `queuePosition` | `number` | — | Queue position shown while `queued`. |
| `aspectRatio` | `CSSProperties["aspectRatio"]` | `"1 / 1"` | Frame aspect ratio; any CSS `aspect-ratio` value. |
| `onRetry` | `() => void` | — | Adds Try again (error) and Generate again (complete). |
| `onDownload` | `() => void` | — | Adds a Download action once complete. |
| `errorText` | `ReactNode` | `"Couldn’t finish this image."` | Message in the frame when `status` is `error`; pass your own copy or a translation. |
| `retryLabel` | `ReactNode` | `"Try again"` | Label of the error frame's retry button (shown with `onRetry`). |
| `alt` | `string` | — | Accessible description of the finished image. |
| `mediaClassName` | `string` | — | Classes for the layer wrapping `children`. |

| Data attribute | Description |
| --- | --- |
| `data-status` | The current `status`. |
