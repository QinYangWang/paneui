# Stepper

> Adjusts a number up or down in fixed steps.

Page: https://paneui.dev/docs/stepper/

## Installation

```bash
npx shadcn@latest add @paneui/stepper
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/stepper.json
```

Packages: `@base-ui/react`, `motion`.

Registry items it builds on: `@paneui/theme`, `@paneui/icons`, `@paneui/locale-provider`.

## Usage

```tsx
import { Stepper } from "@/components/ui/stepper"
```

```tsx
<Stepper aria-label="Guests" defaultValue={2} min={1} max={8} />
```

## Examples

### Sizes

```tsx
import { Stepper } from "@/registry/base-nova/ui/stepper"

export default function StepperSizes() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <Stepper aria-label="Quantity" size="sm" defaultValue={1} min={0} />
      <Stepper aria-label="Quantity" defaultValue={1} min={0} />
    </div>
  )
}
```

### With Unit

```tsx
import { Stepper } from "@/registry/base-nova/ui/stepper"

export default function StepperWithUnit() {
  return (
    <div className="flex flex-col gap-3">
      <Stepper aria-label="Nights" unit="nights" defaultValue={3} min={1} max={30} />
      <Stepper aria-label="Rooms" unit="rooms" size="sm" defaultValue={1} min={1} max={4} />
    </div>
  )
}
```

### Controlled

```tsx
"use client"

import * as React from "react"

import { Stepper } from "@/registry/base-nova/ui/stepper"

const PRICE = 18

export default function StepperControlled() {
  const [tickets, setTickets] = React.useState<number | null>(2)
  const total = (tickets ?? 0) * PRICE

  return (
    <div className="flex w-full max-w-xs items-center justify-between gap-6">
      <div className="flex flex-col gap-1">
        <span className="text-sm font-medium">Tickets</span>
        <span className="text-xs text-muted-foreground tabular-nums">Total ${total}</span>
      </div>
      <Stepper aria-label="Tickets" value={tickets} onValueChange={setTickets} min={1} max={6} />
    </div>
  )
}
```

### Decimals

```tsx
import { Stepper } from "@/registry/base-nova/ui/stepper"

export default function StepperDecimals() {
  return (
    <div className="flex w-full max-w-xs items-center justify-between gap-6">
      <span className="text-sm font-medium">Playback speed</span>
      <Stepper
        aria-label="Playback speed"
        defaultValue={1}
        min={0.5}
        max={2}
        step={0.25}
        unit="×"
        format={{ minimumFractionDigits: 2, maximumFractionDigits: 2 }}
      />
    </div>
  )
}
```

### Localized

```tsx
import { Stepper } from "@/registry/base-nova/ui/stepper"

export default function StepperLocalized() {
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium">Nächte</span>
      <Stepper
        aria-label="Nächte"
        decrementLabel="Weniger"
        incrementLabel="Mehr"
        locale="de-DE"
        defaultValue={3}
        min={1}
        max={14}
      />
    </div>
  )
}
```

### Disabled

```tsx
import { Stepper } from "@/registry/base-nova/ui/stepper"

export default function StepperDisabled() {
  return <Stepper aria-label="Seats" defaultValue={4} disabled />
}
```

## Motion

With reduced motion the rolling digits cross-fade instead.

## Keyboard

Click the number to type a value. Arrow Up and Arrow Down step it. The − and + buttons switch off at `min` and `max`.

## API Reference

Built on [the Number Field primitive](https://base-ui.com/react/components/number-field#api-reference). Only the props this library adds or changes are listed; everything else passes through.

### Stepper

Number field with − and + step buttons. Also accepts every prop of [NumberField.Root](https://base-ui.com/react/components/number-field#root).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `aria-label` | `string` | — | Accessible name, applied to the value input (not the root). |
| `decrementLabel` | `string` | `"Decrease"` | Accessible name of the − button; translate it with the rest of your UI. |
| `incrementLabel` | `string` | `"Increase"` | Accessible name of the + button. |
| `unit` | `ReactNode` | — | Text after the number, e.g. "guests". Visual only. |
| `size` | `"sm" \| "default"` | `"default"` | Control height (32 / 40px). |
| `value` | `number \| null` | — | Controlled value. |
| `defaultValue` | `number` | — | Value on first render. |
| `onValueChange` | `(value: number \| null, details) => void` | — | Called when the value changes. |
| `format` | `Intl.NumberFormatOptions` | — | Formats both the input and the rolling display, e.g. currency. |
| `locale` | `Intl.LocalesArgument` | — | Locale used by `format`. |

| Data attribute | Description |
| --- | --- |
| `data-disabled` | Present on the group when disabled. |
