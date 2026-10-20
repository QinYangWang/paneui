# Popover

> Floating panel for extra content or actions near a trigger.

Page: https://paneui.dev/docs/popover/

## Installation

```bash
npx shadcn@latest add @paneui/popover
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/popover.json
```

Packages: `@base-ui/react`.

Registry items it builds on: `@paneui/theme`, `@paneui/icons`, `@paneui/locale-provider`.

## Usage

```tsx
import { Popover, PopoverContent, PopoverDescription, PopoverTitle, PopoverTrigger } from "@/components/ui/popover"
```

```tsx
<Popover>
  <PopoverTrigger render={<Button variant="secondary" />}>Details</PopoverTrigger>
  <PopoverContent>
    <PopoverTitle>All caught up</PopoverTitle>
    <PopoverDescription>No new approvals.</PopoverDescription>
  </PopoverContent>
</Popover>
```

## Composition

```text
Popover
├── PopoverTrigger
└── PopoverContent
    ├── PopoverCloseButton
    ├── PopoverHeader
    │   ├── PopoverTitle
    │   └── PopoverDescription
    └── PopoverFooter
        └── PopoverClose
```

## Examples

### Sides

```tsx
import { Button } from "@/registry/base-nova/ui/button"
import { Popover, PopoverContent, PopoverDescription, PopoverTrigger } from "@/registry/base-nova/ui/popover"

const sides = ["top", "right", "bottom", "left"] as const

export default function PopoverSides() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      {sides.map((side) => (
        <Popover key={side}>
          <PopoverTrigger render={<Button variant="secondary" size="sm" />}>{side}</PopoverTrigger>
          <PopoverContent side={side} className="w-56">
            <PopoverDescription>Opens on the {side}, and flips if there is no room.</PopoverDescription>
          </PopoverContent>
        </Popover>
      ))}
    </div>
  )
}
```

### Align

```tsx
import { Button } from "@/registry/base-nova/ui/button"
import { Popover, PopoverContent, PopoverDescription, PopoverTrigger } from "@/registry/base-nova/ui/popover"

const aligns = ["start", "center", "end"] as const

export default function PopoverAlign() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      {aligns.map((align) => (
        <Popover key={align}>
          <PopoverTrigger render={<Button variant="secondary" size="sm" />}>Align {align}</PopoverTrigger>
          <PopoverContent align={align} className="w-56">
            <PopoverDescription>Lined up with the trigger&apos;s {align} edge.</PopoverDescription>
          </PopoverContent>
        </Popover>
      ))}
    </div>
  )
}
```

### Controlled

Use when the popover should close after a form submits.

```tsx
"use client"

import * as React from "react"

import { Button } from "@/registry/base-nova/ui/button"
import { Input } from "@/registry/base-nova/ui/input"
import { Label } from "@/registry/base-nova/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/registry/base-nova/ui/popover"

export default function PopoverControlled() {
  const [open, setOpen] = React.useState(false)
  const [name, setName] = React.useState("Kyoto trip")
  const [draft, setDraft] = React.useState(name)

  return (
    <Popover
      open={open}
      onOpenChange={(next) => {
        if (next) setDraft(name)
        setOpen(next)
      }}
    >
      <PopoverTrigger render={<Button variant="secondary" />}>{name}</PopoverTrigger>
      <PopoverContent>
        <form
          className="flex flex-col gap-3"
          onSubmit={(event) => {
            event.preventDefault()
            setName(draft.trim() || name)
            setOpen(false)
          }}
        >
          <PopoverHeader>
            <PopoverTitle>Rename project</PopoverTitle>
          </PopoverHeader>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="popover-project-name">Name</Label>
            <Input id="popover-project-name" value={draft} onChange={(event) => setDraft(event.target.value)} />
          </div>
          <PopoverFooter>
            <Button type="button" variant="ghost" size="sm" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" size="sm">
              Rename
            </Button>
          </PopoverFooter>
        </form>
      </PopoverContent>
    </Popover>
  )
}
```

### Open on Hover

Use for previews that should appear on hover, like a hover card.

