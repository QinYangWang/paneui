# Action Swap Blur

> Blurs between button states.

Page: https://paneui.dev/docs/action-swap-blur/

## Installation

```bash
npx shadcn@latest add @paneui/action-swap-blur
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/action-swap-blur.json
```

Packages: `motion`.

Registry items it builds on: `@paneui/theme`, `@paneui/button`, `@paneui/text-cascade`.

## Usage

```tsx
import { ActionSwapBlurButton } from "@/components/ui/action-swap-blur"
```

```tsx
<ActionSwapBlurButton
  resetAfter={1600}
  items={[
    { value: "copy", label: "Copy", icon: <CopyIcon /> },
    { value: "copied", label: "Copied", icon: <CheckIcon /> },
  ]}
/>
```

## Examples

### Cycle

Use when one button steps through several states in turn.

```tsx
"use client"

import { CloudIcon, MoonIcon, SunIcon } from "@/components/icons"
import { ActionSwapBlurButton } from "@/registry/base-nova/ui/action-swap-blur"

export default function ActionSwapBlurCycle() {
  return (
    <ActionSwapBlurButton
      variant="secondary"
      items={[
        { value: "light", label: "Light", icon: <SunIcon /> },
        { value: "dark", label: "Dark", icon: <MoonIcon /> },
        { value: "system", label: "Match system", icon: <CloudIcon /> },
      ]}
    />
  )
}
```

### Text Only

Use when the states need words but no icon.

```tsx
"use client"

import { ActionSwapBlurButton } from "@/registry/base-nova/ui/action-swap-blur"

export default function ActionSwapBlurTextOnly() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <ActionSwapBlurButton
        items={[
          { value: "subscribe", label: "Subscribe" },
          { value: "subscribed", label: "Subscribed" },
        ]}
      />
      <ActionSwapBlurButton
        variant="outline"
        size="sm"
        items={[
          { value: "monthly", label: "Billed monthly" },
          { value: "yearly", label: "Billed yearly · save 20%" },
        ]}
      />
    </div>
  )
}
```

### Controlled

```tsx
"use client"

import * as React from "react"

import { CheckIcon, LoaderIcon, UploadIcon } from "@/components/icons"
import { ActionSwapBlurButton } from "@/registry/base-nova/ui/action-swap-blur"

export default function ActionSwapBlurControlled() {
  const [status, setStatus] = React.useState("idle")
  const timers = React.useRef<number[]>([])
  React.useEffect(() => () => timers.current.forEach(clearTimeout), [])
  return (
    <ActionSwapBlurButton
      cycle={false}
      value={status}
      disabled={status === "uploading"}
      onClick={() => {
        if (status !== "idle") return
        setStatus("uploading")
        timers.current.push(
          window.setTimeout(() => setStatus("done"), 1500),
          window.setTimeout(() => setStatus("idle"), 3200)
        )
      }}
      items={[
        { value: "idle", label: "Upload photos", icon: <UploadIcon /> },
        { value: "uploading", label: "Uploading", icon: <LoaderIcon className="animate-spin motion-reduce:animate-none" /> },
        { value: "done", label: "12 photos uploaded", icon: <CheckIcon /> },
      ]}
    />
  )
}
```

### Custom Slots

```tsx
"use client"

import * as React from "react"

import { HeartIcon, ThumbsUpIcon } from "@/components/icons"
import { ActionSwapBlurIcon, ActionSwapBlurText } from "@/registry/base-nova/ui/action-swap-blur"
import { Button } from "@/registry/base-nova/ui/button"

export default function ActionSwapBlurCustomSlots() {
  const [liked, setLiked] = React.useState(false)
  const count = liked ? 129 : 128
  return (
    <Button variant="secondary" aria-pressed={liked} onClick={() => setLiked((v) => !v)}>
      <ActionSwapBlurIcon value={liked ? "liked" : "like"}>
        {liked ? <HeartIcon data-icon="inline-start" className="text-destructive" /> : <ThumbsUpIcon data-icon="inline-start" />}
      </ActionSwapBlurIcon>
      <ActionSwapBlurText value={String(count)} className="tabular-nums">
        {count} likes
      </ActionSwapBlurText>
    </Button>
  )
}
```

### Animations

```tsx
"use client"

import { CheckIcon, CopyIcon } from "@/components/icons"
import { ActionSwapButton, type ActionSwapAnimation } from "@/registry/base-nova/ui/action-swap-blur"

const ANIMATIONS: ActionSwapAnimation[] = ["blur", "roll", "cascade"]

export default function ActionSwapBlurAnimations() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      {ANIMATIONS.map((animation) => (
        <ActionSwapButton
          key={animation}
          animation={animation}
          variant="secondary"
          resetAfter={1600}
          items={[
            { value: "copy", label: `Copy (${animation})`, icon: <CopyIcon /> },
            { value: "copied", label: "Copied", icon: <CheckIcon /> },
          ]}
        />
      ))}
    </div>
  )
}
```

## Motion

The swap runs 220ms ease-out while the width springs. With reduced motion they cross-fade and the width snaps. Each new state is announced through a polite live region.

## Related

[Action Swap Roll](https://paneui.dev/docs/action-swap-roll) has the same API with a rolling animation.

## API Reference

### ActionSwapBlurButton

A `Button` that advances through `items` on click, swapping its icon and label with a blur. Same props as `ActionSwapButton` without `animation`. Also accepts every prop of [Button](/docs/button).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `items` (required) | `ActionSwapItem[]` | — | States in order: `{ value: string; label: ReactNode; icon?: ReactNode; ariaLabel?: string }`. |
| `value` | `string` | — | Controlled current item value. |
| `defaultValue` | `string` | — | Initial item value. Defaults to the first item. |
| `onValueChange` | `(value: string, item: ActionSwapItem) => void` | — | Called when the current item changes, including on reset. |
| `iconOnly` | `boolean` | true for `icon*` sizes | Hide the label and swap only the icon slot. |
| `cycle` | `boolean` | `true` | Advance to the next item on click. Turn off to drive `value` yourself. |
| `resetAfter` | `number` | — | Milliseconds after which the button returns to its first item, e.g. Copied → Copy. |
| `size` | `Button size` | `"default"` | Passed to Button. |

### ActionSwapBlurText

Label slot that swaps its content when `value` changes, gliding to the new width. Also accepts every prop of `span`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` (required) | `string` | — | Identity of the current label; a new value triggers the swap. |
| `children` (required) | `ReactNode` | — | The label. |
| `className` | `string` | — | Classes for the slot. |

### ActionSwapBlurIcon

16px icon slot; the old glyph leaves as the new one arrives in the same cell. Also accepts every prop of `span`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` (required) | `string` | — | Identity of the current icon. |
| `children` (required) | `ReactNode` | — | The icon. |
| `className` | `string` | — | Classes for the slot. |

### ActionSwapButton

The shared engine behind the blur, roll and cascade presets. Also accepts every prop of [Button](/docs/button).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `animation` | `"blur" \| "roll" \| "cascade"` | `"blur"` | Swap style. `cascade` splits plain-string labels letter by letter and rolls anything else. |
| `…` | `same as ActionSwapBlurButton` | — |  |

### ActionSwapText / ActionSwapIcon

Engine slots; the preset slots are these with `animation` fixed.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `animation` | `"blur" \| "roll" \| "cascade"` | `"blur"` | Swap style. |
