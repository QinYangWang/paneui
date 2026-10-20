# Table Editable

> Lets people edit cells and add or remove rows and columns.

Page: https://paneui.dev/docs/table-editable/

## Installation

```bash
npx shadcn@latest add @paneui/table-editable
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/table-editable.json
```

Packages: `@tanstack/react-virtual`, `motion`, `@base-ui/react`.

Registry items it builds on: `@paneui/theme`, `@paneui/icons`, `@paneui/table`, `@paneui/menu`.

## Usage

```tsx
import { EditableTable } from "@/components/ui/table-editable"
```

```tsx
<EditableTable
  aria-label="Tasks"
  defaultColumns={[{ key: "task", header: "Task", grow: true }]}
  defaultRows={[{ id: "t1", task: "Draft the launch email" }]}
/>
```

## Examples

### Read Only

Use when people should browse the data but not change it.

```tsx
import { EditableTable, type EditableColumn, type EditableRow } from "@/registry/base-nova/ui/table-editable"

const columns: EditableColumn[] = [
  { key: "item", header: "Item", width: 200, grow: true },
  { key: "category", header: "Category", width: 130 },
  { key: "amount", header: "Amount", width: 110, type: "number" },
]

const rows: EditableRow[] = [
  { id: "e1", item: "Flight to Tokyo", category: "Travel", amount: 842 },
  { id: "e2", item: "Hotel, 3 nights", category: "Travel", amount: 510 },
  { id: "e3", item: "Team dinner", category: "Meals", amount: 236.5 },
  { id: "e4", item: "Conference pass", category: "Events", amount: 399 },
]

export default function TableEditableReadOnly() {
  return (
    <div className="w-full max-w-2xl">
      <EditableTable aria-label="Submitted expenses" defaultRows={rows} defaultColumns={columns} readOnly height={240} />
    </div>
  )
}
```

### Cell Edit Callback

Use when you save each edit as it commits instead of holding every row in state.

```tsx
"use client"

import * as React from "react"

import { EditableTable, type EditableColumn, type EditableRow, type EditableValue } from "@/registry/base-nova/ui/table-editable"

const columns: EditableColumn[] = [
  { key: "guest", header: "Guest", width: 180, grow: true, placeholder: "Name" },
  { key: "dietary", header: "Dietary", width: 140, placeholder: "None" },
  { key: "plusOnes", header: "Plus-ones", width: 110, type: "number", placeholder: "0" },
]

const rows: EditableRow[] = [
  { id: "g1", guest: "Mina Park", dietary: "Vegetarian", plusOnes: 1 },
  { id: "g2", guest: "Leo Chen", dietary: "", plusOnes: 0 },
  { id: "g3", guest: "Ava Ruiz", dietary: "No nuts", plusOnes: 2 },
]

export default function TableEditableCellEdit() {
  const [last, setLast] = React.useState<string | null>(null)
  const onCellEdit = (rowId: string, key: string, value: EditableValue) =>
    setLast(`${rowId} · ${key} → ${value === null || value === undefined || value === "" ? "empty" : value}`)
  return (
    <div className="flex w-full max-w-2xl flex-col gap-2">
      <EditableTable aria-label="Guest list" defaultRows={rows} defaultColumns={columns} onCellEdit={onCellEdit} height={260} />
      <p className="px-1 font-mono text-xs text-muted-foreground">{last ?? "Edit a cell — Enter or Tab commits, Esc cancels."}</p>
    </div>
  )
}
```

### Custom New Rows

Use when new rows or columns need ids or defaults from your own data.

```tsx
"use client"

import { EditableTable, type EditableColumn, type EditableRow } from "@/registry/base-nova/ui/table-editable"

const columns: EditableColumn[] = [
  { key: "habit", header: "Habit", width: 200, grow: true, placeholder: "New habit" },
  { key: "target", header: "Per week", width: 110, type: "number" },
  { key: "status", header: "Status", width: 120 },
]

const rows: EditableRow[] = [
  { id: "h1", habit: "Run", target: 3, status: "Active" },
  { id: "h2", habit: "Read before bed", target: 5, status: "Active" },
]

let nextId = 3

export default function TableEditableCreateRow() {
  return (
    <div className="w-full max-w-2xl">
      <EditableTable
        aria-label="Habits"
        defaultRows={rows}
        defaultColumns={columns}
        createRow={() => ({ id: `h${nextId++}`, habit: "", target: 1, status: "Active" })}
        createColumn={(cols) => ({ key: `note${cols.length}`, header: "Notes", width: 160, placeholder: "—" })}
        selectable
        reorderable={false}
        height={260}
      />
    </div>
  )
}
```

## Keyboard

Arrow keys walk the grid. Enter, F2 or just typing edits a cell; Enter / Tab commit and move, Esc cancels, Backspace / Delete clears. On a header, Enter renames and Alt + ← / → moves the column.

## Related

Built on [Table](https://paneui.dev/docs/table). See also [Table Async](https://paneui.dev/docs/table-async).

## API Reference

### EditableTable

Editable grid on the virtualized Table core. It also passes `aria-label`, `height`, `headerHeight`, `overscan`, `selectable` and the selection props, `resizable`, `minColumnWidth`, `onColumnResize`, `animateLayout`, `emptyState` and `className` through to Table. Also accepts every prop of [Table](/docs/table).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `rows` | `readonly EditableRow[]` | — | Controlled rows. |
| `defaultRows` | `readonly EditableRow[]` | `[]` | Initial rows when uncontrolled. |
| `onRowsChange` | `(rows: EditableRow[]) => void` | — | Called after any edit, insert or delete. |
| `columns` | `readonly EditableColumn[]` | — | Controlled columns. |
| `defaultColumns` | `readonly EditableColumn[]` | `[]` | Initial columns when uncontrolled. |
| `onColumnsChange` | `(columns: EditableColumn[]) => void` | — | Called after a column is added, renamed, moved or deleted. |
| `onCellEdit` | `(rowId: string, columnKey: string, value: EditableValue) => void` | — | Called when a cell edit commits. |
| `createRow` | `(columns: readonly EditableColumn[]) => EditableRow` | — | Build the row the + pills, menus and new-row band insert; defaults to an id and empty cells. |
| `createColumn` | `(columns: readonly EditableColumn[]) => EditableColumn` | — | Build a new column; defaults to “Column N”. |
| `showAddRow` | `boolean` | `true` | Show the “New row” band under the last row. |
| `readOnly` | `boolean` | `false` | Turn off editing, the row and column menus, the insert pills and the new-row band. Keyboard navigation stays. |
| `reorderable` | `boolean` | `true` | Drag headers to reorder (off when `readOnly`). |
| `rowHeight` | `number` | `40` | Row height in px. |
| `ref` | `Ref<TableHandle>` | — | Same handle as Table. |

### EditableColumn

Type of each entry in `columns`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `key` (required) | `string` | — | Property read from each row. |
| `header` (required) | `string` | — | Header label (renamable). |
| `width` | `number` | — | Width in px. |
| `minWidth` | `number` | — | Resize floor. |
| `grow` | `boolean` | — | Soak up leftover width. |
| `align` | `"left" \| "center" \| "right"` | — | Cell alignment. |
| `type` | `"text" \| "number"` | `"text"` | `number` right-aligns and stores numbers. |
| `placeholder` | `string` | — | Shown in empty cells. |

### EditableRow

`{ id: string; [key: string]: string | number | null | undefined }`.
