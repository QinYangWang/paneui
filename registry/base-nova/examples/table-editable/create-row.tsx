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
