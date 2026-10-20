# Breadcrumb

> Shows where the current page sits in the site hierarchy.

Page: https://paneui.dev/docs/breadcrumb/

## Installation

```bash
npx shadcn@latest add @paneui/breadcrumb
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/breadcrumb.json
```

Packages: `@base-ui/react`, `class-variance-authority`.

Registry items it builds on: `@paneui/theme`, `@paneui/icons`, `@paneui/menu`, `@paneui/locale-provider`.

## Usage

```tsx
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
```

```tsx
<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Components</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
```

## Composition

```text
Breadcrumb
└── BreadcrumbList
    ├── BreadcrumbItem
    │   ├── BreadcrumbLink
    │   ├── BreadcrumbEllipsis
    │   └── BreadcrumbPage
    └── BreadcrumbSeparator

BreadcrumbTrail (renders all of the above from items)
```

## Examples

### Custom Separator

Use a custom separator, like a slash, for file paths.

```tsx
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/registry/base-nova/ui/breadcrumb"

export default function BreadcrumbCustomSeparator() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Settings</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>/</BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Billing</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>/</BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbPage>Invoices</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}
```

### With Icons

```tsx
import { FolderIcon, HomeIcon } from "@/components/icons"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/registry/base-nova/ui/breadcrumb"

export default function BreadcrumbWithIcons() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#" aria-label="Home">
            <HomeIcon />
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="#">
            <FolderIcon />
            Trips
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>
            <FolderIcon />
            Kyoto, November
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}
```

### Trail Options

```tsx
import { BreadcrumbTrail } from "@/registry/base-nova/ui/breadcrumb"

const path = [
  { label: "Drive", href: "#" },
  { label: "Work", href: "#" },
  { label: "Clients", href: "#" },
  { label: "Acme", href: "#" },
  { label: "Contracts", href: "#" },
  { label: "Renewal 2027.pdf" },
]

export default function BreadcrumbTrailOptions() {
  return (
    <div className="flex flex-col items-start gap-4">
      <BreadcrumbTrail items={path} />
      <BreadcrumbTrail items={path} maxItems={3} itemsBeforeCollapse={1} itemsAfterCollapse={1} />
      <BreadcrumbTrail items={path} maxItems={10} separator="/" />
    </div>
  )
}
```

### Static Ellipsis

Use a static ellipsis when the hidden crumbs aren't worth navigating to.

```tsx
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/registry/base-nova/ui/breadcrumb"

export default function BreadcrumbStaticEllipsis() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Docs</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbEllipsis />
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}
```

### Sizes

```tsx
import { BreadcrumbTrail } from "@/registry/base-nova/ui/breadcrumb"

const items = [{ label: "Workspace", href: "#" }, { label: "Projects", href: "#" }, { label: "Atlas" }]

export default function BreadcrumbSizes() {
  return (
    <div className="flex flex-col items-center gap-3">
      {(["sm", "default", "lg"] as const).map((size) => (
        <BreadcrumbTrail key={size} size={size} items={items} />
      ))}
    </div>
  )
}
```

### RTL

```tsx
"use client"

import { DirectionProvider } from "@base-ui/react/direction-provider"
import { HomeIcon } from "@/components/icons"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/registry/base-nova/ui/breadcrumb"

export default function BreadcrumbRtl() {
  return (
    <DirectionProvider direction="rtl">
      <div dir="rtl">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">
                <HomeIcon />
                الرئيسية
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="#">المكونات</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>مسار التنقل</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </DirectionProvider>
  )
}
```

## Motion

Each crumb fades and slides in 4px when it mounts, e.g. when navigating deeper. With reduced motion it appears at once.

## Accessibility

`Breadcrumb` is a `nav` labelled "Breadcrumb". `BreadcrumbPage` is marked `aria-current="page"`, and separators are hidden from screen readers.

## API Reference

### Breadcrumb

Also accepts every prop of `nav`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `aria-label` | `string` | `"Breadcrumb"` | Accessible name of the nav. |

### BreadcrumbList

Wrapping row of crumbs. Also accepts every prop of `ol`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `size` | `"sm" \| "default" \| "lg"` | `"default"` | Crumb height 24, 28 or 32px and text size, for every part inside. |

| Data attribute | Description |
| --- | --- |
| `data-size` | The `size` value. |

### BreadcrumbItem

One crumb; fades in on mount. Also accepts every prop of `li`.

### BreadcrumbLink

A link crumb. Icons inside it, or inside `BreadcrumbPage`, are sized to 14px. Also accepts every prop of `a`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `render` | `ReactElement \| (props, state) => ReactElement` | — | Replace the `<a>`, e.g. with a router `Link`. |

### BreadcrumbPage

The current page, with `aria-current="page"`. Also accepts every prop of `span`.

### BreadcrumbSeparator

Also accepts every prop of `li`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `ReactNode` | `<ChevronRightIcon />` | Separator glyph. |

### BreadcrumbEllipsis

The "…" crumb. With `items` it is a button that opens a menu of the hidden crumbs; without them it is a plain marker. Also accepts every prop of `span`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `items` | `{ label: ReactNode; href?: string; icon?: ReactNode; onClick?: () => void }[]` | — | Hidden crumbs listed in the menu. |
| `label` | `string` | `"Show hidden breadcrumbs"` | Accessible name of the menu button. |

| Data attribute | Description |
| --- | --- |
| `data-popup-open` | Present on the menu button while its menu is open. |

### BreadcrumbTrail

Renders a whole breadcrumb from `items`; the last item is the current page. Also accepts every prop of `nav`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `size` | `"sm" \| "default" \| "lg"` | `"default"` | Passed to `BreadcrumbList`. |
| `items` (required) | `{ label: ReactNode; href?: string; icon?: ReactNode; onClick?: () => void }[]` | — | Crumbs from root to current page. |
| `maxItems` | `number` | `4` | Collapse the middle once there are more items than this. |
| `itemsBeforeCollapse` | `number` | `1` | Crumbs kept before the ellipsis. |
| `itemsAfterCollapse` | `number` | `2` | Crumbs kept after the ellipsis. |
| `separator` | `ReactNode` | — | Replaces the chevron between crumbs. |
