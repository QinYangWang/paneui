# Popover Morph

> Popover that grows out of its trigger and folds back.

Page: https://paneui.dev/docs/popover-morph/

## Installation

```bash
npx shadcn@latest add @paneui/popover-morph
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/popover-morph.json
```

Packages: `@base-ui/react`.

Registry items it builds on: `@paneui/theme`, `@paneui/icons`.

## Usage

```tsx
import { MorphPopover, MorphPopoverContent, MorphPopoverTitle, MorphPopoverTrigger } from "@/components/ui/popover-morph"
```

```tsx
<MorphPopover>
  <MorphPopoverTrigger>Alerts</MorphPopoverTrigger>
  <MorphPopoverContent>
    <MorphPopoverTitle>Deploy alerts</MorphPopoverTitle>
  </MorphPopoverContent>
</MorphPopover>
```

## Composition

```text
MorphPopover
├── MorphPopoverTrigger
└── MorphPopoverContent
    ├── MorphPopoverCloseButton
    ├── MorphPopoverHeader
    │   ├── MorphPopoverTitle
    │   └── MorphPopoverDescription
    └── MorphPopoverFooter
        └── MorphPopoverClose
```

## Examples

### Placement

```tsx
import { InfoIcon } from "@/components/icons"
import {
  MorphPopover,
  MorphPopoverContent,
  MorphPopoverDescription,
  MorphPopoverHeader,
  MorphPopoverTitle,
  MorphPopoverTrigger,
} from "@/registry/base-nova/ui/popover-morph"

const placements = [
  { label: "Bottom start", side: "bottom", align: "start" },
  { label: "Bottom end", side: "bottom", align: "end" },
  { label: "Top center", side: "top", align: "center" },
] as const

export default function PopoverMorphPlacement() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      {placements.map((p) => (
        <MorphPopover key={p.label}>
          <MorphPopoverTrigger>
            <InfoIcon />
            {p.label}
          </MorphPopoverTrigger>
          <MorphPopoverContent side={p.side} align={p.align}>
            <MorphPopoverHeader>
              <MorphPopoverTitle>Grows from the trigger</MorphPopoverTitle>
              <MorphPopoverDescription>
                The panel stays pinned to the trigger&apos;s {p.align} edge and opens toward the {p.side}.
              </MorphPopoverDescription>
            </MorphPopoverHeader>
          </MorphPopoverContent>
        </MorphPopover>
      ))}
    </div>
  )
}
```

### Controlled Form

Use when the panel should close after a submit.

```tsx
"use client"

import * as React from "react"

import { MailIcon } from "@/components/icons"
import { Button } from "@/registry/base-nova/ui/button"
import { Input } from "@/registry/base-nova/ui/input"
import { Label } from "@/registry/base-nova/ui/label"
import {
  MorphPopover,
  MorphPopoverCloseButton,
  MorphPopoverContent,
  MorphPopoverDescription,
  MorphPopoverFooter,
  MorphPopoverHeader,
  MorphPopoverTitle,
  MorphPopoverTrigger,
} from "@/registry/base-nova/ui/popover-morph"

export default function PopoverMorphForm() {
  const [open, setOpen] = React.useState(false)
  const [sent, setSent] = React.useState<string | null>(null)

  return (
    <div className="flex flex-col items-center gap-3">
      <MorphPopover open={open} onOpenChange={setOpen}>
        <MorphPopoverTrigger>
          <MailIcon />
          Invite
        </MorphPopoverTrigger>
        <MorphPopoverContent>
          <MorphPopoverCloseButton />
          <MorphPopoverHeader>
            <MorphPopoverTitle>Invite a teammate</MorphPopoverTitle>
            <MorphPopoverDescription>They get edit access to this project.</MorphPopoverDescription>
          </MorphPopoverHeader>
          <form
            id="invite-form"
            className="flex flex-col gap-2"
            onSubmit={(event) => {
              event.preventDefault()
              const email = new FormData(event.currentTarget).get("email")
              setSent(String(email))
              setOpen(false)
            }}
          >
            <Label htmlFor="invite-email">Email</Label>
            <Input id="invite-email" name="email" type="email" required placeholder="mei@example.com" />
          </form>
          <MorphPopoverFooter>
            <Button type="submit" form="invite-form" size="sm">
              Send invite
            </Button>
          </MorphPopoverFooter>
        </MorphPopoverContent>
      </MorphPopover>
      <p className="text-xs text-muted-foreground">{sent ? `Invite sent to ${sent}.` : "No invites sent yet."}</p>
    </div>
  )
}
```

