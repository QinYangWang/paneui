# Usage Meter

> Shows how much of a quota has been used.

Page: https://paneui.dev/docs/usage-meter/

## Installation

```bash
npx shadcn@latest add @paneui/usage-meter
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/usage-meter.json
```

Packages: `@base-ui/react`.

Registry items it builds on: `@paneui/theme`.

## Usage

```tsx
import { UsageMeter } from "@/components/ui/usage-meter"
```

```tsx
<UsageMeter label="Agent runs" value={8420} max={10000} unit="runs" description="Resets on Nov 1" />
```

## Examples

### Percent and Thresholds

```tsx
import { UsageMeter } from "@/registry/base-nova/ui/usage-meter"

export default function UsageMeterPercent() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-5">
      <UsageMeter label="API quota" value={6200} max={10000} readout="percent" />
      <UsageMeter label="Build minutes" value={410} max={500} readout="percent" warnAt={0.6} dangerAt={0.95} />
    </div>
  )
}
```

## Accessibility

Renders a meter (`role="meter"`) labelled by `label`, with value text like "8,420 of 10,000 runs".

## API Reference

Built on [the Meter primitive](https://base-ui.com/react/components/meter#api-reference). Only the props this library adds or changes are listed; everything else passes through.

### UsageMeter

Also accepts every prop of [Meter.Root](https://base-ui.com/react/components/meter#root).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` (required) | `ReactNode` | — | What is being measured. |
| `value` (required) | `number` | — | Amount used. |
| `max` | `number` | `100` | The quota. |
| `unit` | `string` | — | Suffix for the numbers. |
| `description` | `ReactNode` | — | Line under the bar. |
| `warnAt` | `number` | `0.75` | Share where the bar turns warning. |
| `dangerAt` | `number` | `0.9` | Share where it turns destructive. |
| `readout` | `"value" \| "percent" \| "none"` | `"value"` | What the right side shows. |
| `formatOptions` | `Intl.NumberFormatOptions` | — | Number format for the readout. |

| Data attribute | Description |
| --- | --- |
| `data-level` | `ok`, `warn` or `danger`. |
