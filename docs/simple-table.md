# Simple Table

> A plain table for reference content like props and tokens.

Page: https://paneui.dev/docs/simple-table/

## Installation

```bash
npx shadcn@latest add @paneui/simple-table
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/simple-table.json
```

Registry items it builds on: `@paneui/theme`.

## Usage

```tsx
import {
  SimpleTable,
  SimpleTableBody,
  SimpleTableCell,
  SimpleTableHead,
  SimpleTableHeader,
  SimpleTableRow,
} from "@/components/ui/simple-table"
```

```tsx
<SimpleTable>
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
</SimpleTable>
```

## Composition

```text
SimpleTable
├── SimpleTableHeader
│   └── SimpleTableRow
│       └── SimpleTableHead
└── SimpleTableBody
    └── SimpleTableRow
        └── SimpleTableCell   variant
```

## Examples

### Numbers

```tsx
import {
  SimpleTable,
  SimpleTableBody,
  SimpleTableCell,
  SimpleTableHead,
  SimpleTableHeader,
  SimpleTableRow,
} from "@/registry/base-nova/ui/simple-table"

const sizes = [
  { cls: "text-ui-xs", px: "11px", use: "Meta text and counts" },
  { cls: "text-ui-sm", px: "12px", use: "Captions and badges" },
  { cls: "text-ui", px: "13px", use: "Controls and menus" },
  { cls: "text-ui-lg", px: "14px", use: "Card titles" },
]

export default function SimpleTableNumbers() {
  return (
    <SimpleTable>
      <SimpleTableHeader>
        <SimpleTableRow>
          <SimpleTableHead>Class</SimpleTableHead>
          <SimpleTableHead>Size</SimpleTableHead>
          <SimpleTableHead>Use for</SimpleTableHead>
        </SimpleTableRow>
      </SimpleTableHeader>
      <SimpleTableBody>
        {sizes.map((s) => (
          <SimpleTableRow key={s.cls}>
            <SimpleTableCell variant="code">{s.cls}</SimpleTableCell>
            <SimpleTableCell variant="numeric">{s.px}</SimpleTableCell>
            <SimpleTableCell>{s.use}</SimpleTableCell>
          </SimpleTableRow>
        ))}
      </SimpleTableBody>
    </SimpleTable>
  )
}
```

### Comparisons

Short values across many columns fit a reading column without scrolling.

```tsx
import {
  SimpleTable,
  SimpleTableBody,
  SimpleTableCell,
  SimpleTableHead,
  SimpleTableHeader,
  SimpleTableRow,
} from "@/registry/base-nova/ui/simple-table"

const plans = [
  { name: "Free", price: "$0", seats: "1", storage: "5 GB", sites: "3", support: "Community" },
  { name: "Plus", price: "$11 USD / mo", seats: "5", storage: "100 GB", sites: "Unlimited", support: "Email" },
  { name: "Team", price: "$29 USD / mo", seats: "20", storage: "1 TB", sites: "Unlimited", support: "Priority" },
]

export default function SimpleTableComparison() {
  return (
    <SimpleTable containerClassName="w-full max-w-2xl">
      <SimpleTableHeader>
        <SimpleTableRow>
          <SimpleTableHead>Plan</SimpleTableHead>
          <SimpleTableHead>Price</SimpleTableHead>
          <SimpleTableHead align="right">Seats</SimpleTableHead>
          <SimpleTableHead>Storage</SimpleTableHead>
          <SimpleTableHead>Sites</SimpleTableHead>
          <SimpleTableHead>Support</SimpleTableHead>
        </SimpleTableRow>
      </SimpleTableHeader>
      <SimpleTableBody>
        {plans.map((p) => (
          <SimpleTableRow key={p.name}>
            <SimpleTableCell>{p.name}</SimpleTableCell>
            <SimpleTableCell>{p.price}</SimpleTableCell>
            <SimpleTableCell variant="numeric" align="right">
              {p.seats}
            </SimpleTableCell>
            <SimpleTableCell>{p.storage}</SimpleTableCell>
            <SimpleTableCell>{p.sites}</SimpleTableCell>
            <SimpleTableCell>{p.support}</SimpleTableCell>
          </SimpleTableRow>
        ))}
      </SimpleTableBody>
    </SimpleTable>
  )
}
```

### Markdown Tables

Map the table elements in your MDX components so GFM tables render as SimpleTable.

