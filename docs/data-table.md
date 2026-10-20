# Data Table

> Browses, filters and acts on a set of rows.

Page: https://paneui.dev/docs/data-table/

## Installation

```bash
npx shadcn@latest add @paneui/data-table
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/data-table.json
```

Packages: `motion`.

Registry items it builds on: `@paneui/theme`, `@paneui/icons`, `@paneui/button`, `@paneui/empty-state`, `@paneui/input`, `@paneui/menu`, `@paneui/pagination`, `@paneui/table`.

## Usage

```tsx
import { DataTable, DataTableRowActions, type DataTableColumn } from "@/components/ui/data-table"
```

```tsx
<DataTable
  aria-label="Customers"
  data={customers}
  columns={columns}
  getRowId={(c) => c.id}
  filters={[{ key: "status", label: "Status", options: [{ value: "active", label: "Active" }] }]}
  selectable
  bulkActions={(rows, clear) => <Button size="sm" onClick={clear}>Export {rows.length}</Button>}
  onRowClick={({ row }) => open(row)}
/>
```

## Examples

### Empty State

```tsx
"use client"

import { PlusIcon, UsersIcon } from "@/components/icons"
import { Button } from "@/registry/base-nova/ui/button"
import { DataTable } from "@/registry/base-nova/ui/data-table"
import { EmptyState, EmptyStateActions, EmptyStateDescription, EmptyStateIcon, EmptyStateTitle } from "@/registry/base-nova/ui/empty-state"

type Member = { id: string; name: string; role: string }

export default function DataTableEmpty() {
  return (
    <div className="w-full">
      <DataTable<Member>
        aria-label="Members"
        data={[]}
        columns={[
          { key: "name", header: "Name", grow: true },
          { key: "role", header: "Role", width: 140 },
        ]}
        getRowId={(r) => r.id}
        noun="members"
        emptyState={
          <EmptyState size="sm">
            <EmptyStateIcon>
              <UsersIcon />
            </EmptyStateIcon>
            <EmptyStateTitle>No members yet</EmptyStateTitle>
            <EmptyStateDescription>Invite your team to start sharing sessions.</EmptyStateDescription>
            <EmptyStateActions>
              <Button size="sm">
                <PlusIcon data-icon="inline-start" />
                Invite
              </Button>
            </EmptyStateActions>
          </EmptyState>
        }
      />
    </div>
  )
}
```

## What it adds to Table

It builds on [Table](https://paneui.dev/docs/table). Columns are Table columns plus `label` and `hideable`, and `toolbar` adds your own controls.

## Data flow

Everything runs on the client: filter → search → sort → page. Selection survives paging. For server-side data, page and filter on the server and render Table directly.

## Narrow containers

The toolbar follows the table's own width, not the window's. Below 40rem the search takes its own row, and when the filter buttons can't share a row with your `toolbar` controls they fold into one Filter menu. Below 28rem the pager switches to its compact form.

## Row actions

Put `DataTableRowActions` with `MenuItem`s in an actions column; clicks inside it don't trigger `onRowClick`.

## API Reference

### DataTable

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `data` (required) | `readonly T[]` | — | All rows. |
| `columns` (required) | `readonly DataTableColumn<T>[]` | — | Table columns plus `label` (menu name) and `hideable`. |
| `getRowId` (required) | `(row: T, index: number) => string` | — | Stable id per row. |
| `searchText` | `((row: T) => string) \| false` | — | Text the search matches. Default: every string / number field. `false` hides search. |
| `searchPlaceholder` | `string` | `"Search…"` | Also its accessible name. |
| `filters` | `DataTableFilter<T>[]` | — | Faceted multi-select filters, each `{ key, label, options, accessor? }`. |
| `defaultSort` | `SortState` | — | Starting sort. |
| `defaultHiddenColumns` | `string[]` | — | Columns hidden at first. |
| `defaultPageSize` | `number` | `10` | Rows per page. |
| `pageSizeOptions` | `number[]` | `[10, 20, 50]` | Rows-per-page choices. |
| `selectable` | `boolean` | `false` | Checkbox column and selection bar. |
| `selectedRowIds / onSelectionChange` | `string[] / (ids) => void` | — | Controlled selection. |
| `bulkActions` | `(rows: T[], clear: () => void) => ReactNode` | — | Controls in the selection bar. |
| `toolbar` | `ReactNode` | — | Extra controls at the end of the toolbar. |
| `emptyState` | `ReactNode` | — | Shown when `data` is empty. |
| `noun` | `string` | `"rows"` | Used in the footer and empty copy. |
| `rowHeight` | `number` | `48` | Row height in px. |
| `onRowClick` | `(ctx, event) => void` | — | Row click, e.g. to open a detail drawer. |

### DataTableRowActions

⋯ menu for a row; children are MenuItems.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` | `string` | `"Row actions"` | Accessible name of the trigger. |
