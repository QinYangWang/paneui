# Progress

> Shows how far a task has come.

Page: https://paneui.dev/docs/progress/

## Installation

```bash
npx shadcn@latest add @paneui/progress
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/progress.json
```

Packages: `@base-ui/react`, `class-variance-authority`.

Registry items it builds on: `@paneui/theme`.

## Usage

```tsx
import { Progress, ProgressLabel, ProgressValue } from "@/components/ui/progress"
```

```tsx
<Progress value={64}>
  <ProgressLabel>Uploading</ProgressLabel>
  <ProgressValue />
</Progress>
```

## Examples

### Tones

Use when a bar reports a storage or quota limit.

```tsx
import { Progress, ProgressLabel, ProgressValue } from "@/registry/base-nova/ui/progress"

export default function ProgressTones() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-5">
      <Progress value={100} tone="success" size="sm">
        <ProgressLabel>Backup</ProgressLabel>
        <ProgressValue />
      </Progress>
      <Progress value={82} tone="warning">
        <ProgressLabel>Storage</ProgressLabel>
        <ProgressValue />
      </Progress>
      <Progress value={97} tone="destructive" size="lg">
        <ProgressLabel>API quota</ProgressLabel>
        <ProgressValue />
      </Progress>
    </div>
  )
}
```

### RTL

```tsx
import { DirectionProvider } from "@base-ui/react/direction-provider"
import { Progress, ProgressLabel, ProgressValue } from "@/registry/base-nova/ui/progress"

export default function ProgressRtl() {
  return (
    <DirectionProvider direction="rtl">
      <div dir="rtl" className="w-full max-w-xs">
        <Progress value={64}>
          <ProgressLabel>رفع ٢٤ ملفًا</ProgressLabel>
          <ProgressValue />
        </Progress>
      </div>
    </DirectionProvider>
  )
}
```

## Motion

The fill eases to each new value over 300ms. With `value={null}` the bar is indeterminate: it slides across the track, and pulses in place under reduced motion.

## API Reference

Built on [the Progress primitive](https://base-ui.com/react/components/progress#api-reference). Only the props this library adds or changes are listed; everything else passes through.

### Progress

Also accepts every prop of [Progress.Root](https://base-ui.com/react/components/progress#root).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` (required) | `number \| null` | — | Current value; `null` is indeterminate. |
| `size` | `"sm" \| "default" \| "lg"` | `"default"` | Track height (4 / 6 / 8px). |
| `tone` | `"default" \| "success" \| "warning" \| "destructive"` | `"default"` | Fill colour. |
| `children` | `ReactNode` | — | Label and value row above the track. |

### ProgressLabel

Also accepts every prop of [Progress.Label](https://base-ui.com/react/components/progress#label).

### ProgressValue

Formatted percentage by default. Also accepts every prop of [Progress.Value](https://base-ui.com/react/components/progress#value).
