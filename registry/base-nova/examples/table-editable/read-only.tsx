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
