import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: {"en": "A plain table for reference content like props and tokens.", "zh": "展示属性和主题变量等参考内容。"},
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
    { id: "numbers", title: { en: "Numbers", zh: "数值" },  },
    { id: "comparison", title: { en: "Comparisons", zh: "比较" }, description: { en: "Short values across many columns fit a reading column without scrolling.", zh: "适用于列数较多、单元格内容较短的参考表。" } },
    { id: "markdown", title: { en: "Markdown Tables", zh: "Markdown 表格" }, description: { en: "Map the table elements in your MDX components so GFM tables render as SimpleTable.", zh: "适用于 MDX 中的 Markdown 表格。" } },
    { id: "rtl", title: { en: "RTL", zh: "从右到左" },  },
  ],
  notes: [
    {
      title: "When to use",
      body: "For reference content that is read, not worked in: prop tables, token lists, comparisons. For data people sort, select or scroll through, use [Table](/docs/table).",
    },
    {
      title: "Overflow",
      body: "Inline code never breaks inside a word. On screens narrower than 40rem, body-text cells keep an 8rem floor, so a table that doesn't fit scrolls sideways instead of squeezing its prose; wider screens drop the floor, so short tables fit a reading column. Empty cells never get one. `cellMinWidth=\"always\"` keeps the floor everywhere, `\"none\"` removes it, and a `min-w-*` class on the table sets a wider floor for the whole table.",
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
      props: [
        { name: "containerClassName", type: "string", description: "Class for the raised, scrolling surface around the table." },
        { name: "cellMinWidth", type: `"auto" | "always" | "none"`, default: `"auto"`, description: "Floor for body-text cells: 8rem below 40rem of viewport with `auto`, always with `always`, never with `none`." },
      ],
      dataAttributes: [{ name: "data-cell-min-width", description: "On the container, the `cellMinWidth` in use." }],
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
