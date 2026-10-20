# Text Shimmer

> Highlights text while work is in progress.

Page: https://paneui.dev/docs/text-shimmer/

## Installation

```bash
npx shadcn@latest add @paneui/text-shimmer
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/text-shimmer.json
```

Registry items it builds on: `@paneui/theme`.

## Usage

```tsx
import { TextShimmer } from "@/components/ui/text-shimmer"
```

```tsx
<TextShimmer>Checking flight prices…</TextShimmer>
```

## Examples

### Elements

```tsx
import { TextShimmer } from "@/registry/base-nova/ui/text-shimmer"

export default function TextShimmerElements() {
  return (
    <div className="flex flex-col items-start gap-2">
      <TextShimmer as="h3" className="text-xl font-semibold tracking-tight">
        Drafting your itinerary
      </TextShimmer>
      <TextShimmer as="p" className="text-sm">
        Reading 14 hotel reviews near Shibuya…
      </TextShimmer>
      <p className="text-sm text-muted-foreground">
        Step 2 of 3: <TextShimmer className="font-medium">comparing prices</TextShimmer>
      </p>
    </div>
  )
}
```

### Speed

```tsx
import { TextShimmer } from "@/registry/base-nova/ui/text-shimmer"

const SPEEDS = [
  { duration: 1.2, label: "Fast · 1.2s" },
  { duration: 2.2, label: "Default · 2.2s" },
  { duration: 4, label: "Slow · 4s" },
]

export default function TextShimmerSpeed() {
  return (
    <div className="flex flex-col items-start gap-3">
      {SPEEDS.map((s) => (
        <div key={s.duration} className="flex items-center gap-3">
          <span className="w-28 text-xs text-muted-foreground">{s.label}</span>
          <TextShimmer duration={s.duration} className="text-sm font-medium">
            Generating summary…
          </TextShimmer>
        </div>
      ))}
    </div>
  )
}
```

### Spread

```tsx
import { TextShimmer } from "@/registry/base-nova/ui/text-shimmer"

const SPREADS = [6, 14, 28]

export default function TextShimmerSpread() {
  return (
    <div className="flex flex-col items-start gap-3">
      {SPREADS.map((spread) => (
        <div key={spread} className="flex items-center gap-3">
          <span className="w-20 text-xs text-muted-foreground tabular-nums">spread {spread}</span>
          <TextShimmer spread={spread} className="text-lg font-semibold">
            Searching the web
          </TextShimmer>
        </div>
      ))}
    </div>
  )
}
```

### Colors

```tsx
import type * as React from "react"

import { TextShimmer } from "@/registry/base-nova/ui/text-shimmer"

export default function TextShimmerColors() {
  return (
    <div className="flex flex-col items-start gap-3">
      <TextShimmer
        className="text-sm font-medium"
        style={{ "--shimmer-highlight": "var(--primary)" } as React.CSSProperties}
      >
        Connecting to your calendar…
      </TextShimmer>
      <TextShimmer
        className="text-sm font-medium"
        style={
          {
            "--shimmer-base": "var(--success)",
            "--shimmer-highlight": "var(--foreground)",
          } as React.CSSProperties
        }
      >
        Payment verified, finishing up…
      </TextShimmer>
    </div>
  )
}
```

## Motion

The sweep is a CSS keyframe animation shipped with the component. The band enters and leaves fully clear of the text, so the loop has no visible reset. Under `prefers-reduced-motion: reduce` it stops with the band resting mid-text.

## Related

[Text Scramble](https://paneui.dev/docs/text-scramble), [Text Cascade](https://paneui.dev/docs/text-cascade), [Text Reveal](https://paneui.dev/docs/text-reveal).

## API Reference

### TextShimmer

Text with a looping highlight swept across it via a clipped background gradient. Also accepts every prop of `HTML element (span by default)`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `as` | `"span" \| "p" \| "div" \| "h1" \| "h2" \| "h3" \| "h4"` | `"span"` | Element to render. |
| `duration` | `number` | `2.2` | Seconds for one sweep. |
| `spread` | `number` | `14` | Width of the bright band; 14 spans about half the text. |
| `style` | `CSSProperties` | — | Merged over the generated gradient and animation; set `--shimmer-base` / `--shimmer-highlight` here. |

| Data attribute | Description |
| --- | --- |
| `data-slot` | "text-shimmer" |