## Motion

The surface grows from a copy of the trigger across the 8px gap over 450ms, and the content settles in 150ms later. Closing folds it back in 300ms. With reduced motion it only cross-fades, in 150ms.

## Keyboard

Enter or Space opens it, focus moves into the panel, Escape or an outside press closes it and returns focus to the trigger.

## Related

See also [Select Morph](https://paneui.dev/docs/select-morph), [Morphing Modal](https://paneui.dev/docs/morphing-modal), [Morphing Search](https://paneui.dev/docs/morphing-search) and [Morphing Tabs](https://paneui.dev/docs/morphing-tabs).

## API Reference

Built on [the Popover primitive](https://base-ui.com/react/components/popover#api-reference). Only the props this library adds or changes are listed; everything else passes through.

### MorphPopover

`Popover.Root`, re-exported unchanged. Also accepts every prop of [Popover.Root](https://base-ui.com/react/components/popover#root).

### MorphPopoverTrigger

A raised trigger (32px, `rounded-lg`). Also accepts every prop of [Popover.Trigger](https://base-ui.com/react/components/popover#trigger).

### MorphPopoverContent

Portal, positioner and popup, anchored to the trigger like Popover (8px side offset) with the standard popover surface (`rounded-2xl`, `bg-popover`, `shadow-surface`). A 288px panel by default. Also accepts every prop of [Popover.Popup](https://base-ui.com/react/components/popover#popup).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `side` | `"top" \| "bottom"` | `"bottom"` | Which side of the trigger the panel opens on (and grows towards). |
| `sideOffset` | `number` | `8` | Gap between trigger and panel in px, as in Popover. |
| `collisionPadding` | `number` | `8` | Viewport margin kept when the panel flips or shifts. |
| `align` | `"start" \| "center" \| "end"` | `"center"` | Which trigger edge the panel lines up with, as in Popover. |
| `triggerRadius` | `string` | `"var(--radius-lg)"` | Corner radius (CSS length) of the trigger shape the panel starts from. The default matches `MorphPopoverTrigger`'s `rounded-lg`; change it only if you reshape the trigger. |

| Data attribute | Description |
| --- | --- |
| `data-side / data-align` | The resolved placement (on the positioner and popup), used to work out where the morph starts. |
| `data-starting-style / data-ending-style` | Present while the panel opens or closes. |

### MorphPopoverHeader

Title and description stack; leaves room on the right for the close button. Also accepts every prop of `div`.

### MorphPopoverTitle

Also accepts every prop of [Popover.Title](https://base-ui.com/react/components/popover#title).

### MorphPopoverDescription

Also accepts every prop of [Popover.Description](https://base-ui.com/react/components/popover#description).

### MorphPopoverFooter

Right-aligned row of actions. Also accepts every prop of `div`.

### MorphPopoverClose

Unstyled close part; pass `render` to turn any element (e.g. a `Button`) into a close control. Also accepts every prop of [Popover.Close](https://base-ui.com/react/components/popover#close).

### MorphPopoverCloseButton

Round × button pinned to the panel's top-right corner, labelled `Close`. Also accepts every prop of [Popover.Close](https://base-ui.com/react/components/popover#close).
