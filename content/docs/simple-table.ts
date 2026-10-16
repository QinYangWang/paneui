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
    { id: "markdown", title: "Markdown Tables", description: "Map the table elements in your MDX components so GFM tables render as SimpleTable." },
    { id: "rtl", title: "RTL", description: "For right-to-left pages, set `dir=\"rtl\"` on a parent; headers align to the start edge." },
  ],
  notes: [
    {
      title: "When to use",
      body: "For reference content that is read, not worked in: prop tables, token lists, comparisons. For data people sort, select or scroll through, use [Table](/docs/table).",
    },
    {
      title: "Overflow",
      body: "Inline code never breaks inside a word, and body text keeps a minimum width, so when the columns don't fit the surface scrolls sideways instead of squeezing them. Give the table a `min-w-*` class to set a wider floor.",
    },
    {
      title: "Inline code and alignment",
      body: "Bare `<code>` in `default` and `numeric` cells and in headers gets the inline-code chip, inside or outside prose; code with its own `className` keeps it. `align` takes the values Markdown and HTML write: `left` (`:--`), `center` (`:-:`) and `right` (`--:`) map to the start edge, the center and the end edge, so they flip under RTL. `justify` justifies the text and `char` is accepted and falls back to start.",
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
    {
      name: "SimpleTableHead",
      extends: "th",
      props: [{ name: "align", type: `"left" | "center" | "right" | "justify" | "char"`, description: "The Markdown or HTML value: `left` maps to start, `center` to center, `right` to end; `justify` and `char` are accepted. Without it, start." }],
    },
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
        { name: "align", type: `"left" | "center" | "right" | "justify" | "char"`, description: "Same as `SimpleTableHead`. Without it, the cell follows the table." },
      ],
    },
  ],
} satisfies ComponentDoc