```tsx
import * as React from "react"

import {
  SimpleTable,
  SimpleTableBody,
  SimpleTableCell,
  SimpleTableHead,
  SimpleTableHeader,
  SimpleTableRow,
} from "@/registry/base-nova/ui/simple-table"

/** Pass this to your MDX provider (or `components` on an MDX page). GFM tables then render as SimpleTable. */
const mdxTableComponents = {
  table: SimpleTable,
  thead: SimpleTableHeader,
  tbody: SimpleTableBody,
  tr: SimpleTableRow,
  th: SimpleTableHead,
  td: SimpleTableCell,
} satisfies Record<string, React.ElementType>

/*
 * What MDX writes for this table:
 *
 *   | Option        | Default |                                          Values |
 *   | :------------ | :-----: | :---------------------------------------------- |
 *   | `description` |         | Meta description and home lede                  |
 *   | `accent`      | `blue`  | `blue`, `neutral`, `green`, `orange`, `rose` or `violet` |
 *   | `editLink`    |         | Adds "Edit this page"                           |
 */
const accents = ["blue", "neutral", "green", "orange", "rose"]

export default function SimpleTableMarkdown() {
  const { table: Table, thead: Thead, tbody: Tbody, tr: Tr, th: Th, td: Td } = mdxTableComponents
  return (
    <Table>
      <Thead>
        <Tr>
          <Th align="left">Option</Th>
          <Th align="center">Default</Th>
          <Th align="left">Values</Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr>
          <Td align="left">
            <code>description</code>
          </Td>
          <Td align="center" />
          <Td align="left">Meta description and home lede</Td>
        </Tr>
        <Tr>
          <Td align="left">
            <code>accent</code>
          </Td>
          <Td align="center">
            <code>blue</code>
          </Td>
          <Td align="left">
            {accents.map((a, i) => (
              <React.Fragment key={a}>
                {i > 0 && ", "}
                <code>{a}</code>
              </React.Fragment>
            ))}{" "}
            or <code>violet</code>
          </Td>
        </Tr>
        <Tr>
          <Td align="left">
            <code>editLink</code>
          </Td>
          <Td align="center" />
          <Td align="left">Adds &quot;Edit this page&quot;</Td>
        </Tr>
      </Tbody>
    </Table>
  )
}
```

### RTL

```tsx
import {
  SimpleTable,
  SimpleTableBody,
  SimpleTableCell,
  SimpleTableHead,
  SimpleTableHeader,
  SimpleTableRow,
} from "@/registry/base-nova/ui/simple-table"

const rows = [
  { name: "size", use: "الارتفاع والحشو" },
  { name: "variant", use: "مدى بروز الزر" },
]

export default function SimpleTableRtl() {
  return (
    <div dir="rtl" className="w-full max-w-md">
      <SimpleTable>
        <SimpleTableHeader>
          <SimpleTableRow>
            <SimpleTableHead>الخاصية</SimpleTableHead>
            <SimpleTableHead>الاستخدام</SimpleTableHead>
          </SimpleTableRow>
        </SimpleTableHeader>
        <SimpleTableBody>
          {rows.map((r) => (
            <SimpleTableRow key={r.name}>
              <SimpleTableCell variant="code">{r.name}</SimpleTableCell>
              <SimpleTableCell>{r.use}</SimpleTableCell>
            </SimpleTableRow>
          ))}
        </SimpleTableBody>
      </SimpleTable>
    </div>
  )
}
```

## When to use

For reference content that is read, not worked in: prop tables, token lists, comparisons. For data people sort, select or scroll through, use [Table](https://paneui.dev/docs/table).

## Overflow

Inline code never breaks inside a word. On screens narrower than 40rem, body-text cells keep an 8rem floor, so a table that doesn't fit scrolls sideways instead of squeezing its prose; wider screens drop the floor, so short tables fit a reading column. Empty cells never get one. `cellMinWidth="always"` keeps the floor everywhere, `"none"` removes it, and a `min-w-*` class on the table sets a wider floor for the whole table.

## Inline code and alignment

Bare `<code>` in `default` and `numeric` cells and in headers gets the inline-code chip, inside or outside prose; code with its own `className` keeps it. `align` takes the values Markdown and HTML write: `left` (`:--`), `center` (`:-:`) and `right` (`--:`) map to the start edge, the center and the end edge, so they flip under RTL. `justify` justifies the text and `char` is accepted and falls back to start.

## API Reference

### SimpleTable

Also accepts every prop of `table`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `containerClassName` | `string` | — | Class for the raised, scrolling surface around the table. |
| `cellMinWidth` | `"auto" \| "always" \| "none"` | `"auto"` | Floor for body-text cells: 8rem below 40rem of viewport with `auto`, always with `always`, never with `none`. |

| Data attribute | Description |
| --- | --- |
| `data-cell-min-width` | On the container, the `cellMinWidth` in use. |

### SimpleTableHeader

Also accepts every prop of `thead`.

### SimpleTableBody

Also accepts every prop of `tbody`.

### SimpleTableRow

Also accepts every prop of `tr`.

### SimpleTableHead

Also accepts every prop of `th`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `align` | `"left" \| "center" \| "right" \| "justify" \| "char"` | — | The Markdown or HTML value: `left` maps to start, `center` to center, `right` to end; `justify` and `char` are accepted. Without it, start. |

### SimpleTableCell

Also accepts every prop of `td`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `"default" \| "code" \| "code-muted" \| "type" \| "numeric"` | `"default"` | `code` for names, `code-muted` for defaults, `type` for long type strings, `numeric` for aligned numbers. |
| `align` | `"left" \| "center" \| "right" \| "justify" \| "char"` | — | Same as `SimpleTableHead`. Without it, the cell follows the table. |
