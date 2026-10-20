# Switch

> Turns a single setting on or off.

Page: https://paneui.dev/docs/switch/

## Installation

```bash
npx shadcn@latest add @paneui/switch
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/switch.json
```

Packages: `@base-ui/react`, `class-variance-authority`.

Registry items it builds on: `@paneui/theme`, `@paneui/control-size`.

## Usage

```tsx
import { Switch } from "@/components/ui/switch"
```

```tsx
<Switch defaultChecked />
```

## Examples

### Controlled

```tsx
"use client"

import * as React from "react"

import { Label } from "@/registry/base-nova/ui/label"
import { Switch } from "@/registry/base-nova/ui/switch"

export default function SwitchControlled() {
  const [enabled, setEnabled] = React.useState(false)
  return (
    <div className="flex flex-col items-start gap-2">
      <Label className="gap-3">
        <Switch checked={enabled} onCheckedChange={setEnabled} />
        Vacation mode
      </Label>
      <p className="text-sm text-muted-foreground">
        {enabled ? "Replies are paused until you switch this off." : "Your agent answers new messages as usual."}
      </p>
    </div>
  )
}
```

### With Description

```tsx
import { Label } from "@/registry/base-nova/ui/label"
import { Switch } from "@/registry/base-nova/ui/switch"

const settings = [
  { id: "receipts", title: "Email receipts", description: "Send a copy of every order confirmation to your inbox.", on: true },
  { id: "weekly", title: "Weekly summary", description: "A Monday recap of spending and upcoming renewals.", on: false },
  { id: "alerts", title: "Price alerts", description: "Notify me when a saved item drops by 10% or more.", on: true },
]

export default function SwitchWithDescription() {
  return (
    <div className="flex w-full max-w-md flex-col gap-5">
      {settings.map((s) => (
        <div key={s.id} className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1">
            <Label htmlFor={s.id}>{s.title}</Label>
            <p className="text-sm text-pretty text-muted-foreground">{s.description}</p>
          </div>
          <Switch id={s.id} defaultChecked={s.on} />
        </div>
      ))}
    </div>
  )
}
```

### Disabled

```tsx
import { Label } from "@/registry/base-nova/ui/label"
import { Switch } from "@/registry/base-nova/ui/switch"

export default function SwitchDisabled() {
  return (
    <div className="flex flex-col gap-3">
      <Label className="gap-3">
        <Switch disabled defaultChecked />
        Two-factor sign-in (required by your admin)
      </Label>
      <Label className="gap-3">
        <Switch disabled />
        Beta features (not available on this plan)
      </Label>
    </div>
  )
}
```

### Read Only

```tsx
import { Label } from "@/registry/base-nova/ui/label"
import { Switch } from "@/registry/base-nova/ui/switch"

export default function SwitchReadOnly() {
  return (
    <Label className="gap-3">
      <Switch readOnly defaultChecked />
      Backups are on for every workspace
    </Label>
  )
}
```

### Sizes

```tsx
import { Label } from "@/registry/base-nova/ui/label"
import { Switch } from "@/registry/base-nova/ui/switch"

export default function SwitchSizes() {
  return (
    <div className="flex items-center gap-6">
      {(["sm", "default", "lg"] as const).map((size) => (
        <Label key={size}>
          <Switch size={size} defaultChecked />
          {size === "sm" ? "Small" : size === "lg" ? "Large" : "Default"}
        </Label>
      ))}
    </div>
  )
}
```

### RTL

```tsx
import { DirectionProvider } from "@base-ui/react/direction-provider"
import { Label } from "@/registry/base-nova/ui/label"
import { Switch } from "@/registry/base-nova/ui/switch"

export default function SwitchRtl() {
  return (
    <DirectionProvider direction="rtl">
      <div dir="rtl" className="flex flex-col gap-3">
        <Label className="gap-3">
          <Switch defaultChecked />
          الموافقة التلقائية تحت ٥٠ دولارًا
        </Label>
        <Label className="gap-3">
          <Switch />
          ملخص يومي
        </Label>
      </div>
    </DirectionProvider>
  )
}
```

## Motion

The thumb slides over 300ms with an overshoot curve and the track colour fades over 200ms.

## Keyboard

`Space` and `Enter` toggle the focused switch. It renders `role="switch"` with a hidden checkbox, so it works inside forms with `name`.

## API Reference

Built on [the Switch primitive](https://base-ui.com/react/components/switch#api-reference). Only the props this library adds or changes are listed; everything else passes through.

### Switch

Track and thumb in one part. Also accepts every prop of [Switch.Root](https://base-ui.com/react/components/switch#root).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `size` | `"sm" \| "default" \| "lg"` | `"default"` | Track 26×16 / 32×20 / 40×24px. Inside a sized `Field` it takes the field's size (`xs` maps to `sm`). |
| `checked` | `boolean` | — | Controlled state. |
| `defaultChecked` | `boolean` | `false` | Initial state when uncontrolled. |
| `onCheckedChange` | `(checked: boolean, eventDetails) => void` | — | Called when the switch is toggled. |
| `disabled` | `boolean` | `false` | Dims the switch and blocks interaction. |
| `readOnly` | `boolean` | `false` | Focusable but can't be toggled. |
| `name` | `string` | — | Submits the value with a form. |

| Data attribute | Description |
| --- | --- |
| `data-size` | The resolved size. |
| `data-checked` | Present when on. |
| `data-unchecked` | Present when off. |
| `data-disabled` | Present when disabled. |
