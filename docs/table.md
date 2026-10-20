# Table

> Shows large data sets that people sort, select and resize.

Page: https://paneui.dev/docs/table/

## Installation

```bash
npx shadcn@latest add @paneui/table
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/table.json
```

Packages: `@tanstack/react-virtual`, `motion`, `@base-ui/react`.

Registry items it builds on: `@paneui/theme`, `@paneui/icons`, `@paneui/checkbox`, `@paneui/loader`, `@paneui/scroll-area`.

## Usage

```tsx
import { Table, type TableColumn } from "@/components/ui/table"
```

```tsx
<Table
  aria-label="Invoices"
  data={invoices}
  columns={[
    { key: "client", header: "Client", grow: true },
    { key: "total", header: "Total", align: "right", sortable: true },
  ]}
  getRowId={(row) => row.id}
  height={320}
/>
```

## Examples

### Basic

```tsx
"use client"

import { Table, type TableColumn } from "@/registry/base-nova/ui/table"

type Invoice = { id: string; client: string; issued: string; total: number; paid: boolean }

const invoices: Invoice[] = [
  { id: "INV-2041", client: "Northwind Studio", issued: "Oct 1", total: 4200, paid: true },
  { id: "INV-2042", client: "Lumen Health", issued: "Oct 3", total: 1850, paid: false },
  { id: "INV-2043", client: "Harbor & Pine", issued: "Oct 6", total: 920, paid: true },
  { id: "INV-2044", client: "Atlas Robotics", issued: "Oct 9", total: 12600, paid: false },
  { id: "INV-2045", client: "Copperleaf Café", issued: "Oct 12", total: 340, paid: true },
]

const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })

const columns: TableColumn<Invoice>[] = [
  { key: "id", header: "Invoice", width: 120 },
  { key: "client", header: "Client", width: 200, grow: true },
  { key: "issued", header: "Issued", width: 100 },
  { key: "status", header: "Status", width: 100, accessor: (r) => (r.paid ? "Paid" : "Open") },
  { key: "total", header: "Total", width: 110, align: "right", cell: (r) => <span className="tabular-nums">{usd.format(r.total)}</span> },
]

export default function TableBasic() {
  return (
    <div className="w-full max-w-2xl">
      <Table aria-label="Invoices" data={invoices} columns={columns} getRowId={(r) => r.id} height={264} />
    </div>
  )
}
```

### Loading and Empty

Use while the first rows load or when a filter returns nothing.

```tsx
"use client"

import * as React from "react"

import { Button } from "@/registry/base-nova/ui/button"
import { Table, type TableColumn } from "@/registry/base-nova/ui/table"

type Order = { id: string; item: string; qty: number }

const columns: TableColumn<Order>[] = [
  { key: "id", header: "Order", width: 120 },
  { key: "item", header: "Item", width: 220, grow: true },
  { key: "qty", header: "Qty", width: 80, align: "right" },
]

export default function TableLoadingEmpty() {
  const [state, setState] = React.useState<"loading" | "empty">("loading")
  return (
    <div className="flex w-full max-w-xl flex-col gap-3">
      <div className="flex gap-2">
        <Button size="xs" variant={state === "loading" ? "secondary" : "ghost"} onClick={() => setState("loading")}>
          Loading
        </Button>
        <Button size="xs" variant={state === "empty" ? "secondary" : "ghost"} onClick={() => setState("empty")}>
          Empty
        </Button>
      </div>
      <Table
        aria-label="Orders"
        data={[]}
        columns={columns}
        loading={state === "loading"}
        skeletonRows={4}
        height={240}
        emptyState={
          <div className="flex flex-col items-center gap-1 text-center">
            <p className="text-sm font-medium text-foreground">No orders yet</p>
            <p className="text-xs text-muted-foreground">New orders will show up here.</p>
          </div>
        }
      />
    </div>
  )
}
```

### Row Click and Density

