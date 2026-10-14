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
