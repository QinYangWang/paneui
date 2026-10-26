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
      body: { en: "Arrow keys walk the grid. Enter, F2 or just typing edits a cell; Enter / Tab commit and move, Esc cancels, Backspace / Delete clears. On a header, Enter renames and Alt + ← / → moves the column.", zh: "方向键在网格中移动。Enter、F2 或直接输入可编辑单元格；Enter / Tab 提交并移动，Esc 取消，Backspace / Delete 清空。在表头上，Enter 重命名，Alt + ← / → 移动列。" },
    },
    {
      title: "Related",
      body: { en: "Built on [Table](/docs/table). See also [Table Async](/docs/table-async).", zh: "基于 [Table](/docs/table) 构建。另见 [Table Async](/docs/table-async)。" },
    },
  ],
  api: [
    {
      name: "EditableTable",
      description: { en: "Editable grid on the virtualized Table core. It also passes `aria-label`, `height`, `headerHeight`, `overscan`, `selectable` and the selection props, `resizable`, `minColumnWidth`, `onColumnResize`, `animateLayout`, `emptyState` and `className` through to Table.", zh: "基于虚拟化 Table 核心的可编辑网格。它还会将 `aria-label`、`height`、`headerHeight`、`overscan`、`selectable` 及选择相关属性、`resizable`、`minColumnWidth`、`onColumnResize`、`animateLayout`、`emptyState` 和 `className` 透传给 Table。" },
      extends: "Table",
      extendsHref: "/docs/table",
      props: [
        { name: "rows", type: "readonly EditableRow[]", description: { en: "Controlled rows.", zh: "受控的行。" } },
        { name: "defaultRows", type: "readonly EditableRow[]", default: "[]", description: { en: "Initial rows when uncontrolled.", zh: "非受控时的初始行。" } },
        { name: "onRowsChange", type: "(rows: EditableRow[]) => void", description: { en: "Called after any edit, insert or delete.", zh: "任何编辑、插入或删除后调用。" } },
        { name: "columns", type: "readonly EditableColumn[]", description: { en: "Controlled columns.", zh: "受控的列。" } },
        { name: "defaultColumns", type: "readonly EditableColumn[]", default: "[]", description: { en: "Initial columns when uncontrolled.", zh: "非受控时的初始列。" } },
        { name: "onColumnsChange", type: "(columns: EditableColumn[]) => void", description: { en: "Called after a column is added, renamed, moved or deleted.", zh: "添加、重命名、移动或删除列后调用。" } },
        { name: "onCellEdit", type: "(rowId: string, columnKey: string, value: EditableValue) => void", description: { en: "Called when a cell edit commits.", zh: "单元格编辑提交时调用。" } },
        { name: "createRow", type: "(columns: readonly EditableColumn[]) => EditableRow", description: { en: "Build the row the + pills, menus and new-row band insert; defaults to an id and empty cells.", zh: "构造 + 胶囊、菜单和新建行带插入的行；默认为一个 id 和空单元格。" } },
        { name: "createColumn", type: "(columns: readonly EditableColumn[]) => EditableColumn", description: { en: "Build a new column; defaults to “Column N”.", zh: "构造新列；默认为“Column N”。" } },
        { name: "showAddRow", type: "boolean", default: "true", description: { en: "Show the “New row” band under the last row.", zh: "在最后一行下方显示“New row”带。" } },
        { name: "readOnly", type: "boolean", default: "false", description: { en: "Turn off editing, the row and column menus, the insert pills and the new-row band. Keyboard navigation stays.", zh: "关闭编辑、行和列菜单、插入标记和新行条。键盘导航保留。" } },
        { name: "reorderable", type: "boolean", default: "true", description: { en: "Drag headers to reorder (off when `readOnly`).", zh: "拖动表头重新排序（`readOnly` 时关闭）。" } },
        { name: "rowHeight", type: "number", default: "40", description: { en: "Row height in px.", zh: "行高，单位为 px。" } },
        { name: "ref", type: "Ref<TableHandle>", description: { en: "Same handle as Table.", zh: "与 Table 相同的 handle。" } },
      ],
    },
    {
      name: "EditableColumn",
      description: { en: "Type of each entry in `columns`.", zh: "`columns` 中每项的类型。" },
      props: [
        { name: "key", type: "string", required: true, description: { en: "Property read from each row.", zh: "从每一行读取的属性。" } },
        { name: "header", type: "string", required: true, description: { en: "Header label (renamable).", zh: "表头标签（可重命名）。" } },
        { name: "width", type: "number", description: { en: "Width in px.", zh: "宽度，单位为 px。" } },
        { name: "minWidth", type: "number", description: { en: "Resize floor.", zh: "调整大小的下限。" } },
        { name: "grow", type: "boolean", description: { en: "Soak up leftover width.", zh: "占满剩余宽度。" } },
        { name: "align", type: `"left" | "center" | "right"`, description: { en: "Cell alignment.", zh: "单元格对齐方式。" } },
        { name: "type", type: `"text" | "number"`, default: `"text"`, description: { en: "`number` right-aligns and stores numbers.", zh: "`number` 右对齐并存储数字。" } },
        { name: "placeholder", type: "string", description: { en: "Shown in empty cells.", zh: "在空单元格中显示。" } },
      ],
    },
    {
      name: "EditableRow",
      description: { en: "`{ id: string; [key: string]: string | number | null | undefined }`.", zh: "`{ id: string; [key: string]: string | number | null | undefined }`。" },
      props: [],
    },
  ],
} satisfies ComponentDoc
