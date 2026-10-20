# Checkbox

> Toggles a single option on or off.

Page: https://paneui.dev/docs/checkbox/

## Installation

```bash
npx shadcn@latest add @paneui/checkbox
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/checkbox.json
```

Packages: `@base-ui/react`, `class-variance-authority`.

Registry items it builds on: `@paneui/theme`, `@paneui/control-size`.

## Usage

```tsx
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
```

```tsx
<Label>
  <Checkbox defaultChecked />
  Remember me
</Label>
```

## Examples

### With Description

```tsx
import { Checkbox } from "@/registry/base-nova/ui/checkbox"
import { Label } from "@/registry/base-nova/ui/label"

export default function CheckboxWithDescription() {
  return (
    <Label className="max-w-xs items-start gap-3">
      <Checkbox defaultChecked />
      <span className="flex flex-col gap-1.5">
        Auto-approve small purchases
        <span className="text-xs leading-relaxed font-normal text-muted-foreground">
          Orders under $50 go through without asking. You still get a receipt.
        </span>
      </span>
    </Label>
  )
}
```

### Controlled

```tsx
"use client"

import * as React from "react"

import { Button } from "@/registry/base-nova/ui/button"
import { Checkbox } from "@/registry/base-nova/ui/checkbox"
import { Label } from "@/registry/base-nova/ui/label"

export default function CheckboxControlled() {
  const [accepted, setAccepted] = React.useState(false)

  return (
    <div className="flex max-w-xs flex-col items-start gap-4">
      <Label className="gap-3">
        <Checkbox checked={accepted} onCheckedChange={setAccepted} />
        I agree to the terms of service
      </Label>
      <Button size="sm" disabled={!accepted}>
        Create account
      </Button>
    </div>
  )
}
```

### Disabled

```tsx
import { Checkbox } from "@/registry/base-nova/ui/checkbox"
import { Label } from "@/registry/base-nova/ui/label"

export default function CheckboxDisabled() {
  return (
    <div className="flex flex-col gap-3">
      <Label className="gap-3 font-normal">
        <Checkbox disabled />
        Unchecked
      </Label>
      <Label className="gap-3 font-normal">
        <Checkbox disabled defaultChecked />
        Checked
      </Label>
      <Label className="gap-3 font-normal">
        <Checkbox disabled indeterminate />
        Indeterminate
      </Label>
    </div>
  )
}
```

### Task List

```tsx
"use client"

import * as React from "react"

import { Checkbox } from "@/registry/base-nova/ui/checkbox"
import { Label } from "@/registry/base-nova/ui/label"

const initial = [
  { id: "passport", label: "Renew passport", done: true },
  { id: "insurance", label: "Buy travel insurance", done: false },
  { id: "esim", label: "Set up an eSIM for Japan", done: false },
]

export default function CheckboxTaskList() {
  const [tasks, setTasks] = React.useState(initial)
  const left = tasks.filter((task) => !task.done).length

  return (
    <div className="flex w-full max-w-xs flex-col gap-3">
      <p className="text-xs text-muted-foreground tabular-nums">{left} left before the trip</p>
      {tasks.map((task) => (
        <Label key={task.id} className="gap-3 font-normal">
          <Checkbox
            checked={task.done}
            onCheckedChange={(checked) =>
              setTasks((prev) => prev.map((t) => (t.id === task.id ? { ...t, done: checked } : t)))
            }
          />
          <span className={task.done ? "text-muted-foreground line-through" : undefined}>{task.label}</span>
        </Label>
      ))}
    </div>
  )
}
```

### Sizes

```tsx
import { Checkbox } from "@/registry/base-nova/ui/checkbox"
import { Label } from "@/registry/base-nova/ui/label"

export default function CheckboxSizes() {
  return (
    <div className="flex items-center gap-6">
      {(["sm", "default", "lg"] as const).map((size) => (
        <Label key={size}>
          <Checkbox size={size} defaultChecked />
          {size === "sm" ? "Small" : size === "lg" ? "Large" : "Default"}
        </Label>
      ))}
    </div>
  )
}
```

## Motion

Presses squish to 86% on an overshoot curve. With reduced motion the transitions and the squish are off.

## Keyboard

Tab to focus and Space to toggle.

## API Reference

Built on [the Checkbox primitive](https://base-ui.com/react/components/checkbox#api-reference). Only the props this library adds or changes are listed; everything else passes through.

### Checkbox

An 18px box in an inset well. It adds no props of its own. Also accepts every prop of [Checkbox.Root](https://base-ui.com/react/components/checkbox#root).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `size` | `"sm" \| "default" \| "lg"` | `"default"` | Box 14 / 16 / 20px. Inside a sized `Field` it takes the field's size (`xs` maps to `sm`). |
| `checked` | `boolean` | — | Controlled checked state. |
| `defaultChecked` | `boolean` | `false` | Checked state on first render. |
| `onCheckedChange` | `(checked: boolean, details) => void` | — | Called when the box is toggled. |
| `indeterminate` | `boolean` | `false` | Shows a dash instead of the check, e.g. for a partly selected parent. |
| `disabled` | `boolean` | `false` | Dims the box and blocks interaction. |

| Data attribute | Description |
| --- | --- |
| `data-size` | The resolved size. |
| `data-checked` | Present when checked (primary fill). |
| `data-indeterminate` | Present when indeterminate. |
| `data-disabled` | Present when disabled. |
| `data-invalid` | Present when invalid inside a Field (destructive ring). |
