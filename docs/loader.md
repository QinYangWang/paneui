# Loader

> Shows that something is loading.

Page: https://paneui.dev/docs/loader/

## Installation

```bash
npx shadcn@latest add @paneui/loader
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/loader.json
```

Registry items it builds on: `@paneui/theme`, `@paneui/locale-provider`.

## Usage

```tsx
import { Loader } from "@/components/ui/loader"
```

```tsx
<Loader variant="dots" />
```

## Examples

### Speed

```tsx
import { Loader } from "@/registry/base-nova/ui/loader"

const SPEEDS = [0.5, 1, 2]

export default function LoaderSpeed() {
  return (
    <div className="flex gap-10">
      {SPEEDS.map((speed) => (
        <div key={speed} className="flex flex-col items-center gap-3">
          <div className="flex items-center gap-4">
            <Loader variant="dots" speed={speed} label={`Loading at ${speed}× speed`} />
            <Loader variant="orbit" speed={speed} label={`Loading at ${speed}× speed`} />
          </div>
          <span className="text-xs text-muted-foreground tabular-nums">speed {speed}</span>
        </div>
      ))}
    </div>
  )
}
```

### Colors

```tsx
import { Loader } from "@/registry/base-nova/ui/loader"

export default function LoaderColors() {
  return (
    <div className="flex items-center gap-6">
      <Loader variant="ring" className="text-primary" />
      <Loader variant="pulse" className="text-success" />
      <Loader variant="bars" className="text-warning" />
      <Loader variant="ripple" className="text-destructive" />
      <Loader variant="typing" className="text-muted-foreground" />
    </div>
  )
}
```

### In Context

```tsx
import { Button } from "@/registry/base-nova/ui/button"
import { Loader } from "@/registry/base-nova/ui/loader"

export default function LoaderInContext() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <Button disabled>
        <Loader variant="ring" size="sm" label="Saving" />
        Saving changes
      </Button>
      <div className="flex items-center gap-3 rounded-xl bg-card px-4 py-3 text-sm shadow-raised">
        <span className="flex text-muted-foreground">
          <Loader variant="spinner" size="sm" label="Syncing calendar" />
        </span>
        <span>Syncing your calendar…</span>
      </div>
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Loader variant="typing" size="sm" label="Assistant is typing" />
        <span>Assistant is typing</span>
      </div>
    </div>
  )
}
```

### Sizes

```tsx
import { Loader } from "@/registry/base-nova/ui/loader"

export default function LoaderSizes() {
  return (
    <div className="flex items-center gap-6 text-muted-foreground">
      {(["xs", "sm", "md", "lg"] as const).map((size) => (
        <Loader key={size} size={size} />
      ))}
    </div>
  )
}
```

## Accessibility

Renders `role="status"` with `aria-label` from `label` (default `"Loading"`).

## Motion

Loops are CSS keyframes shipped with the component, so they don't stall on a busy page or restart on re-render. With reduced motion every variant swaps movement, rotation and scale for a soft opacity fade and drops the extra `pulse` and `ripple` rings; `spinner` is opacity-only already.

## API Reference

### Loader

Loading indicator in eight styles. Also accepts every prop of `span`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `"spinner" \| "ring" \| "dots" \| "bars" \| "pulse" \| "ripple" \| "orbit" \| "typing"` | `"spinner"` | Animation style. |
| `size` | `"xs" \| "sm" \| "md" \| "default" \| "lg"` | `"md"` | 12, 16, 24 or 32px; `default` is the same as `md`. |
| `speed` | `number` | `1` | Multiplier on animation speed; 2 is twice as fast. |
| `label` | `string` | `"Loading"` | Announced to screen readers. |

| Data attribute | Description |
| --- | --- |
| `data-variant` | The `variant` value. |
| `data-size` | The `size` value. |
