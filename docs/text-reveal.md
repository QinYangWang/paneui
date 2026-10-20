# Text Reveal

> Reveals a headline in sequence.

Page: https://paneui.dev/docs/text-reveal/

## Installation

```bash
npx shadcn@latest add @paneui/text-reveal
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/text-reveal.json
```

Packages: `motion`.

Registry items it builds on: `@paneui/theme`.

## Usage

```tsx
import { TextReveal } from "@/components/ui/text-reveal"
```

```tsx
<TextReveal as="h2" text="Your week, handled." className="text-2xl font-semibold" />
```

## Examples

### By Character

Use for short headlines; letters of a word stay together when lines wrap.

```tsx
"use client"

import * as React from "react"

import { RefreshIcon } from "@/components/icons"
import { Button } from "@/registry/base-nova/ui/button"
import { TextReveal } from "@/registry/base-nova/ui/text-reveal"

export default function TextRevealSplitChar() {
  const [run, setRun] = React.useState(0)

  return (
    <div className="flex flex-col items-start gap-4">
      <TextReveal key={run} as="h3" split="char" text="Checked in." className="text-3xl font-semibold tracking-tight" />
      <Button variant="secondary" size="sm" onClick={() => setRun((r) => r + 1)}>
        <RefreshIcon data-icon="inline-start" />
        Replay
      </Button>
    </div>
  )
}
```

### Multiple Lines

Use for multi-line headlines that should reveal as one sequence.

```tsx
"use client"

import * as React from "react"

import { RefreshIcon } from "@/components/icons"
import { Button } from "@/registry/base-nova/ui/button"
import { TextReveal } from "@/registry/base-nova/ui/text-reveal"

export default function TextRevealLines() {
  const [run, setRun] = React.useState(0)

  return (
    <div className="flex flex-col items-start gap-4">
      <TextReveal
        key={run}
        as="blockquote"
        text={["Less time on the screen,", "more time with the people you love."]}
        className="text-xl font-medium tracking-tight text-balance"
      />
      <Button variant="secondary" size="sm" onClick={() => setRun((r) => r + 1)}>
        <RefreshIcon data-icon="inline-start" />
        Replay
      </Button>
    </div>
  )
}
```

### On Scroll Into View

```tsx
import { TextReveal } from "@/registry/base-nova/ui/text-reveal"

export default function TextRevealOnView() {
  return (
    <div className="h-56 w-full max-w-md overflow-y-auto overscroll-contain rounded-2xl bg-muted/50 px-6 shadow-well">
      <div className="flex h-72 items-end pb-4 text-sm text-muted-foreground">Scroll down inside this box ↓</div>
      <TextReveal
        as="h3"
        trigger="view"
        once={false}
        text="Plays each time it scrolls into view."
        className="mb-24 text-2xl font-semibold tracking-tight text-balance"
      />
    </div>
  )
}
```

### Custom Timing

Use when the reveal has to match the pace of surrounding motion.

```tsx
"use client"

import * as React from "react"

import { RefreshIcon } from "@/components/icons"
import { Button } from "@/registry/base-nova/ui/button"
import { TextReveal } from "@/registry/base-nova/ui/text-reveal"

export default function TextRevealCustomTiming() {
  const [run, setRun] = React.useState(0)

  return (
    <div key={run} className="flex flex-col items-start gap-4">
      <TextReveal
        as="h3"
        text="Slow, soft and deep."
        stagger={0.18}
        blur={16}
        offset="100%"
        transition={{ stiffness: 90, damping: 20 }}
        className="text-2xl font-semibold tracking-tight"
      />
      <TextReveal
        as="p"
        text="Quick and crisp, with almost no blur."
        stagger={0.03}
        blur={2}
        offset="20%"
        delay={0.2}
        className="text-sm text-muted-foreground"
      />
      <Button variant="secondary" size="sm" onClick={() => setRun((r) => r + 1)}>
        <RefreshIcon data-icon="inline-start" />
        Replay
      </Button>
    </div>
  )
}
```

## Motion

With reduced motion units only fade in, at half the stagger.

## Accessibility

The element gets the full text as its `aria-label` and the animated pieces are `aria-hidden`, so screen readers read it once, whole.

## Related

[Text Shimmer](https://paneui.dev/docs/text-shimmer), [Text Scramble](https://paneui.dev/docs/text-scramble), [Text Cascade](https://paneui.dev/docs/text-cascade).

## API Reference

### TextReveal

Reveals text word by word (or letter by letter). Set size, weight and color with `className`. Also accepts every prop of `HTML attributes`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `text` (required) | `string \| string[]` | — | Text to reveal. An array renders one line per entry. |
| `as` | `"span" \| "p" \| "div" \| "h1" \| "h2" \| "h3" \| "h4" \| "blockquote"` | `"span"` | Element to render. |
| `split` | `"word" \| "char"` | `"word"` | Animate a word or a character at a time. |
| `trigger` | `"mount" \| "view"` | `"mount"` | Play on mount, or once 40% of the text has scrolled into view. |
| `once` | `boolean` | `true` | With `trigger="view"`, only play the first time. |
| `stagger` | `number` | `0.07 (word) / 0.025 (char)` | Seconds between units. |
| `delay` | `number` | `0` | Seconds before the first unit. |
| `blur` | `number` | `10` | Starting blur in px. |
| `offset` | `string` | `"45%"` | Starting vertical offset, relative to the unit's height. |
| `transition` | `Transition` | `{ type: "spring", stiffness: 170, damping: 24, mass: 1 }` | motion/react transition merged over the default spring. |
