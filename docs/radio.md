# Radio

> Picks exactly one option from a short list.

Page: https://paneui.dev/docs/radio/

## Installation

```bash
npx shadcn@latest add @paneui/radio
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/radio.json
```

Packages: `@base-ui/react`, `motion`, `class-variance-authority`.

Registry items it builds on: `@paneui/theme`, `@paneui/control-size`.

## Usage

```tsx
import { Label } from "@/components/ui/label"
import { Radio, RadioGroup } from "@/components/ui/radio"
```

```tsx
<RadioGroup defaultValue="pro" aria-label="Plan">
  <Label>
    <Radio value="starter" />
    Starter
  </Label>
  <Label>
    <Radio value="pro" />
    Pro
  </Label>
</RadioGroup>
```

## Composition

```text
RadioGroup
└── Label
    └── Radio
```

## Examples

### Horizontal

Use for two or three short options that fit on one line.

```tsx
import { Label } from "@/registry/base-nova/ui/label"
import { Radio, RadioGroup } from "@/registry/base-nova/ui/radio"

export default function RadioHorizontal() {
  return (
    <RadioGroup defaultValue="monthly" aria-label="Billing period" className="flex-row gap-6">
      <Label className="gap-2 font-normal">
        <Radio value="monthly" />
        Monthly
      </Label>
      <Label className="gap-2 font-normal">
        <Radio value="yearly" />
        Yearly
      </Label>
    </RadioGroup>
  )
}
```

### Controlled

Use when other UI reacts to the choice.

```tsx
"use client"

import * as React from "react"

import { Label } from "@/registry/base-nova/ui/label"
import { Radio, RadioGroup } from "@/registry/base-nova/ui/radio"

const speeds = [
  { value: "standard", label: "Standard", eta: "Arrives Thursday" },
  { value: "express", label: "Express", eta: "Arrives tomorrow" },
  { value: "pickup", label: "Store pickup", eta: "Ready in 2 hours" },
]

export default function RadioControlled() {
  const [speed, setSpeed] = React.useState("standard")
  const chosen = speeds.find((s) => s.value === speed)

  return (
    <div className="flex flex-col gap-4">
      <RadioGroup value={speed} onValueChange={(value) => setSpeed(value as string)} aria-label="Delivery speed">
        {speeds.map((s) => (
          <Label key={s.value} className="gap-3 font-normal">
            <Radio value={s.value} />
            {s.label}
          </Label>
        ))}
      </RadioGroup>
      <p className="text-xs text-muted-foreground">{chosen?.eta}</p>
    </div>
  )
}
```

### Choice Cards

Use when each option needs a description or price beside it.

```tsx
import { Label } from "@/registry/base-nova/ui/label"
import { Radio, RadioGroup } from "@/registry/base-nova/ui/radio"

const seats = [
  { value: "window", label: "Window", hint: "32A · views of the coast" },
  { value: "aisle", label: "Aisle", hint: "32C · easy to stretch" },
]

export default function RadioChoiceCards() {
  return (
    <RadioGroup defaultValue="window" aria-label="Seat" className="w-full max-w-xs gap-2">
      {seats.map((seat) => (
        <div
          key={seat.value}
          className="rounded-xl bg-card shadow-raised transition-shadow duration-200 has-data-checked:ring-2 has-data-checked:ring-primary"
        >
          <Label className="w-full gap-3 p-3">
            <Radio value={seat.value} />
            <span className="flex flex-col gap-1">
              {seat.label}
              <span className="text-xs font-normal text-muted-foreground">{seat.hint}</span>
            </span>
          </Label>
        </div>
      ))}
    </RadioGroup>
  )
}
```

### Disabled

```tsx
import { Label } from "@/registry/base-nova/ui/label"
import { Radio, RadioGroup } from "@/registry/base-nova/ui/radio"

export default function RadioDisabled() {
  return (
    <RadioGroup defaultValue="card" disabled aria-label="Payment method">
      <Label className="gap-3 font-normal">
        <Radio value="card" />
        Card ending 4242
      </Label>
      <Label className="gap-3 font-normal">
        <Radio value="invoice" />
        Invoice
      </Label>
    </RadioGroup>
  )
}
```

### Sizes

```tsx
import { Label } from "@/registry/base-nova/ui/label"
import { Radio, RadioGroup } from "@/registry/base-nova/ui/radio"

export default function RadioSizes() {
  return (
    <div className="flex items-start gap-10">
      {(["sm", "default", "lg"] as const).map((size) => (
        <RadioGroup key={size} size={size} defaultValue="weekly" aria-label={`Digest (${size})`}>
          <Label>
            <Radio value="daily" />
            Daily
          </Label>
          <Label>
            <Radio value="weekly" />
            Weekly
          </Label>
        </RadioGroup>
      ))}
    </div>
  )
}
```

## Motion

A standalone `Radio` pops its dot in instead of gliding. With reduced motion the dot moves instantly.

## Keyboard

Tab moves into the group; arrow keys move and select.

## API Reference

Built on [the Radio Group primitive](https://base-ui.com/react/components/radio#api-reference). Only the props this library adds or changes are listed; everything else passes through.

### RadioGroup

Groups radios and shares the gliding dot between them. A vertical stack with a 12px gap. Also accepts every prop of [RadioGroup](https://base-ui.com/react/components/radio#radiogroup).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `size` | `"sm" \| "default" \| "lg"` | `"default"` | Size of every radio inside: 14 / 16 / 20px. |
| `value` | `Value` | — | Controlled selected value. |
| `defaultValue` | `Value` | — | Selected value on first render. |
| `onValueChange` | `(value: Value, details) => void` | — | Called when the selection changes. |
| `disabled` | `boolean` | `false` | Disable every radio. |

### Radio

An 18px round control in an inset well. Also accepts every prop of [Radio.Root](https://base-ui.com/react/components/radio#root).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `size` | `"sm" \| "default" \| "lg"` | — | Overrides the group size. Inside a sized `Field` it takes the field's size (`xs` maps to `sm`). |
| `value` (required) | `Value` | — | Identifies this option in the group. |
| `disabled` | `boolean` | `false` | Disable this radio. |

| Data attribute | Description |
| --- | --- |
| `data-size` | The resolved size. |
| `data-checked` | Present when selected. |
| `data-disabled` | Present when disabled. |
| `data-invalid` | Present when invalid inside a Field (destructive ring). |
