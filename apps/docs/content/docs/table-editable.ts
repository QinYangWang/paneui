import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: {"en": "Lets people edit cells and add or remove rows and columns.", "zh": "编辑表格内容与结构。"},
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
      title: { en: "Read Only", zh: "只读" },
      description: { en: "Use when people should browse the data but not change it.", zh: "适用于只允许浏览的数据。" },
    },
    {
      id: "cell-edit",
      title: { en: "Cell Edit Callback", zh: "单元格编辑回调" },
      description: { en: "Use when you save each edit as it commits instead of holding every row in state.", zh: "适用于每次修改后立即保存的场景。" },
    },
    {
      id: "create-row",
      title: { en: "Custom New Rows", zh: "自定义新行" },
      description: { en: "Use when new rows or columns need ids or defaults from your own data.", zh: "适用于新增数据需要自定义标识或默认值的场景。" },
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
      description: "Editable grid on the virtualized Table core. It also passes `aria-label`, `height`, `headerHeight`, `overscan`, `selectable` and the selection props, `resizable`, `minColumnWidth`, `onColumnResize`, `animateLayout`, `emptyState` and `className` through to Table.",
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
        { name: "createRow", type: "(columns: readonly EditableColumn[]) => EditableRow", description: "Build the row the + pills, menus and new-row band insert; defaults to an id and empty cells." },
        { name: "createColumn", type: "(columns: readonly EditableColumn[]) => EditableColumn", description: "Build a new column; defaults to “Column N”." },
        { name: "showAddRow", type: "boolean", default: "true", description: "Show the “New row” band under the last row." },
        { name: "readOnly", type: "boolean", default: "false", description: "Turn off editing, the row and column menus, the insert pills and the new-row band. Keyboard navigation stays." },
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