```tsx
import { Button } from "@/registry/base-nova/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/registry/base-nova/ui/popover"

export default function PopoverHover() {
  return (
    <p className="text-sm text-muted-foreground">
      Assigned to{" "}
      <Popover>
        <PopoverTrigger openOnHover delay={200} render={<Button variant="link" />}>
          Dana Reyes
        </PopoverTrigger>
        <PopoverContent side="top" className="w-64">
          <PopoverHeader>
            <PopoverTitle>Dana Reyes</PopoverTitle>
            <PopoverDescription>Product designer · Lisbon · usually replies within an hour.</PopoverDescription>
          </PopoverHeader>
        </PopoverContent>
      </Popover>
    </p>
  )
}
```

### RTL

```tsx
import { DirectionProvider } from "@base-ui/react/direction-provider"
import { Button } from "@/registry/base-nova/ui/button"
import { Input } from "@/registry/base-nova/ui/input"
import { Label } from "@/registry/base-nova/ui/label"
import {
  Popover,
  PopoverClose,
  PopoverCloseButton,
  PopoverContent,
  PopoverDescription,
  PopoverFooter,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/registry/base-nova/ui/popover"

export default function PopoverRtl() {
  return (
    <DirectionProvider direction="rtl">
      <div dir="rtl">
        <Popover>
          <PopoverTrigger render={<Button variant="secondary" />}>تحديد ميزانية</PopoverTrigger>
          <PopoverContent align="start">
            <PopoverCloseButton aria-label="إغلاق" />
            <PopoverHeader className="pe-8">
              <PopoverTitle>الحد الشهري</PopoverTitle>
              <PopoverDescription>نسألك قبل أي شراء يتجاوزه.</PopoverDescription>
            </PopoverHeader>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="budget-rtl">المبلغ (دولار)</Label>
              <Input id="budget-rtl" defaultValue="250" inputMode="decimal" />
            </div>
            <PopoverFooter>
              <PopoverClose render={<Button variant="ghost" size="sm" />}>إلغاء</PopoverClose>
              <PopoverClose render={<Button size="sm" />}>حفظ</PopoverClose>
            </PopoverFooter>
          </PopoverContent>
        </Popover>
      </div>
    </DirectionProvider>
  )
}
```

## Motion

The popup slides 4px toward its side and leaves faster than it arrives. With reduced motion it only fades.

## Keyboard

Enter or Space on the trigger opens it and moves focus inside; Esc closes it and returns focus.

## Related

[Popover Morph](https://paneui.dev/docs/popover-morph) grows the popover out of its trigger.

## API Reference

Built on [the Popover primitive](https://base-ui.com/react/components/popover#api-reference). Only the props this library adds or changes are listed; everything else passes through.

### Popover

Also accepts every prop of [Popover.Root](https://base-ui.com/react/components/popover#root).

### PopoverTrigger

Also accepts every prop of [Popover.Trigger](https://base-ui.com/react/components/popover#trigger).

### PopoverContent

The 288px-wide popup, already wrapped in a portal and positioner. Also accepts every prop of [Popover.Popup](https://base-ui.com/react/components/popover#popup).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `side` | `"top" \| "right" \| "bottom" \| "left" \| "inline-start" \| "inline-end"` | `"bottom"` | Edge of the trigger it opens on. |
| `sideOffset` | `number` | `8` | Gap to the trigger in px. |
| `align` | `"start" \| "center" \| "end"` | `"center"` | Alignment against the trigger. |
| `alignOffset` | `number` | `0` | Shift along the alignment axis in px. |
| `collisionPadding` | `number \| Rect` | `8` | Space kept from the viewport edges. |

| Data attribute | Description |
| --- | --- |
| `data-side` | The side it actually opened on. |
| `data-starting-style / data-ending-style` | Set during the enter and exit transitions. |

### PopoverHeader

Stacks title and description with a 4px gap. Also accepts every prop of `div`.

### PopoverTitle

Also accepts every prop of [Popover.Title](https://base-ui.com/react/components/popover#title).

### PopoverDescription

Also accepts every prop of [Popover.Description](https://base-ui.com/react/components/popover#description).

### PopoverFooter

Right-aligned row for actions. Also accepts every prop of `div`.

### PopoverClose

Unstyled close part. Pass `render={<Button />}` to make any button close the popover. Also accepts every prop of [Popover.Close](https://base-ui.com/react/components/popover#close).

### PopoverCloseButton

Round × button pinned to the top-right corner, labelled "Close". Also accepts every prop of [Popover.Close](https://base-ui.com/react/components/popover#close).
