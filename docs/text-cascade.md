# Text Cascade

> Rolls text letter by letter whenever its value changes.

Page: https://paneui.dev/docs/text-cascade/

## Installation

```bash
npx shadcn@latest add @paneui/text-cascade
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/text-cascade.json
```

Packages: `motion`.

Registry items it builds on: `@paneui/theme`.

## Usage

```tsx
import { TextCascade } from "@/components/ui/text-cascade"
```

```tsx
<TextCascade text={status} />
```

## Examples

### Stagger

```tsx
"use client"

import * as React from "react"

import { Button } from "@/registry/base-nova/ui/button"
import { TextCascade } from "@/registry/base-nova/ui/text-cascade"

const WORDS = ["Morning", "Afternoon", "Evening"]
const STAGGERS = [0, 0.025, 0.07]

export default function TextCascadeStagger() {
  const [i, setI] = React.useState(0)
  return (
    <div className="flex flex-col items-start gap-4">
      <div className="flex flex-col gap-2">
        {STAGGERS.map((stagger) => (
          <div key={stagger} className="flex items-baseline gap-3">
            <span className="w-24 text-xs text-muted-foreground tabular-nums">stagger {stagger}</span>
            <TextCascade text={WORDS[i]} stagger={stagger} className="text-lg font-semibold" />
          </div>
        ))}
      </div>
      <Button size="sm" variant="secondary" onClick={() => setI((n) => (n + 1) % WORDS.length)}>
        Next
      </Button>
    </div>
  )
}
```

### Width

```tsx
"use client"

import * as React from "react"

import { Button } from "@/registry/base-nova/ui/button"
import { TextCascade } from "@/registry/base-nova/ui/text-cascade"

const PLANS = ["Free", "Pro", "Business"]

export default function TextCascadeFixedWidth() {
  const [i, setI] = React.useState(0)
  return (
    <div className="flex flex-col items-start gap-4">
      <div className="flex flex-col gap-2 text-sm">
        <p>
          You are on the <TextCascade text={PLANS[i]} className="font-medium text-primary" /> plan, billed monthly.
        </p>
        <p>
          You are on the <TextCascade text={PLANS[i]} animateWidth={false} className="font-medium text-primary" /> plan,
          billed monthly.
        </p>
      </div>
      <Button size="sm" variant="secondary" onClick={() => setI((n) => (n + 1) % PLANS.length)}>
        Switch plan
      </Button>
    </div>
  )
}
```

### Headline

Use as the rotating word in a heading; it inherits the surrounding type.

```tsx
"use client"

import * as React from "react"

import { TextCascade } from "@/registry/base-nova/ui/text-cascade"

const VERBS = ["Plan", "Book", "Track", "Relax"]

export default function TextCascadeHeadline() {
  const [i, setI] = React.useState(0)
  React.useEffect(() => {
    const id = window.setInterval(() => setI((n) => (n + 1) % VERBS.length), 2200)
    return () => window.clearInterval(id)
  }, [])
  return (
    <h3 className="text-3xl font-semibold tracking-tight text-balance">
      <TextCascade text={VERBS[i]} className="text-primary" /> your next trip.
    </h3>
  )
}
```

## Motion

Each letter moves on a spring (460 / 32 / 0.55) and exits take half the stagger. With reduced motion the word cross-fades and the width snaps. Screen readers read the current `text` once from a hidden copy.

## Related

[Text Shimmer](https://paneui.dev/docs/text-shimmer), [Text Scramble](https://paneui.dev/docs/text-scramble), [Text Reveal](https://paneui.dev/docs/text-reveal). [Reasoning Text](https://paneui.dev/docs/reasoning-text) uses it for streamed labels.

## API Reference

### TextCascade

Letter-by-letter slot roll between the previous and current `text`. Also accepts every prop of `motion.span`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `text` (required) | `string` | — | Current text. Changing it rolls the letters, left to right, to the new value. |
| `stagger` | `number` | `0.025` | Seconds between neighbouring letters. |
| `animateWidth` | `boolean` | `true` | Glide the wrapper between the old and new widths (otherwise it snaps). |

| Data attribute | Description |
| --- | --- |
| `data-slot` | "text-cascade" |

### useContentWidth

`const [ref, width] = useContentWidth<HTMLSpanElement>()` tracks an in-flow sizer's rendered width with a ResizeObserver so a wrapper can animate to it. `SWAP_SPRING`, `WIDTH_SPRING` and `EASE_OUT` are exported too.
