# Icon Chip

> Frames an icon so card and section headers match.

Page: https://paneui.dev/docs/icon-chip/

## Installation

```bash
npx shadcn@latest add @paneui/icon-chip
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/icon-chip.json
```

Packages: `@base-ui/react`, `class-variance-authority`.

Registry items it builds on: `@paneui/theme`.

## Usage

```tsx
import { IconChip } from "@/components/ui/icon-chip"
```

```tsx
<IconChip tone="primary">
  <SparklesIcon />
</IconChip>
```

## Examples

### Tones

```tsx
import { BellIcon, BoltIcon, ShieldIcon, SparklesIcon, ThumbsUpIcon, WarningIcon } from "@/components/icons"
import { IconChip } from "@/registry/base-nova/ui/icon-chip"

export default function IconChipTones() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <IconChip tone="neutral">
        <BellIcon />
      </IconChip>
      <IconChip tone="primary">
        <SparklesIcon />
      </IconChip>
      <IconChip tone="success">
        <ThumbsUpIcon />
      </IconChip>
      <IconChip tone="warning">
        <WarningIcon />
      </IconChip>
      <IconChip tone="destructive">
        <ShieldIcon />
      </IconChip>
      <IconChip tone="solid">
        <BoltIcon />
      </IconChip>
    </div>
  )
}
```

### Sizes

```tsx
import { InboxIcon } from "@/components/icons"
import { IconChip } from "@/registry/base-nova/ui/icon-chip"

export default function IconChipSizes() {
  return (
    <div className="flex flex-wrap items-end justify-center gap-3">
      <IconChip size="sm">
        <InboxIcon />
      </IconChip>
      <IconChip>
        <InboxIcon />
      </IconChip>
      <IconChip size="lg">
        <InboxIcon />
      </IconChip>
      <IconChip size="xl">
        <InboxIcon />
      </IconChip>
    </div>
  )
}
```

### Card Header

```tsx
import { CreditCardIcon } from "@/components/icons"
import { Button } from "@/registry/base-nova/ui/button"
import { Card, CardAction, CardDescription, CardHeader, CardTitle } from "@/registry/base-nova/ui/card"
import { IconChip } from "@/registry/base-nova/ui/icon-chip"

export default function IconChipCardHeader() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <div className="flex items-start gap-3">
          <IconChip tone="primary" size="lg">
            <CreditCardIcon />
          </IconChip>
          <div className="flex flex-col gap-1">
            <CardTitle>Billing</CardTitle>
            <CardDescription>Pro plan, renews Nov 1.</CardDescription>
          </div>
        </div>
        <CardAction>
          <Button variant="secondary" size="sm">
            Manage
          </Button>
        </CardAction>
      </CardHeader>
    </Card>
  )
}
```

## Accessibility

The chip is always `aria-hidden`, so it is decoration only. Put the meaning in the text next to it.

## API Reference

### IconChip

A small rounded frame that holds one icon. Also accepts every prop of `span`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `tone` | `"neutral" \| "primary" \| "success" \| "warning" \| "destructive" \| "solid"` | `"neutral"` | Surface and icon color. |
| `size` | `"sm" \| "default" \| "lg" \| "xl"` | `"default"` | Chip size (24 / 32 / 40 / 48px); the icon scales with it. |
| `render` | `ReactElement \| (props, state) => ReactElement` | — | Replace the rendered `<span>` with another element. |

### iconChipVariants

The `cva` function behind `IconChip`, for styling other elements like a chip.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `tone` | `same as IconChip` | — |  |
| `size` | `same as IconChip` | — |  |