```tsx
"use client"

import * as React from "react"

import { Table, type TableColumn } from "@/registry/base-nova/ui/table"

type Member = { id: string; name: string; role: string; lastActive: string; suspended?: boolean }

const members: Member[] = [
  { id: "m1", name: "Mina Park", role: "Owner", lastActive: "Just now" },
  { id: "m2", name: "Leo Chen", role: "Admin", lastActive: "2h ago" },
  { id: "m3", name: "Ava Ruiz", role: "Editor", lastActive: "Yesterday" },
  { id: "m4", name: "Sam Okafor", role: "Viewer", lastActive: "3 weeks ago", suspended: true },
  { id: "m5", name: "Noor Haddad", role: "Editor", lastActive: "Oct 2" },
  { id: "m6", name: "Kai Tanaka", role: "Viewer", lastActive: "Sep 28" },
]

const columns: TableColumn<Member>[] = [
  {
    key: "name",
    header: "Name",
    width: 180,
    grow: true,
    sortable: true,
    cell: (r) => (r.suspended ? `${r.name} · suspended` : r.name),
  },
  { key: "role", header: "Role", width: 110, sortable: true },
  { key: "lastActive", header: "Last active", width: 130, align: "right" },
]

export default function TableRowClick() {
  const [open, setOpen] = React.useState<Member | null>(null)
  return (
    <div className="flex w-full max-w-xl flex-col gap-3">
      <Table
        aria-label="Members"
        data={members}
        columns={columns}
        getRowId={(r) => r.id}
        rowHeight={36}
        headerHeight={36}
        height={260}
        defaultSort={{ key: "name", direction: "asc" }}
        onRowClick={({ row }) => setOpen(row)}
        rowClassName={({ row }) => (row.suspended ? "text-muted-foreground" : undefined)}
      />
      <p className="px-1 text-xs text-muted-foreground">
        {open ? (
          <>
            Opened <span className="font-medium text-foreground">{open.name}</span>
            {open.suspended ? " (suspended)" : ""}
          </>
        ) : (
          "Click a row to open the member."
        )}
      </p>
    </div>
  )
}
```

### Scroll to Row

Use to jump to a search hit or a newly added row in a long list.

```tsx
"use client"

import * as React from "react"

import { Button } from "@/registry/base-nova/ui/button"
import { Table, type TableColumn, type TableHandle } from "@/registry/base-nova/ui/table"

type Reading = { id: string; minute: number; temp: number }

const readings: Reading[] = Array.from({ length: 1440 }, (_, i) => ({
  id: `r${i}`,
  minute: i,
  temp: Math.round((19 + 3 * Math.sin((i / 1440) * Math.PI * 2 - 1.8)) * 10) / 10,
}))

const time = (m: number) => `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`

const columns: TableColumn<Reading>[] = [
  { key: "minute", header: "Time", width: 120, cell: (r) => <span className="font-mono text-xs">{time(r.minute)}</span> },
  { key: "temp", header: "Temperature", width: 160, grow: true, align: "right", cell: (r) => <span className="tabular-nums">{r.temp.toFixed(1)} °C</span> },
]

export default function TableScrollToIndex() {
  const table = React.useRef<TableHandle>(null)
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <div className="flex flex-wrap gap-2">
        <Button size="xs" variant="secondary" onClick={() => table.current?.scrollToIndex(720, { align: "center", behavior: "smooth" })}>
          Jump to noon
        </Button>
        <Button size="xs" variant="secondary" onClick={() => table.current?.scrollToIndex(1439, { align: "end" })}>
          Last reading
        </Button>
        <Button size="xs" variant="ghost" onClick={() => table.current?.scrollToTop("smooth")}>
          Top
        </Button>
      </div>
      <Table ref={table} aria-label="Thermostat log" data={readings} columns={columns} getRowId={(r) => r.id} rowHeight={36} height={280} />
    </div>
  )
}
```

## Scrollbars

