# Pagination

> Moves through pages of results in a list or table.

Page: https://paneui.dev/docs/pagination/

## Installation

```bash
npx shadcn@latest add @paneui/pagination
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/pagination.json
```

Registry items it builds on: `@paneui/theme`, `@paneui/icons`, `@paneui/button`, `@paneui/select`, `@paneui/locale-provider`.

## Usage

```tsx
import { Pagination, PaginationPageSize, PaginationSummary } from "@/components/ui/pagination"
```

```tsx
<Pagination page={page} pageCount={12} onPageChange={setPage} />
```

## Examples

### Sizes

```tsx
"use client"

import * as React from "react"

import { Pagination } from "@/registry/base-nova/ui/pagination"

export default function PaginationSizes() {
  const [page, setPage] = React.useState(4)
  return (
    <div className="flex flex-col items-center gap-3">
      {(["sm", "default", "lg"] as const).map((size) => (
        <Pagination key={size} size={size} page={page} pageCount={12} onPageChange={setPage} />
      ))}
    </div>
  )
}
```

### Compact

Use on phones and narrow panels.

```tsx
"use client"

import * as React from "react"

import { Pagination } from "@/registry/base-nova/ui/pagination"

export default function PaginationCompact() {
  const [page, setPage] = React.useState(2)
  return <Pagination compact page={page} pageCount={9} onPageChange={setPage} />
}
```

### RTL

```tsx
"use client"

import * as React from "react"
import { DirectionProvider } from "@base-ui/react/direction-provider"
import { Pagination } from "@/registry/base-nova/ui/pagination"

export default function PaginationRtl() {
  const [page, setPage] = React.useState(4)
  return (
    <DirectionProvider direction="rtl">
      <div dir="rtl">
        <Pagination page={page} pageCount={12} onPageChange={setPage} aria-label="ترقيم الصفحات" />
      </div>
    </DirectionProvider>
  )
}
```

## Accessibility

A `nav` labelled Pagination; the current page button has `aria-current="page"`, prev / next are disabled at the ends. `getPageRange` is exported if you build your own.

## API Reference

### Pagination

Also accepts every prop of `nav`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `size` | `"sm" \| "default" \| "lg"` | `"default"` | Height of the page buttons, from 24 to 32px. |
| `page` (required) | `number` | — | Current page, 1-based. |
| `pageCount` (required) | `number` | — | Number of pages. |
| `onPageChange` (required) | `(page: number) => void` | — | Called with the page to show (clamped). |
| `siblings` | `number` | `1` | Pages either side of the current one before an ellipsis. |
| `compact` | `boolean` | `false` | Prev / next and a "Page x of y" label only. |

### PaginationSummary

Also accepts every prop of `p`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `page` (required) | `number` | — | Current page. |
| `pageSize` (required) | `number` | — | Rows per page. |
| `total` (required) | `number` | — | Total rows. |
| `noun` | `string` | `the locale's` | What is being counted. |

### PaginationPageSize

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `size` | `"sm" \| "default" \| "lg"` | `"default"` | Matches `Pagination`; the select is 24, 28 or 32px tall. |
| `value` (required) | `number` | — | Rows per page. |
| `onValueChange` (required) | `(size: number) => void` | — | Called with the new size. |
| `options` | `number[]` | `[10, 20, 50]` | Choices. |
