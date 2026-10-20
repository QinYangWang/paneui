# Badge

> Labels an item with a short status or category.

Page: https://paneui.dev/docs/badge/

## Installation

```bash
npx shadcn@latest add @paneui/badge
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/badge.json
```

Packages: `@base-ui/react`, `class-variance-authority`.

Registry items it builds on: `@paneui/theme`.

## Usage

```tsx
import { Badge } from "@/components/ui/badge"
```

```tsx
<Badge variant="success">Paid</Badge>
```

## Examples

### Sizes

```tsx
import { Badge } from "@/registry/base-nova/ui/badge"

export default function BadgeSizes() {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex flex-wrap items-center justify-center gap-2">
        <Badge>Chip</Badge>
        <Badge variant="primary">Beta</Badge>
        <Badge variant="success">Paid</Badge>
        <Badge variant="outline">Draft</Badge>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-2">
        <Badge size="sm">Chip</Badge>
        <Badge size="sm" variant="primary">
          Beta
        </Badge>
        <Badge size="sm" variant="success">
          Paid
        </Badge>
        <Badge size="sm" variant="outline">
          Draft
        </Badge>
      </div>
    </div>
  )
}
```

### With Icon

Put an icon first when the badge marks a status or category.

```tsx
import { CheckIcon, ClockIcon, WarningIcon } from "@/components/icons"
import { Badge } from "@/registry/base-nova/ui/badge"

export default function BadgeWithIcon() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Badge variant="success">
        <CheckIcon />
        Delivered
      </Badge>
      <Badge variant="warning">
        <ClockIcon />
        Due Friday
      </Badge>
      <Badge variant="destructive" size="sm">
        <WarningIcon />
        Overdue
      </Badge>
    </div>
  )
}
```

### With Avatar

```tsx
import { Badge, BadgeAvatar } from "@/registry/base-nova/ui/badge"

const vendors = [
  { initial: "A", name: "Acme Hosting" },
  { initial: "N", name: "Northwind" },
  { initial: "L", name: "Linear" },
]

export default function BadgeWithAvatar() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {vendors.map((vendor) => (
        <Badge key={vendor.name}>
          <BadgeAvatar>{vendor.initial}</BadgeAvatar>
          {vendor.name}
        </Badge>
      ))}
    </div>
  )
}
```

### As Link

```tsx
import { TagIcon } from "@/components/icons"
import { Badge } from "@/registry/base-nova/ui/badge"

const tags = ["design", "accessibility", "motion"]

export default function BadgeAsLink() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {tags.map((tag) => (
        <Badge key={tag} render={<a href={`#${tag}`} />}>
          <TagIcon />
          {tag}
        </Badge>
      ))}
    </div>
  )
}
```

## API Reference

### Badge

Also accepts every prop of `span`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `"chip" \| "primary" \| "success" \| "warning" \| "destructive" \| "outline"` | `"chip"` | Visual style. `chip` is neutral; the tinted variants carry status. |
| `size` | `"default" \| "sm"` | `"default"` | Height, padding and text size. `default` is 28px tall and `sm` 20px; icons are 14px, or 12px at `sm`. |
| `render` | `ReactElement \| (props, state) => ReactElement` | — | Replace the rendered `<span>`, e.g. with `<a />` or a router `Link`. |

### BadgeAvatar

Small round mark at the start of a badge, e.g. a vendor initial. Also accepts every prop of `span`.

### badgeVariants

The `cva` function behind `Badge`, for styling other elements like a badge.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `same as Badge` | — |  |
| `size` | `same as Badge` | — |  |
