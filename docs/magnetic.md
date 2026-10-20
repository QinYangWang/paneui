# Magnetic

> Makes any element lean toward a nearby cursor.

Page: https://paneui.dev/docs/magnetic/

## Installation

```bash
npx shadcn@latest add @paneui/magnetic
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/magnetic.json
```

Packages: `motion`.

Registry items it builds on: `@paneui/theme`.

## Usage

```tsx
import { Magnetic } from "@/components/ui/magnetic"
```

```tsx
<Magnetic>
  <a href="/pricing">Pricing</a>
</Magnetic>
```

## Examples

### Strength

```tsx
import { Magnetic } from "@/registry/base-nova/ui/magnetic"

const STRENGTHS = [0.15, 0.3, 0.6]

export default function MagneticStrength() {
  return (
    <div className="flex items-end gap-8">
      {STRENGTHS.map((strength) => (
        <div key={strength} className="flex flex-col items-center gap-3">
          <Magnetic strength={strength}>
            <div className="grid size-14 place-items-center rounded-2xl bg-card text-sm font-medium shadow-raised tabular-nums">
              {strength}
            </div>
          </Magnetic>
          <span className="text-xs text-muted-foreground">strength</span>
        </div>
      ))}
    </div>
  )
}
```

### Range

```tsx
import { Magnetic } from "@/registry/base-nova/ui/magnetic"

export default function MagneticRange() {
  return (
    <div className="flex items-center gap-12">
      {[8, 24, 64].map((range) => (
        <div key={range} className="flex flex-col items-center gap-3">
          <Magnetic range={range} strength={0.35}>
            <span className="rounded-full bg-secondary px-4 py-2 text-sm font-medium shadow-raised">Pull me</span>
          </Magnetic>
          <span className="text-xs text-muted-foreground tabular-nums">range {range}px</span>
        </div>
      ))}
    </div>
  )
}
```

### Spring and Disabled

```tsx
"use client"

import * as React from "react"

import { Magnetic } from "@/registry/base-nova/ui/magnetic"
import { Switch } from "@/registry/base-nova/ui/switch"

export default function MagneticSpring() {
  const [enabled, setEnabled] = React.useState(true)
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex items-center gap-8">
        <div className="flex flex-col items-center gap-3">
          <Magnetic disabled={!enabled} strength={0.4} spring={{ stiffness: 500, damping: 30, mass: 0.5 }}>
            <span className="rounded-full bg-secondary px-4 py-2 text-sm font-medium shadow-raised">Tight</span>
          </Magnetic>
          <span className="text-xs text-muted-foreground">500 / 30</span>
        </div>
        <div className="flex flex-col items-center gap-3">
          <Magnetic disabled={!enabled} strength={0.4} spring={{ stiffness: 90, damping: 10, mass: 0.6 }}>
            <span className="rounded-full bg-secondary px-4 py-2 text-sm font-medium shadow-raised">Loose</span>
          </Magnetic>
          <span className="text-xs text-muted-foreground">90 / 10</span>
        </div>
      </div>
      <label className="flex items-center gap-2 text-sm">
        <Switch checked={enabled} onCheckedChange={setEnabled} />
        Magnetic effect
      </label>
    </div>
  )
}
```

## Motion

Only fine pointers (mouse, pen) on hover-capable devices get the effect, and it is off entirely under `prefers-reduced-motion: reduce`. The wrapper never moves, only its inner span, so layout is unaffected.

## Related

Wrap a [Button](https://paneui.dev/docs/button), or any other element, to make it lean toward the cursor.

## API Reference

### Magnetic

Wraps any element so it leans toward a nearby cursor, then springs home. Also accepts every prop of `span`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` (required) | `ReactNode` | — | Content that moves. |
| `strength` | `number` | `0.3` | Fraction of the cursor's offset from centre the content follows. |
| `range` | `number` | `24` | Extra pull zone around the element, in px. |
| `disabled` | `boolean` | `false` | Turn the effect off. |
| `spring` | `{ stiffness?: number; damping?: number; mass?: number }` | `{ stiffness: 220, damping: 16, mass: 0.35 }` | Spring for the follow and the snap back, merged over the default. |

| Data attribute | Description |
| --- | --- |
| `data-slot` | "magnetic" |
