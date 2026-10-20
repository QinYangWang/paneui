# Collapsible

> Shows and hides a section of content.

Page: https://paneui.dev/docs/collapsible/

## Installation

```bash
npx shadcn@latest add @paneui/collapsible
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/collapsible.json
```

Packages: `@base-ui/react`.

Registry items it builds on: `@paneui/theme`, `@paneui/icons`.

## Usage

```tsx
import { Collapsible, CollapsiblePanel, CollapsibleTrigger } from "@/components/ui/collapsible"
```

```tsx
<Collapsible>
  <CollapsibleTrigger>Advanced settings</CollapsibleTrigger>
  <CollapsiblePanel>Retry failed tasks automatically.</CollapsiblePanel>
</Collapsible>
```

## Composition

```text
Collapsible
├── CollapsibleTrigger
└── CollapsiblePanel
```

## Examples

### Default Open

```tsx
import { Collapsible, CollapsiblePanel, CollapsibleTrigger } from "@/registry/base-nova/ui/collapsible"

export default function CollapsibleDefaultOpen() {
  return (
    <Collapsible defaultOpen className="w-full max-w-sm">
      <CollapsibleTrigger className="w-full">Shipping details</CollapsibleTrigger>
      <CollapsiblePanel>
        <dl className="grid grid-cols-2 gap-2 px-3 pt-2 text-sm">
          <dt className="text-muted-foreground">Carrier</dt>
          <dd>SF Express</dd>
          <dt className="text-muted-foreground">Tracking</dt>
          <dd className="font-mono text-xs">SF1402387765</dd>
          <dt className="text-muted-foreground">Arrives</dt>
          <dd>Thursday, Oct 16</dd>
        </dl>
      </CollapsiblePanel>
    </Collapsible>
  )
}
```

### Show More

```tsx
"use client"

import * as React from "react"

import { Collapsible, CollapsiblePanel, CollapsibleTrigger } from "@/registry/base-nova/ui/collapsible"

const visible = ["Renew passport", "Book airport taxi"]
const more = ["Exchange yen", "Download offline maps", "Pack chargers"]

export default function CollapsibleShowMore() {
  const [open, setOpen] = React.useState(false)

  return (
    <Collapsible open={open} onOpenChange={setOpen} className="w-full max-w-xs">
      <ul className="flex flex-col gap-2 px-3 text-sm">
        {visible.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <CollapsiblePanel>
        <ul className="flex flex-col gap-2 px-3 pt-2 text-sm">
          {more.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </CollapsiblePanel>
      <CollapsibleTrigger chevron={false} className="mt-2 self-start">
        {open ? "Show less" : `Show ${more.length} more`}
      </CollapsibleTrigger>
    </Collapsible>
  )
}
```

### Controlled

```tsx
"use client"

import * as React from "react"

import { Button } from "@/registry/base-nova/ui/button"
import { Collapsible, CollapsiblePanel, CollapsibleTrigger } from "@/registry/base-nova/ui/collapsible"

export default function CollapsibleControlled() {
  const [open, setOpen] = React.useState(false)

  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <Button variant="secondary" size="sm" className="self-start" onClick={() => setOpen((o) => !o)}>
        {open ? "Hide" : "Show"} logs from outside
      </Button>
      <Collapsible open={open} onOpenChange={setOpen}>
        <CollapsibleTrigger className="w-full">Last run · 3 steps</CollapsibleTrigger>
        <CollapsiblePanel>
          <ol className="flex flex-col gap-1 px-3 pt-2 font-mono text-xs text-muted-foreground">
            <li>09:00:02 fetched 14 new emails</li>
            <li>09:00:05 drafted 2 replies</li>
            <li>09:00:06 waiting for your approval</li>
          </ol>
        </CollapsiblePanel>
      </Collapsible>
    </div>
  )
}
```

### Disabled

```tsx
import { Collapsible, CollapsiblePanel, CollapsibleTrigger } from "@/registry/base-nova/ui/collapsible"

export default function CollapsibleDisabled() {
  return (
    <Collapsible disabled className="w-full max-w-sm">
      <CollapsibleTrigger className="w-full">Developer options (admins only)</CollapsibleTrigger>
      <CollapsiblePanel>
        <p className="px-3 pt-2 text-sm text-muted-foreground">API keys and webhooks.</p>
      </CollapsiblePanel>
    </Collapsible>
  )
}
```

## Motion

The panel height eases open while the content fades in, slides down 4px and un-blurs; the chevron turns 180°. With reduced motion the panel opens instantly.

## API Reference

Built on [the Collapsible primitive](https://base-ui.com/react/components/collapsible#api-reference). Only the props this library adds or changes are listed; everything else passes through.

### Collapsible

Unstyled vertical stack; bring your own surface. Also accepts every prop of [Collapsible.Root](https://base-ui.com/react/components/collapsible#root).

### CollapsibleTrigger

A 36px row that tints while open. Also accepts every prop of [Collapsible.Trigger](https://base-ui.com/react/components/collapsible#trigger).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `chevron` | `boolean` | `true` | Show the trailing chevron that rotates when open. |

| Data attribute | Description |
| --- | --- |
| `data-panel-open` | Present while the panel is open. |

### CollapsiblePanel

Animates its height; the children sit in an inner wrapper that fades and slides. Also accepts every prop of [Collapsible.Panel](https://base-ui.com/react/components/collapsible#panel).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `typeset` | `boolean \| "docs" \| "reading" \| "chat"` | `false` | Turn prose styles back on for the panel content inside a `typeset` container, or name a preset when it stands alone. |

| Data attribute | Description |
| --- | --- |
| `data-starting-style / data-ending-style` | Set during the open and close transitions. |
