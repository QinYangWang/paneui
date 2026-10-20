import * as React from "react"

import {
  SimpleTable,
  SimpleTableBody,
  SimpleTableCell,
  SimpleTableHead,
  SimpleTableHeader,
  SimpleTableRow,
} from "@paneui/ui/components/simple-table"

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
