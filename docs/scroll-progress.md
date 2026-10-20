# Scroll Progress

> Shows how far the reader has scrolled.

Page: https://paneui.dev/docs/scroll-progress/

## Installation

```bash
npx shadcn@latest add @paneui/scroll-progress
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/scroll-progress.json
```

Packages: `motion`, `lenis`.

Registry items it builds on: `@paneui/theme`, `@paneui/smooth-scroll`.

## Usage

```tsx
import { ScrollProgress } from "@/components/ui/scroll-progress"
```

```tsx
<ScrollProgress />
```

## Examples

### Bottom Bar

Use inside a scroll container, pinned to its bottom edge.

```tsx
import { ScrollProgress } from "@/registry/base-nova/ui/scroll-progress"
import { SmoothScroll } from "@/registry/base-nova/ui/smooth-scroll"

const STEPS = [
  "Preheat the oven to 220°C and line a tray with baking paper.",
  "Toss the squash in olive oil, salt and chilli flakes.",
  "Roast for 25 minutes, turning once halfway.",
  "Meanwhile, toast the pumpkin seeds in a dry pan.",
  "Whisk tahini, lemon and a splash of warm water until smooth.",
  "Plate the squash, drizzle the sauce and scatter the seeds.",
]

export default function ScrollProgressBottomBar() {
  return (
    <SmoothScroll className="h-72 w-full max-w-md rounded-2xl bg-card shadow-surface">
      <ol className="flex list-decimal flex-col gap-4 py-6 pr-6 pl-10 text-sm leading-relaxed text-muted-foreground">
        {STEPS.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ol>
      <ScrollProgress position="sticky" side="bottom" thickness={4} spring={false} label="Recipe progress" />
    </SmoothScroll>
  )
}
```

### Ring Sizes

Use the ring where an edge bar has no room, such as a floating button.

```tsx
"use client"

import { useMotionValue } from "motion/react"

import { ScrollProgress } from "@/registry/base-nova/ui/scroll-progress"

export default function ScrollProgressRingSizes() {
  const progress = useMotionValue(0.62)
  return (
    <div className="flex items-center gap-4">
      <ScrollProgress variant="ring" progress={progress} size={32} thickness={2} label="Small ring" />
      <ScrollProgress variant="ring" progress={progress} size={44} showValue label="Default ring" />
      <ScrollProgress variant="ring" progress={progress} size={64} thickness={5} showValue label="Large ring" />
    </div>
  )
}
```

### Custom Progress

Use to show progress that isn't scroll, like an upload.

```tsx
"use client"

import * as React from "react"
import { animate, useMotionValue } from "motion/react"

import { Button } from "@/registry/base-nova/ui/button"
import { ScrollProgress } from "@/registry/base-nova/ui/scroll-progress"

export default function ScrollProgressCustomProgress() {
  const progress = useMotionValue(0)
  const [uploading, setUploading] = React.useState(false)

  const upload = () => {
    setUploading(true)
    progress.set(0)
    animate(progress, 1, { duration: 2.4, ease: "linear" }).then(() => setUploading(false))
  }

  return (
    <div className="flex w-full max-w-sm flex-col gap-3 rounded-xl bg-card p-4 shadow-raised">
      <div className="flex items-center gap-3">
        <ScrollProgress variant="ring" progress={progress} showValue label="Upload progress" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-foreground">offsite-photos.zip</p>
          <p className="text-xs text-muted-foreground">48 MB</p>
        </div>
        <Button size="sm" variant="secondary" onClick={upload} disabled={uploading}>
          {uploading ? "Uploading…" : "Upload"}
        </Button>
      </div>
      <div className="relative h-1 overflow-hidden rounded-full">
        <ScrollProgress position="absolute" progress={progress} thickness={4} label="Upload progress bar" />
      </div>
    </div>
  )
}
```

## Accessibility

Both variants are a `role="progressbar"` with `aria-valuenow` from 0 to 100, kept in step without re-rendering. Name it with `label`. Under reduced motion the spring follow is off.

## Inside a frame

A `sticky` bar takes no room in the flow: it overlays the content's edge, inset from the frame like the scrollbars, and its ends follow the frame's corners (radius less the inset), so it never runs past a rounded edge.

## Related

Reads [Smooth Scroll](https://paneui.dev/docs/smooth-scroll) by default. See also [Scroll To](https://paneui.dev/docs/scroll-to), [Scroll Reveal](https://paneui.dev/docs/scroll-reveal).

## API Reference

### ScrollProgress

A bar (default) or ring that fills with scroll progress from the nearest `SmoothScroll`, or the window outside one. Renders a `div`; no other props pass through.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `"bar" \| "ring"` | `"bar"` | Indicator shape. |
| `progress` | `MotionValue<number>` | — | Custom 0–1 source. Defaults to the nearest SmoothScroll (or the window). |
| `spring` | `boolean` | `true` | Spring-smooth the indicator. Off automatically under reduced motion. |
| `label` | `string` | `"Reading progress"` | Accessible name of the progressbar. |
| `className` | `string` | — | Merged onto the root. |
| `side` | `"top" \| "bottom"` | `"top"` | Bar only. Edge the bar sticks to. |
| `position` | `"fixed" \| "sticky" \| "absolute"` | `"fixed"` | Bar only. `fixed` for the page, `sticky` inside a scroll container, `absolute` inside a relative box. |
| `thickness` | `number` | `3` | Bar height or ring stroke width in px. |
| `inset` | `number` | — | Bar only. Gap in px from the container's edges. A `sticky` bar defaults to its scroll area's scrollbar inset (4px) and bends with the frame's rounded corners; other positions default to 0. |
| `size` | `number` | `44` | Ring only. Diameter in px. |
| `showValue` | `boolean` | `false` | Ring only. Show the percentage in the middle. |

| Data attribute | Description |
| --- | --- |
| `data-variant` | `bar` or `ring` on the root. |
