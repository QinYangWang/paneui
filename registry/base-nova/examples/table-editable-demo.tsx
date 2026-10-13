"use client"

import * as React from "react"

import { EditableTable, type EditableColumn, type EditableRow } from "@/registry/base-nova/ui/table-editable"

const initialColumns: EditableColumn[] = [
  { key: "task", header: "Task", width: 220, grow: true, placeholder: "Untitled task" },
  { key: "owner", header: "Owner", width: 130, placeholder: "Unassigned" },
  { key: "due", header: "Due", width: 110, placeholder: "—" },
  { key: "hours", header: "Hours", width: 90, type: "number", placeholder: "0" },
]

const initialRows: EditableRow[] = [
  { id: "t1", task: "Freeze the pricing page copy", owner: "Mina", due: "Oct 15", hours: 3 },
  { id: "t2", task: "Record the onboarding walkthrough", owner: "Kenji", due: "Oct 16", hours: 5 },
  { id: "t3", task: "Load-test checkout at 2× traffic", owner: "Priya", due: "Oct 17", hours: 8 },
  { id: "t4", task: "Draft the launch email", owner: "Leo", due: "Oct 18", hours: 2 },
  { id: "t5", task: "Swap in the new App Store screenshots", owner: "", due: "Oct 20", hours: 1.5 },
  { id: "t6", task: "Go / no-go review", owner: "Mina", due: "Oct 21", hours: 1 },
]

export default function TableEditableDemo() {
  const [rows, setRows] = React.useState(initialRows)
  const [columns, setColumns] = React.useState(initialColumns)
  const hours = rows.reduce((sum, r) => sum + (typeof r.hours === "number" ? r.hours : 0), 0)

  return (
    <div className="flex w-full max-w-3xl flex-col gap-3">
      <div className="flex items-center justify-between px-1 text-sm text-muted-foreground">
        <span>
          <span className="font-medium text-foreground">Launch checklist</span> · double-click or type to edit
        </span>
        <span className="tabular-nums">
          {rows.length} tasks · {hours} h
        </span>
      </div>
      <EditableTable
        aria-label="Launch checklist"
        rows={rows}
        onRowsChange={setRows}
        columns={columns}
        onColumnsChange={setColumns}
        height={360}
      />
    </div>
  )
}
