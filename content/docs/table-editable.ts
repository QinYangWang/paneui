import type { ComponentDoc } from "@/lib/doc-types"

export default {
  usage: {
    imports: `import { EditableTable } from "@/components/ui/table-editable"`,
    code: `<EditableTable
  aria-label="Tasks"
  defaultColumns={[{ key: "task", header: "Task", grow: true }]}
  defaultRows={[{ id: "t1", task: "Draft the launch email" }]}
/>`,
  },
  examples: [
    {
      id: "read-only",
      title: "Read Only",
      description: "`readOnly` keeps keyboard navigation but turns off editing, the row and column menus, insert pills and the new-row band.",
    },
    {
      id: "cell-edit",
      title: "Cell Edit Callback",
      description: "Uncontrolled with `defaultRows` / `defaultColumns`; `onCellEdit` reports each committed value. Columns with `type: \"number\"` store numbers.",
    },
    {
      id: "create-row",
      title: "Custom New Rows",
      description: "`createRow` and `createColumn` build what the + pills and menus insert. Here it is also `selectable` with column reordering off.",
    },
  ],
  notes: [
    {
      title: "Keyboard",
      body: "Arrow keys walk the grid. Enter, F2 or just typing edits a cell; Enter / Tab commit and move, Esc cancels, Backspace / Delete clears. On a header, Enter renames and Alt + ← / → moves the column.",
    },
    {
      title: "Related",
      body: "Built on [Table](/docs/table). See also [Table Async](/docs/table-async).",
    },
  ],
  api: [
    {
      name: "EditableTable",
      description: "Spreadsheet-style table on the virtualized Table core. Also passes through these Table props: `aria-label`, `height`, `headerHeight`, `overscan`, `selectable` and the selection props, `resizable`, `minColumnWidth`, `onColumnResize`, `animateLayout`, `emptyState`, `className`.",
      extends: "Table",
      extendsHref: "/docs/table",
      props: [
        { name: "rows", type: "readonly EditableRow[]", description: "Controlled rows." },
        { name: "defaultRows", type: "readonly EditableRow[]", default: "[]", description: "Initial rows when uncontrolled." },
        { name: "onRowsChange", type: "(rows: EditableRow[]) => void", description: "Called after any edit, insert or delete." },
        { name: "columns", type: "readonly EditableColumn[]", description: "Controlled columns." },
        { name: "defaultColumns", type: "readonly EditableColumn[]", default: "[]", description: "Initial columns when uncontrolled." },
        { name: "onColumnsChange", type: "(columns: EditableColumn[]) => void", description: "Called after a column is added, renamed, moved or deleted." },
        { name: "onCellEdit", type: "(rowId: string, columnKey: string, value: EditableValue) => void", description: "Called when a cell edit commits." },
        { name: "createRow", type: "(columns: readonly EditableColumn[]) => EditableRow", description: "Build a blank row; defaults to an id and empty cells." },
        { name: "createColumn", type: "(columns: readonly EditableColumn[]) => EditableColumn", description: "Build a new column; defaults to “Column N”." },
        { name: "showAddRow", type: "boolean", default: "true", description: "Show the “New row” band under the last row." },
        { name: "readOnly", type: "boolean", default: "false", description: "Disable editing and structure changes." },
        { name: "reorderable", type: "boolean", default: "true", description: "Drag headers to reorder (off when `readOnly`)." },
        { name: "rowHeight", type: "number", default: "40", description: "Row height in px." },
        { name: "ref", type: "Ref<TableHandle>", description: "Same handle as Table." },
      ],
    },
    {
      name: "EditableColumn",
      description: "Type of each entry in `columns`.",
      props: [
        { name: "key", type: "string", required: true, description: "Property read from each row." },
        { name: "header", type: "string", required: true, description: "Header label (renamable)." },
        { name: "width", type: "number", description: "Width in px." },
        { name: "minWidth", type: "number", description: "Resize floor." },
        { name: "grow", type: "boolean", description: "Soak up leftover width." },
        { name: "align", type: `"left" | "center" | "right"`, description: "Cell alignment." },
        { name: "type", type: `"text" | "number"`, default: `"text"`, description: "`number` right-aligns and stores numbers." },
        { name: "placeholder", type: "string", description: "Shown in empty cells." },
      ],
    },
    {
      name: "EditableRow",
      description: "`{ id: string; [key: string]: string | number | null | undefined }`.",
      props: [],
    },
  ],
} satisfies ComponentDoc
