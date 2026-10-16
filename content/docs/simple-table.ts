import type { ComponentDoc } from "@/lib/doc-types"

export default {
  usage: {
    imports: `import {
  SimpleTable,
  SimpleTableBody,
  SimpleTableCell,
  SimpleTableHead,
  SimpleTableHeader,
  SimpleTableRow,
} from "@/components/ui/simple-table"`,
    code: `<SimpleTable>
  <SimpleTableHeader>
    <SimpleTableRow>
      <SimpleTableHead>Prop</SimpleTableHead>
      <SimpleTableHead>Description</SimpleTableHead>
    </SimpleTableRow>
  </SimpleTableHeader>
  <SimpleTableBody>
    <SimpleTableRow>
      <SimpleTableCell variant="code">size</SimpleTableCell>
      <SimpleTableCell>Height and padding.</SimpleTableCell>
    </SimpleTableRow>
  </SimpleTableBody>
</SimpleTable>`,
  },
  composition: `SimpleTable
├── SimpleTableHeader
│   └── SimpleTableRow
│       └── SimpleTableHead
└── SimpleTableBody
    └── SimpleTableRow
        └── SimpleTableCell   variant`,
  examples: [
    { id: "numbers", title: "Numbers", description: "Use the `numeric` cell for sizes and counts that should line up." },
    { id: "rtl", title: "RTL", description: "For right-to-left pages, set `dir=\"rtl\"` on a parent; headers align to the start edge." },
  ],
  notes: [
    {
      title: "When to use",
      body: "For reference content that is read, not worked in: prop tables, token lists, comparisons. For data people sort, select or scroll through, use [Table](/docs/table).",
    },
    {
      title: "Overflow",
      body: "The surface scrolls sideways when the columns don't fit. Give the table a `min-w-*` class to keep columns readable on phones.",
    },
  ],
  api: [
    {
      name: "SimpleTable",
      extends: "table",
      props: [{ name: "containerClassName", type: "string", description: "Class for the raised, scrolling surface around the table." }],
    },
    { name: "SimpleTableHeader", extends: "thead", props: [] },
    { name: "SimpleTableBody", extends: "tbody", props: [] },
    { name: "SimpleTableRow", extends: "tr", props: [] },
    { name: "SimpleTableHead", extends: "th", props: [] },
    {
      name: "SimpleTableCell",
      extends: "td",
      props: [
        {
          name: "variant",
          type: `"default" | "code" | "code-muted" | "type" | "numeric"`,
          default: `"default"`,
          description: "`code` for names, `code-muted` for defaults, `type` for long type strings, `numeric` for aligned numbers.",
        },
      ],
    },
  ],
} satisfies ComponentDoc
