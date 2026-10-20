# Aspect Ratio

> Keeps content at a set ratio and animates ratio changes.

Page: https://paneui.dev/docs/aspect-ratio/

## Installation

```bash
npx shadcn@latest add @paneui/aspect-ratio
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/aspect-ratio.json
```

Packages: `motion`.

Registry items it builds on: `@paneui/theme`.

## Usage

```tsx
import { AspectRatio } from "@/components/ui/aspect-ratio"
```

```tsx
<AspectRatio ratio={16 / 9}>
  <div className="absolute inset-0 bg-muted" />
</AspectRatio>
```

## Composition

```text
AspectRatio
└── AspectRatioImage (optional)
```

## Examples

### Ratios

```tsx
import { AspectRatio } from "@/registry/base-nova/ui/aspect-ratio"

const ratios = [
  { label: "16:9", value: 16 / 9, use: "Video" },
  { label: "4:3", value: 4 / 3, use: "Photo" },
  { label: "1:1", value: 1, use: "Avatar" },
]

export default function AspectRatioRatios() {
  return (
    <div className="grid w-full max-w-lg grid-cols-3 items-end gap-4">
      {ratios.map((r) => (
        <div key={r.label} className="flex flex-col gap-2">
          <AspectRatio ratio={r.value} radius={12} contentClassName="flex items-center justify-center">
            <span className="text-sm font-medium text-muted-foreground tabular-nums">{r.label}</span>
          </AspectRatio>
          <span className="text-xs text-muted-foreground">{r.use}</span>
        </div>
      ))}
    </div>
  )
}
```

### With Image

```tsx
"use client"

import * as React from "react"

import { AspectRatio, AspectRatioImage } from "@/registry/base-nova/ui/aspect-ratio"
import { Button } from "@/registry/base-nova/ui/button"

// A self-contained 1600×900 landscape so the docs work offline.
const LANDSCAPE = `data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900">
    <defs><linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="oklch(0.62 0.12 258)"/><stop offset="1" stop-color="oklch(0.86 0.06 60)"/></linearGradient></defs>
    <rect width="1600" height="900" fill="url(#sky)"/>
    <circle cx="1120" cy="380" r="110" fill="oklch(0.95 0.05 80)"/>
    <path d="M0 640 L360 420 L620 600 L900 360 L1240 620 L1600 460 L1600 900 L0 900 Z" fill="oklch(0.42 0.06 258)"/>
    <path d="M0 760 L420 600 L820 740 L1200 620 L1600 760 L1600 900 L0 900 Z" fill="oklch(0.3 0.04 258)"/>
  </svg>`
)}`

const ratios = [
  { label: "16:9", value: 16 / 9 },
  { label: "1:1", value: 1 },
  { label: "4:5", value: 4 / 5 },
]

export default function AspectRatioWithImage() {
  const [ratio, setRatio] = React.useState(ratios[0])

  return (
    <div className="flex w-full max-w-72 flex-col items-center gap-4">
      <div className="flex h-80 w-full items-center justify-center">
        <div className="w-full max-w-(--frame-w)" style={{ "--frame-w": `min(100%, ${18 * ratio.value}rem)` } as React.CSSProperties}>
          <AspectRatio ratio={ratio.value}>
            <AspectRatioImage src={LANDSCAPE} width={1600} height={900} alt="Mountains at sunset" />
          </AspectRatio>
        </div>
      </div>
      <div className="flex gap-2">
        {ratios.map((r) => (
          <Button
            key={r.label}
            size="sm"
            variant={r.label === ratio.label ? "default" : "secondary"}
            aria-pressed={r.label === ratio.label}
            onClick={() => setRatio(r)}
          >
            {r.label}
          </Button>
        ))}
      </div>
    </div>
  )
}
```

### Radius

```tsx
import { AspectRatio } from "@/registry/base-nova/ui/aspect-ratio"

export default function AspectRatioRadius() {
  return (
    <div className="grid w-full max-w-lg grid-cols-3 gap-4">
      {[0, 12, 32].map((radius) => (
        <AspectRatio key={radius} ratio={1} radius={radius} contentClassName="flex items-center justify-center">
          <span className="text-sm font-medium text-muted-foreground tabular-nums">{radius}px</span>
        </AspectRatio>
      ))}
    </div>
  )
}
```

### Without Animation

```tsx
"use client"

import * as React from "react"

import { AspectRatio } from "@/registry/base-nova/ui/aspect-ratio"
import { Button } from "@/registry/base-nova/ui/button"

export default function AspectRatioNotAnimated() {
  const [wide, setWide] = React.useState(true)

  return (
    <div className="flex w-full max-w-sm flex-col items-center gap-4">
      <AspectRatio ratio={wide ? 21 / 9 : 16 / 9} animated={false} contentClassName="flex items-center justify-center">
        <div className="absolute inset-0 bg-linear-to-br from-primary/40 to-success/30" />
        <span className="relative text-sm font-medium tabular-nums">{wide ? "21:9" : "16:9"}</span>
      </AspectRatio>
      <Button variant="secondary" size="sm" onClick={() => setWide((w) => !w)}>
        Switch to {wide ? "16:9" : "21:9"}
      </Button>
    </div>
  )
}
```

## Motion

Ratio changes run as a motion layout animation with a bounce-free spring. With reduced motion the frame jumps straight to its new shape.

## API Reference

### AspectRatio

A full-width frame locked to a ratio, with a muted well background. Also accepts every prop of `motion.div`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `ratio` | `number` | `1` | Width divided by height, e.g. `16 / 9`. Invalid values fall back to 1. |
| `animated` | `boolean` | `true` | Animate ratio changes. Reduced motion always skips the movement. |
| `radius` | `number` | `20` | Corner radius in px. |
| `contentClassName` | `string` | — | Classes for the absolutely positioned content layer. |

### AspectRatioImage

Cover-cropped image for `AspectRatio`, sized from its real `width` and `height`. Must be used inside it. Also accepts every prop of `motion.img`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `alt` (required) | `string` | — | Alternative text. |
| `width` (required) | `number` | — | Intrinsic width in px. |
| `height` (required) | `number` | — | Intrinsic height in px. |
| `draggable` | `boolean` | `false` | Native image dragging. |
