# Skeleton

> Placeholder shape while content loads.

Page: https://paneui.dev/docs/skeleton/

## Installation

```bash
npx shadcn@latest add @paneui/skeleton
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/skeleton.json
```

Registry items it builds on: `@paneui/theme`.

## Usage

```tsx
import { Skeleton } from "@/components/ui/skeleton"
```

```tsx
<Skeleton className="h-4 w-32" />
```

## Examples

### Card

```tsx
import { Card, CardContent, CardHeader } from "@/registry/base-nova/ui/card"
import { Skeleton } from "@/registry/base-nova/ui/skeleton"

export default function SkeletonCard() {
  return (
    <Card className="w-full max-w-xs" aria-busy aria-label="Loading">
      <CardHeader>
        <Skeleton className="h-4 w-2/5" />
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <Skeleton shape="card" className="aspect-video w-full" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-3/4" />
      </CardContent>
    </Card>
  )
}
```

## Accessibility

Skeletons are `aria-hidden`. Mark the loading region with `aria-busy` and a label. The pulse stops under reduced motion.

## API Reference

### Skeleton

Size comes from `className`. Also accepts every prop of `div`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `shape` | `"default" \| "circle" \| "card"` | `"default"` | Corner shape; round suits avatars and `rounded-xl` suits media. |
