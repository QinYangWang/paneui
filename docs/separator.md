# Separator

> Divides groups of content with a hairline.

Page: https://paneui.dev/docs/separator/

## Installation

```bash
npx shadcn@latest add @paneui/separator
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/separator.json
```

Packages: `@base-ui/react`.

Registry items it builds on: `@paneui/theme`.

## Usage

```tsx
import { Separator } from "@/components/ui/separator"
```

```tsx
<Separator />
<Separator orientation="vertical" />
```

## Examples

### List

```tsx
import { Separator } from "@/registry/base-nova/ui/separator"

const rows = [
  ["Plan", "Team"],
  ["Seats", "8 of 10"],
  ["Renews", "Nov 1, 2026"],
]

export default function SeparatorList() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-2.5 text-ui">
      {rows.map(([k, v], i) => (
        <div key={k} className="flex flex-col gap-2.5">
          {i > 0 && <Separator />}
          <div className="flex justify-between">
            <span className="text-muted-foreground">{k}</span>
            <span className="tabular-nums">{v}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
```

## API Reference

Built on [the Separator primitive](https://base-ui.com/react/components/separator#api-reference). Only the props this library adds or changes are listed; everything else passes through.

### Separator

Also accepts every prop of [Separator](https://base-ui.com/react/components/separator).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` | A vertical one stretches to its row's height. |
