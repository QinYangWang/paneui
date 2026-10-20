# Action Swap Roll

> Rolls between button states.

Page: https://paneui.dev/docs/action-swap-roll/

## Installation

```bash
npx shadcn@latest add @paneui/action-swap-roll
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/action-swap-roll.json
```

Packages: `motion`.

Registry items it builds on: `@paneui/theme`, `@paneui/action-swap-blur`.

## Usage

```tsx
import { ActionSwapRollButton } from "@/components/ui/action-swap-roll"
```

```tsx
<ActionSwapRollButton
  items={[
    { value: "follow", label: "Follow" },
    { value: "following", label: "Following" },
  ]}
/>
```

## Examples

### Copy With Reset

```tsx
"use client"

import { CheckIcon, CopyIcon } from "@/components/icons"
import { ActionSwapRollButton } from "@/registry/base-nova/ui/action-swap-roll"

export default function ActionSwapRollCopyReset() {
  return (
    <ActionSwapRollButton
      variant="secondary"
      resetAfter={1600}
      onClick={() => navigator.clipboard?.writeText("HARK-2026-OCT").catch(() => {})}
      items={[
        { value: "copy", label: "Copy promo code", icon: <CopyIcon /> },
        { value: "copied", label: "Code copied", icon: <CheckIcon /> },
      ]}
    />
  )
}
```

### Sizes

```tsx
"use client"

import { BookmarkIcon, CheckIcon } from "@/components/icons"
import { ActionSwapRollButton } from "@/registry/base-nova/ui/action-swap-roll"

const ITEMS = [
  { value: "save", label: "Save", icon: <BookmarkIcon /> },
  { value: "saved", label: "Saved", icon: <CheckIcon /> },
]

export default function ActionSwapRollSizes() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <ActionSwapRollButton variant="secondary" size="xs" items={ITEMS} />
      <ActionSwapRollButton variant="secondary" size="sm" items={ITEMS} />
      <ActionSwapRollButton variant="secondary" items={ITEMS} />
      <ActionSwapRollButton variant="secondary" size="lg" items={ITEMS} />
    </div>
  )
}
```

### Controlled

```tsx
"use client"

import * as React from "react"

import { CheckIcon, LoaderIcon, SendIcon } from "@/components/icons"
import { ActionSwapRollButton } from "@/registry/base-nova/ui/action-swap-roll"

export default function ActionSwapRollControlled() {
  const [status, setStatus] = React.useState("draft")
  const timers = React.useRef<number[]>([])
  React.useEffect(() => () => timers.current.forEach(clearTimeout), [])
  return (
    <ActionSwapRollButton
      cycle={false}
      value={status}
      disabled={status === "sending"}
      onClick={() => {
        if (status !== "draft") return
        setStatus("sending")
        timers.current.push(
          window.setTimeout(() => setStatus("sent"), 1400),
          window.setTimeout(() => setStatus("draft"), 3000)
        )
      }}
      items={[
        { value: "draft", label: "Send reply", icon: <SendIcon className="rtl:-scale-x-100" /> },
        { value: "sending", label: "Sending", icon: <LoaderIcon className="animate-spin motion-reduce:animate-none" /> },
        { value: "sent", label: "Reply sent", icon: <CheckIcon /> },
      ]}
    />
  )
}
```

### Custom Slots

Use the slots when you need your own button layout or slot order.

```tsx
"use client"

import * as React from "react"

import { ArrowDownIcon, ArrowUpIcon } from "@/components/icons"
import { Button } from "@/registry/base-nova/ui/button"
import { ActionSwapRollIcon, ActionSwapRollText } from "@/registry/base-nova/ui/action-swap-roll"

export default function ActionSwapRollCustomSlots() {
  const [asc, setAsc] = React.useState(true)
  const value = asc ? "asc" : "desc"
  return (
    <Button variant="ghost" onClick={() => setAsc((v) => !v)}>
      <ActionSwapRollText value={value}>{asc ? "Oldest first" : "Newest first"}</ActionSwapRollText>
      <ActionSwapRollIcon value={value}>{asc ? <ArrowUpIcon data-icon="inline-end" /> : <ArrowDownIcon data-icon="inline-end" />}</ActionSwapRollIcon>
    </Button>
  )
}
```

## Motion

The roll springs at 460 / 32 / 0.55 and exits take 150ms. With reduced motion they cross-fade and the width snaps.

## Related

[Action Swap Blur](https://paneui.dev/docs/action-swap-blur) has the same API with a blur and holds the shared engine.

## API Reference

### ActionSwapRollButton

A `Button` that advances through `items` on click, rolling its icon and label. Also accepts every prop of [Button](/docs/button).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `items` (required) | `ActionSwapItem[]` | — | States in order, each `{ value: string; label: ReactNode; icon?: ReactNode; ariaLabel?: string }`. |
| `value` | `string` | — | Controlled current item value. |
| `defaultValue` | `string` | — | Initial item value. Defaults to the first item. |
| `onValueChange` | `(value: string, item: ActionSwapItem) => void` | — | Called when the current item changes, including on reset. |
| `iconOnly` | `boolean` | true for `icon*` sizes | Hide the label and swap only the icon slot. |
| `cycle` | `boolean` | `true` | Advance to the next item on click. |
| `resetAfter` | `number` | — | Milliseconds after which the button returns to its first item. |

### ActionSwapRollText

Label slot that rolls to new content when `value` changes. Also accepts every prop of `span`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` (required) | `string` | — | Identity of the current label. |
| `children` (required) | `ReactNode` | — | The label. |
| `className` | `string` | — | Classes for the slot. |

### ActionSwapRollIcon

16px icon slot that rolls to the new glyph. Also accepts every prop of `span`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` (required) | `string` | — | Identity of the current icon. |
| `children` (required) | `ReactNode` | — | The icon. |
| `className` | `string` | — | Classes for the slot. |
