import type { ComponentDoc } from "@/lib/doc-types"

export default {
  usage: {
    imports: `import { Table, type TableColumn } from "@/components/ui/table"`,
    code: `<Table
  aria-label="Invoices"
  data={invoices}
  columns={[
    { key: "client", header: "Client", grow: true },
    { key: "total", header: "Total", align: "right", sortable: true },
  ]}
  getRowId={(row) => row.id}
  height={320}
/>`,
  },
  examples: [
    {
      id: "basic",
      title: "Basic",
      description: "Just `data`, `columns` and a `height`. Use `accessor` to derive a value, `cell` to render it, `align` for numbers and `grow` to soak up spare width.",
    },
    {
      id: "loading-empty",
      title: "Loading and Empty",
      description: "`loading` with no data shows `skeletonRows` shimmering rows; with no data and not loading, `emptyState` fills the body.",
    },
    {
      id: "row-click",
      title: "Row Click and Density",
      description: "`onRowClick` receives the row context and `rowHeight` / `headerHeight` make it compact. `defaultSort` sets the starting sort.",
    },
    {
      id: "scroll-to-index",
      title: "Scroll to Row",
      description: "Pass a `ref` to get a `TableHandle` and call `scrollToIndex` or `scrollToTop`; only visible rows of the 1,440 are rendered.",
    },
  ],
  notes: [
    {
      title: "Keyboard",
      body: "Sortable headers are buttons (asc → desc → off). With `reorderable`, Alt + ← / → moves the focused column; with `resizable`, focus a column edge and use ← / → (Shift for bigger steps), or double-click it to reset. Shift-click a checkbox to select a range.",
    },
    {
      title: "Related",
      body: "[Table Editable](/docs/table-editable) and [Table Async](/docs/table-async) build on this core.",
    },
  ],
  api: [
    {
      name: "Table",
      description: "Virtualized data table. Renders a `div` tree with `table` / `grid` roles; no other DOM props pass through.",
      props: [
        { name: "data", type: "readonly T[]", required: true, description: "Rows." },
        { name: "columns", type: "readonly TableColumn<T>[]", required: true, description: "Column definitions." },
        { name: "getRowId", type: "(row: T, index: number) => string", description: "Stable id per row; keeps selection and animation correct across sorts. Defaults to the index." },
        { name: "aria-label", type: "string", description: "Accessible name." },
        { name: "role", type: `"table" | "grid"`, default: `"table"`, description: "`grid` for interactive, spreadsheet-style cells." },
        { name: "selectable", type: "boolean", default: "false", description: "Add a checkbox lane; shift-click selects ranges." },
        { name: "selectedRowIds", type: "readonly string[]", description: "Controlled selection." },
        { name: "defaultSelectedRowIds", type: "readonly string[]", description: "Initial selection." },
        { name: "onSelectionChange", type: "(ids: string[]) => void", description: "Called when the selection changes." },
        { name: "sort", type: `{ key: string; direction: "asc" | "desc" } | null`, description: "Controlled sort." },
        { name: "defaultSort", type: `{ key: string; direction: "asc" | "desc" } | null`, default: "null", description: "Initial sort." },
        { name: "onSortChange", type: "(sort: SortState) => void", description: "Called when a header cycles the sort." },
        { name: "resizable", type: "boolean", default: "false", description: "Drag column edges to resize." },
        { name: "minColumnWidth", type: "number", default: "72", description: "Resize floor in px." },
        { name: "onColumnResize", type: "(key: string, width: number) => void", description: "Called after a resize." },
        { name: "reorderable", type: "boolean", default: "false", description: "Drag headers to reorder." },
        { name: "columnOrder", type: "readonly string[]", description: "Controlled column order (keys)." },
        { name: "defaultColumnOrder", type: "readonly string[]", description: "Initial column order." },
        { name: "onColumnOrderChange", type: "(keys: string[]) => void", description: "Called after a reorder." },
        { name: "rowHeight", type: "number", default: "44", description: "Row height in px." },
        { name: "headerHeight", type: "number", default: "40", description: "Header height in px." },
        { name: "height", type: "number", default: "440", description: "Viewport height in px." },
        { name: "overscan", type: "number", default: "8", description: "Rows rendered beyond the viewport." },
        { name: "loading", type: "boolean", default: "false", description: "Skeleton rows when there is no data yet, a loading footer otherwise; pauses `onEndReached`." },
        { name: "skeletonRows", type: "number", description: "Number of skeleton rows while loading." },
        { name: "onEndReached", type: "() => void", description: "Called when the list nears its end." },
        { name: "endReachedThreshold", type: "number", default: "8", description: "How many rows from the end `onEndReached` fires." },
        { name: "footer", type: "ReactNode", description: "A band under the last row (load more, add row, end of list)." },
        { name: "emptyState", type: "ReactNode", default: `"No rows"`, description: "Shown when there are no rows." },
        { name: "renderCell", type: "(ctx: TableCellContext<T> & { content: ReactNode }) => ReactNode", description: "Wrap or replace any cell; `content` is what the table would have rendered." },
        { name: "renderHeader", type: "(ctx: TableHeaderContext<T>) => ReactNode", description: "Replace a header label; spread `labelProps` onto your element." },
        { name: "headerAccessory", type: "(ctx: TableHeaderContext<T>) => ReactNode", description: "Extra content inside a header cell, e.g. a column menu." },
        { name: "gutter", type: "{ width: number; header?: ReactNode; cell: (ctx: TableRowContext<T>) => ReactNode }", description: "Leading lane before the checkbox, e.g. row handles." },
        { name: "onRowClick", type: "(ctx: TableRowContext<T>, event: MouseEvent) => void", description: "Called when a row is clicked." },
        { name: "rowClassName", type: "(ctx: TableRowContext<T>) => string | undefined", description: "Class per row." },
        { name: "animateLayout", type: "boolean", default: "true", description: "Slide rows and columns into new positions on insert, delete, sort and reorder. Off under reduced motion." },
        { name: "className", type: "string", description: "Class for the outer surface." },
        { name: "ref", type: "Ref<TableHandle>", description: "`scrollToIndex(index, { align, behavior })`, `scrollToTop(behavior)` and `element()`." },
      ],
      dataAttributes: [
        { name: "data-selected", description: "On selected rows." },
        { name: "data-row-id", description: "The row id, on each row." },
        { name: "data-col-key", description: "The column key, on header and body cells." },
        { name: "data-dragging", description: "On a header while it is being dragged." },
        { name: "data-resizing", description: "On a resize handle while it is being dragged." },
      ],
    },
    {
      name: "TableColumn",
      description: "Type of each entry in `columns`.",
      props: [
        { name: "key", type: "string", required: true, description: "Stable key; also the property read from the row when there is no `accessor`." },
        { name: "header", type: "ReactNode", required: true, description: "Header label." },
        { name: "width", type: "number", default: "160", description: "Width in px." },
        { name: "minWidth", type: "number", description: "Floor for resizing. Falls back to `minColumnWidth`." },
        { name: "grow", type: "boolean", description: "Soak up leftover width (until resized)." },
        { name: "align", type: `"left" | "center" | "right"`, default: `"left"`, description: "Cell alignment." },
        { name: "sortable", type: "boolean", description: "Make the header sort on click." },
        { name: "resizable", type: "boolean", description: "Set `false` to opt out of resizing." },
        { name: "accessor", type: "(row: T) => unknown", description: "Raw value for the cell, sorting and default rendering." },
        { name: "sortValue", type: "(row: T) => string | number | null | undefined", description: "Value used for sorting when it differs from the accessor." },
        { name: "cell", type: "(row: T, ctx: TableCellContext<T>) => ReactNode", description: "Custom cell content." },
        { name: "className", type: "string", description: "Class for body cells." },
        { name: "headerClassName", type: "string", description: "Class for the header cell." },
      ],
    },
    {
      name: "TableSkeletonRow",
      description: "A placeholder row of shimmering bars, for custom loading states.",
      props: [
        { name: "index", type: "number", required: true, description: "Row index; varies the bar widths." },
        { name: "cells", type: "readonly number[]", required: true, description: "Cell widths in px, in display order." },
        { name: "height", type: "number", required: true, description: "Row height in px." },
        { name: "className", type: "string", description: "Class for the row." },
      ],
    },
    {
      name: "TableLoadingFooter",
      description: "Default “Loading more…” band with a spinner, for `footer`.",
      props: [{ name: "label", type: "ReactNode", default: `"Loading more…"`, description: "Text beside the spinner." }],
    },
    {
      name: "TableSortIndicator",
      description: "The header sort chevron, for custom `renderHeader` labels.",
      props: [{ name: "direction", type: `"asc" | "desc" | null`, required: true, description: "Current sort of the column." }],
    },
    {
      name: "useControllableState",
      description: "`const [value, setValue] = useControllableState(value, defaultValue, onChange)`: controlled-or-uncontrolled state used by the table family. Also exported: `tableHeaderLabelClass` and `compareTableValues`.",
      props: [],
    },
  ],
} satisfies ComponentDoc
