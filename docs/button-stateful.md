# Button Stateful

> Shows an action’s progress and result.

Page: https://paneui.dev/docs/button-stateful/

## Installation

```bash
npx shadcn@latest add @paneui/button-stateful
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/button-stateful.json
```

Packages: `@base-ui/react`, `motion`.

Registry items it builds on: `@paneui/theme`, `@paneui/icons`, `@paneui/button`.

## Usage

```tsx
import { StatefulButton } from "@/components/ui/button-stateful"
```

```tsx
<StatefulButton state={state} onClick={save} successText="Saved">
  Save
</StatefulButton>
```

## Examples

### States

Use for async actions like saving, where the reader needs to see the result.

```tsx
import { DownloadIcon } from "@/components/icons"
import { StatefulButton, type ButtonState } from "@/registry/base-nova/ui/button-stateful"

const STATES: ButtonState[] = ["idle", "loading", "success", "error"]

export default function ButtonStatefulStates() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      {STATES.map((state) => (
        <StatefulButton
          key={state}
          state={state}
          loadingText="Exporting"
          successText="Exported"
          errorText="Export failed"
          icon={<DownloadIcon />}
        >
          Export CSV
        </StatefulButton>
      ))}
    </div>
  )
}
```

### Variants

```tsx
"use client"

import * as React from "react"

import { StatefulButton, type ButtonState } from "@/registry/base-nova/ui/button-stateful"

const VARIANTS = ["default", "secondary", "outline", "ghost"] as const

export default function ButtonStatefulVariants() {
  const [state, setState] = React.useState<ButtonState>("idle")
  const timers = React.useRef<number[]>([])
  React.useEffect(() => () => timers.current.forEach(clearTimeout), [])
  const run = () => {
    if (state !== "idle") return
    setState("loading")
    timers.current.push(
      window.setTimeout(() => setState("success"), 1200),
      window.setTimeout(() => setState("idle"), 2800)
    )
  }
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      {VARIANTS.map((variant) => (
        <StatefulButton key={variant} variant={variant} state={state} onClick={run} successText="Saved">
          Save draft
        </StatefulButton>
      ))}
    </div>
  )
}
```

### Without Tint

```tsx
import { StatefulButton } from "@/registry/base-nova/ui/button-stateful"

export default function ButtonStatefulNoTint() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <StatefulButton state="success" successText="Published">
        Publish
      </StatefulButton>
      <StatefulButton state="success" successText="Published" tint={false}>
        Publish
      </StatefulButton>
    </div>
  )
}
```

### Sizes

```tsx
import { StatefulButton } from "@/registry/base-nova/ui/button-stateful"

export default function ButtonStatefulSizes() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <StatefulButton size="xs" state="loading" loadingText="Saving">
        Save
      </StatefulButton>
      <StatefulButton size="sm" state="loading" loadingText="Saving">
        Save
      </StatefulButton>
      <StatefulButton state="loading" loadingText="Saving">
        Save
      </StatefulButton>
      <StatefulButton size="lg" state="loading" loadingText="Saving">
        Save
      </StatefulButton>
    </div>
  )
}
```

## Accessibility

While `loading` the button is disabled but stays focusable (`focusableWhenDisabled`) and sets `aria-busy`. The current label is announced through a polite live region.

## Motion

With reduced motion the faces cross-fade and the width changes instantly.

## Related

See also [Button](https://paneui.dev/docs/button).

## API Reference

### StatefulButton

A Button that swaps between idle, loading, success and error faces. Also accepts every prop of [Button](/docs/button).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `state` | `"idle" \| "loading" \| "success" \| "error"` | `"idle"` | Which face the button shows. `idle` shows the children and `icon`; `loading` disables it (it stays focusable). |
| `children` (required) | `ReactNode` | — | Idle label. |
| `loadingText` | `ReactNode` | `"Working"` | Label while loading, after a spinner. |
| `successText` | `ReactNode` | `"Done"` | Label on success, after a check. |
| `errorText` | `ReactNode` | `"Try again"` | Label on error, after a cross. |
| `icon` | `ReactNode` | — | Trailing icon shown only while idle. |
| `tint` | `boolean` | `true` | Tint the surface green / red on success / error (`default` variant only). |
| `variant` | `Button variant` | `"default"` | Passed to Button. |

| Data attribute | Description |
| --- | --- |
| `data-state` | The current `state`. |
