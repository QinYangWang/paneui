# Segmented Control

> Switches a setting between a few options.

Page: https://paneui.dev/docs/segmented-control/

## Installation

```bash
npx shadcn@latest add @paneui/segmented-control
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/segmented-control.json
```

Packages: `@base-ui/react`, `motion`, `class-variance-authority`.

Registry items it builds on: `@paneui/theme`.

## Usage

```tsx
import { SegmentedControl, SegmentedControlItem } from "@/components/ui/segmented-control"
```

```tsx
<SegmentedControl value={cycle} onValueChange={setCycle} aria-label="Billing cycle">
  <SegmentedControlItem value="monthly">Monthly</SegmentedControlItem>
  <SegmentedControlItem value="yearly">Yearly</SegmentedControlItem>
</SegmentedControl>
```

## Composition

```text
SegmentedControl
└── SegmentedControlItem
```

## Examples

### Sizes

```tsx
import { SegmentedControl, SegmentedControlItem } from "@/registry/base-nova/ui/segmented-control"

export default function SegmentedControlSizes() {
  return (
    <div className="flex flex-col items-center gap-4">
      {(["xs", "sm", "default", "lg"] as const).map((size) => (
        <SegmentedControl key={size} size={size} defaultValue="30d" aria-label={`Range (${size})`}>
          <SegmentedControlItem value="7d">7d</SegmentedControlItem>
          <SegmentedControlItem value="30d">30d</SegmentedControlItem>
          <SegmentedControlItem value="90d">90d</SegmentedControlItem>
        </SegmentedControl>
      ))}
    </div>
  )
}
```

## Tabs or segmented control?

Use Tabs when the options switch panels of content. Use a segmented control when they change a value, like a billing cycle or theme. It is a radio group, so arrow keys move the selection.

## Motion

Under reduced motion the thumb moves instantly.

## API Reference

Built on [the Radio Group primitive](https://base-ui.com/react/components/radio#api-reference). Only the props this library adds or changes are listed; everything else passes through.

### SegmentedControl

Also accepts every prop of [RadioGroup](https://base-ui.com/react/components/radio#radiogroup).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `string` | — | Controlled value. |
| `defaultValue` | `string` | — | Initial value. |
| `onValueChange` | `(value: string) => void` | — | Called with the new value. |
| `size` | `"xs" \| "sm" \| "default" \| "lg"` | `"default"` | Outer height 24 / 28 / 32 / 36px, the Button heights; items are 4px shorter. |

### SegmentedControlItem

Also accepts every prop of [Radio.Root](https://base-ui.com/react/components/radio#root).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` (required) | `string` | — | This option's value. |
