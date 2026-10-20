# Text Scramble

> Scrambles text into its new value when it changes.

Page: https://paneui.dev/docs/text-scramble/

## Installation

```bash
npx shadcn@latest add @paneui/text-scramble
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/text-scramble.json
```

Packages: `motion`.

Registry items it builds on: `@paneui/theme`.

## Usage

```tsx
import { TextScramble } from "@/components/ui/text-scramble"
```

```tsx
<TextScramble value={status} />
```

## Examples

### Scramble On Mount

```tsx
"use client"

import * as React from "react"

import { Button } from "@/registry/base-nova/ui/button"
import { TextScramble } from "@/registry/base-nova/ui/text-scramble"

export default function TextScrambleOnMount() {
  const [run, setRun] = React.useState(0)
  return (
    <div className="flex flex-col items-start gap-4">
      <TextScramble
        key={run}
        value="Welcome back, Mei"
        scrambleOnMount
        className="text-2xl font-semibold tracking-tight"
      />
      <Button size="sm" variant="secondary" onClick={() => setRun((n) => n + 1)}>
        Replay
      </Button>
    </div>
  )
}
```

### Custom Glyphs

Use a narrower set, such as hex digits, to match the kind of value shown.

```tsx
"use client"

import * as React from "react"

import { Button } from "@/registry/base-nova/ui/button"
import { TextScramble } from "@/registry/base-nova/ui/text-scramble"

const CODES = ["7F3A-91C2", "B04E-5D18", "E6A9-2F70"]

export default function TextScrambleGlyphs() {
  const [i, setI] = React.useState(0)
  return (
    <div className="flex flex-col items-start gap-4">
      <div className="flex flex-col gap-1">
        <span className="text-xs text-muted-foreground">Recovery code</span>
        <TextScramble value={CODES[i]} glyphs="0123456789ABCDEF" className="font-mono text-xl" />
      </div>
      <Button size="sm" variant="secondary" onClick={() => setI((n) => (n + 1) % CODES.length)}>
        Generate new code
      </Button>
    </div>
  )
}
```

### Duration

```tsx
"use client"

import * as React from "react"

import { Button } from "@/registry/base-nova/ui/button"
import { TextScramble } from "@/registry/base-nova/ui/text-scramble"

const WORDS = ["Tokyo", "Lisbon", "Reykjavík"]

export default function TextScrambleDuration() {
  const [i, setI] = React.useState(0)
  return (
    <div className="flex flex-col items-start gap-4">
      <div className="flex flex-col gap-2 text-sm">
        <div className="flex gap-3">
          <span className="w-24 text-muted-foreground">300ms</span>
          <TextScramble value={WORDS[i]} duration={300} className="font-medium" />
        </div>
        <div className="flex gap-3">
          <span className="w-24 text-muted-foreground">Auto</span>
          <TextScramble value={WORDS[i]} className="font-medium" />
        </div>
        <div className="flex gap-3">
          <span className="w-24 text-muted-foreground">1600ms</span>
          <TextScramble value={WORDS[i]} duration={1600} className="font-medium" />
        </div>
      </div>
      <Button size="sm" variant="secondary" onClick={() => setI((n) => (n + 1) % WORDS.length)}>
        Next city
      </Button>
    </div>
  )
}
```

### On Complete

Use to start the next step once the text settles.

```tsx
"use client"

import * as React from "react"

import { CheckCircleIcon } from "@/components/icons"
import { Button } from "@/registry/base-nova/ui/button"
import { TextScramble } from "@/registry/base-nova/ui/text-scramble"

export default function TextScrambleOnComplete() {
  const [decoded, setDecoded] = React.useState(false)
  const [value, setValue] = React.useState("••••••••••••")
  return (
    <div className="flex flex-col items-start gap-4">
      <div className="flex items-center gap-2 rounded-lg bg-muted px-3 py-2 font-mono text-sm shadow-well">
        <TextScramble value={value} onComplete={() => setDecoded(value !== "••••••••••••")} />
        {decoded && <CheckCircleIcon className="size-4 text-success" />}
      </div>
      <Button
        size="sm"
        variant="secondary"
        onClick={() => {
          setDecoded(false)
          setValue("sk-live-4f9a")
        }}
      >
        Reveal key
      </Button>
    </div>
  )
}
```

## Accessibility

The scrambling characters are `aria-hidden`; screen readers read the final `value` from a visually hidden copy. The final value also sizes the box, so the width never jumps.

## Motion

With reduced motion the new value appears immediately and nothing scrambles. Related: [Text Shimmer](https://paneui.dev/docs/text-shimmer), [Text Cascade](https://paneui.dev/docs/text-cascade), [Text Reveal](https://paneui.dev/docs/text-reveal).

## API Reference

### TextScramble

Scrambles from the previous `value` to the new one, resolving left to right. Also accepts every prop of `span`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` (required) | `string` | — | The text to show. Changing it scrambles from the old value to the new one. |
| `duration` | `number` | `length × 34, clamped 360–900` | Total animation time in ms. |
| `glyphs` | `string` | `"ABCDEFGHJKLMNPQRSTUVWXYZ0123456789#%&*+=?/"` | Characters sampled while a position is unresolved. An empty string disables scrambling. |
| `scrambleOnMount` | `boolean` | `false` | Also scramble in on first render. |
| `onComplete` | `() => void` | — | Called once the new value has fully resolved. |

| Data attribute | Description |
| --- | --- |
| `data-slot` | "text-scramble" on the root, "text-scramble-display" on the animated layer. |