The table scrolls in a [Scroll Area](https://paneui.dev/docs/scroll-area). The vertical track starts below the sticky header and both tracks stay inside the rounded frame.

## Keyboard

Sortable headers are buttons (asc → desc → off). With `reorderable`, Alt + ← / → moves the focused column; with `resizable`, focus a column edge and use ← / → (Shift for bigger steps), or double-click it to reset. Shift-click a checkbox to select a range.

## Related

[Table Editable](https://paneui.dev/docs/table-editable) and [Table Async](https://paneui.dev/docs/table-async) build on this core.

## API Reference

### Table

Virtualized data table. Renders a `div` tree with `table` / `grid` roles; no other DOM props pass through.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `data` (required) | `readonly T[]` | — | Rows. |
| `columns` (required) | `readonly TableColumn<T>[]` | — | Column definitions. |
| `getRowId` | `(row: T, index: number) => string` | — | Stable id per row; keeps selection and animation correct across sorts. Defaults to the index. |
| `aria-label` | `string` | — | Accessible name. |
| `role` | `"table" \| "grid"` | `"table"` | `grid` for interactive, spreadsheet-style cells. |
| `selectable` | `boolean` | `false` | Add a checkbox lane; shift-click selects ranges. |
| `selectedRowIds` | `readonly string[]` | — | Controlled selection. |
| `defaultSelectedRowIds` | `readonly string[]` | — | Initial selection. |
| `onSelectionChange` | `(ids: string[]) => void` | — | Called when the selection changes. |
| `sort` | `{ key: string; direction: "asc" \| "desc" } \| null` | — | Controlled sort. |
| `defaultSort` | `{ key: string; direction: "asc" \| "desc" } \| null` | `null` | Initial sort. |
| `onSortChange` | `(sort: SortState) => void` | — | Called when a header cycles the sort. |
| `resizable` | `boolean` | `false` | Drag column edges to resize. |
| `minColumnWidth` | `number` | `72` | Resize floor in px. |
| `onColumnResize` | `(key: string, width: number) => void` | — | Called after a resize. |
| `reorderable` | `boolean` | `false` | Drag headers to reorder. |
| `columnOrder` | `readonly string[]` | — | Controlled column order (keys). |
| `defaultColumnOrder` | `readonly string[]` | — | Initial column order. |
| `onColumnOrderChange` | `(keys: string[]) => void` | — | Called after a reorder. |
| `rowHeight` | `number` | `44` | Row height in px. |
| `headerHeight` | `number` | `40` | Header height in px. |
| `height` | `number` | `440` | Viewport height in px. |
| `overscan` | `number` | `8` | Rows rendered beyond the viewport; rows further out are not rendered. |
| `loading` | `boolean` | `false` | Skeleton rows when there is no data yet, a loading footer otherwise; pauses `onEndReached`. |
| `skeletonRows` | `number` | — | Number of skeleton rows while loading with no data. |
| `onEndReached` | `() => void` | — | Called when the list nears its end. |
| `endReachedThreshold` | `number` | `8` | How many rows from the end `onEndReached` fires. |
| `footer` | `ReactNode` | — | A band under the last row (load more, add row, end of list). |
| `emptyState` | `ReactNode` | `"No rows"` | Shown when there are no rows and `loading` is off. |
| `renderCell` | `(ctx: TableCellContext<T> & { content: ReactNode }) => ReactNode` | — | Wrap or replace any cell; `content` is what the table would have rendered. |
| `renderHeader` | `(ctx: TableHeaderContext<T>) => ReactNode` | — | Replace a header label; spread `labelProps` onto your element. |
| `headerAccessory` | `(ctx: TableHeaderContext<T>) => ReactNode` | — | Extra content inside a header cell, e.g. a column menu. |
| `gutter` | `{ width: number; header?: ReactNode; cell: (ctx: TableRowContext<T>) => ReactNode }` | — | Leading lane before the checkbox, e.g. row handles. |
| `onRowClick` | `(ctx: TableRowContext<T>, event: MouseEvent) => void` | — | Called when a row is clicked. |
| `rowClassName` | `(ctx: TableRowContext<T>) => string \| undefined` | — | Class per row from its context, e.g. `text-muted-foreground` for archived rows. Tokens only. |
| `animateLayout` | `boolean` | `true` | Slide rows and columns into new positions on insert, delete, sort and reorder. Off under reduced motion. |
| `className` | `string` | — | Class for the outer surface. |
| `ref` | `Ref<TableHandle>` | — | `scrollToIndex(index, { align, behavior })`, `scrollToTop(behavior)` and `element()`. |

| Data attribute | Description |
| --- | --- |
| `data-selected` | On selected rows. |
| `data-row-id` | The row id, on each row. |
| `data-col-key` | The column key, on header and body cells. |
| `data-dragging` | On a header while it is being dragged. |
| `data-resizing` | On a resize handle while it is being dragged. |

### TableColumn

Type of each entry in `columns`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `key` (required) | `string` | — | Stable key; also the property read from the row when there is no `accessor`. |
| `header` (required) | `ReactNode` | — | Header label. |
| `width` | `number` | `160` | Width in px. |
| `minWidth` | `number` | — | Floor for resizing. Falls back to `minColumnWidth`. |
| `grow` | `boolean` | — | Soak up leftover width (until resized). |
| `align` | `"left" \| "center" \| "right"` | `"left"` | Cell alignment. |
| `sortable` | `boolean` | — | Make the header sort on click. |
| `resizable` | `boolean` | — | Set `false` to opt out of resizing. |
| `accessor` | `(row: T) => unknown` | — | Raw value for the cell, sorting and default rendering. |
| `sortValue` | `(row: T) => string \| number \| null \| undefined` | — | Value used for sorting when it differs from the accessor. |
| `cell` | `(row: T, ctx: TableCellContext<T>) => ReactNode` | — | Custom cell content. |
| `className` | `string` | — | Class for body cells. |
| `headerClassName` | `string` | — | Class for the header cell. |

### TableSkeletonRow

Placeholder row for custom loading states.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `index` (required) | `number` | — | Row index; varies the bar widths. |
| `cells` (required) | `readonly number[]` | — | Cell widths in px, in display order. |
| `height` (required) | `number` | — | Row height in px. |
| `className` | `string` | — | Class for the row. |

### TableLoadingFooter

Default “Loading more…” band with a spinner, for `footer`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` | `ReactNode` | `"Loading more…"` | Text beside the spinner. |

### TableSortIndicator

The header sort chevron, for custom `renderHeader` labels.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `direction` (required) | `"asc" \| "desc" \| null` | — | Current sort of the column. |

### useControllableState

`const [value, setValue] = useControllableState(value, defaultValue, onChange)` gives the table family its controlled-or-uncontrolled state. `tableHeaderLabelClass` and `compareTableValues` are exported too.
