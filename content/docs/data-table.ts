import type { ComponentDoc } from "@/lib/doc-types"

export default {
  usage: {
    imports: `import { DataTable, DataTableRowActions, type DataTableColumn } from "@/components/ui/data-table"`,
    code: `<DataTable
  aria-label="Customers"
  data={customers}
  columns={columns}
  getRowId={(c) => c.id}
  filters={[{ key: "status", label: "Status", options: [{ value: "active", label: "Active" }] }]}
  selectable
  bulkActions={(rows, clear) => <Button size="sm" onClick={clear}>Export {rows.length}</Button>}
  onRowClick={({ row }) => open(row)}
/>`,
  },
  examples: [{ id: "empty", title: "Empty State", description: "`emptyState` shows when `data` is empty. When filters or search match nothing, the table shows its own \"No matching\" state with a Clear filters button." }],
  notes: [
    { title: "What it adds to Table", body: "A toolbar (search, faceted filters with counts, a column visibility menu, your own `toolbar` controls), a selection bar with `bulkActions`, and a footer with the row summary, rows per page and Pagination. Columns are [Table](/docs/table) columns plus `label` and `hideable`." },
    { title: "Data flow", body: "Everything runs on the client: filter → search → sort → page. Selection survives paging. For server-side data, page and filter on the server and render Table directly." },
    { title: "Row actions", body: "Put `DataTableRowActions` with `MenuItem`s in an actions column: it is a ⋯ menu whose clicks don't trigger `onRowClick`." },
  ],
  api: [
    {
      name: "DataTable",
      props: [
        { name: "data", type: "readonly T[]", required: true, description: "All rows." },
        { name: "columns", type: "readonly DataTableColumn<T>[]", required: true, description: "Table columns plus `label` (menu name) and `hideable`." },
        { name: "getRowId", type: "(row: T, index: number) => string", required: true, description: "Stable id per row." },
        { name: "searchText", type: "((row: T) => string) | false", description: "Text the search matches. Default: every string / number field. `false` hides search." },
        { name: "searchPlaceholder", type: "string", default: `"Search…"`, description: "Also its accessible name." },
        { name: "filters", type: "DataTableFilter<T>[]", description: "Faceted multi-select filters: `{ key, label, options, accessor? }`." },
        { name: "defaultSort", type: "SortState", description: "Starting sort." },
        { name: "defaultHiddenColumns", type: "string[]", description: "Columns hidden at first." },
        { name: "defaultPageSize", type: "number", default: "10", description: "Rows per page." },
        { name: "pageSizeOptions", type: "number[]", default: "[10, 20, 50]", description: "Rows-per-page choices." },
        { name: "selectable", type: "boolean", default: "false", description: "Checkbox column and selection bar." },
        { name: "selectedRowIds / onSelectionChange", type: "string[] / (ids) => void", description: "Controlled selection." },
        { name: "bulkActions", type: "(rows: T[], clear: () => void) => ReactNode", description: "Controls in the selection bar." },
        { name: "toolbar", type: "ReactNode", description: "Extra controls at the end of the toolbar." },
        { name: "emptyState", type: "ReactNode", description: "Shown when `data` is empty." },
        { name: "noun", type: "string", default: `"rows"`, description: "Used in the footer and empty copy." },
        { name: "rowHeight", type: "number", default: "48", description: "Row height in px." },
        { name: "onRowClick", type: "(ctx, event) => void", description: "Row click, e.g. to open a detail drawer." },
      ],
    },
    { name: "DataTableRowActions", description: "⋯ menu for a row; children are MenuItems.", props: [{ name: "label", type: "string", default: `"Row actions"`, description: "Accessible name of the trigger." }] },
  ],
} satisfies ComponentDoc
