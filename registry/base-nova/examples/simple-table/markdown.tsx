import type * as React from "react"

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
 *   | Key   | Action               | Since |
 *   | :---- | :------------------- | ----: |
 *   | `⌘K`  | Opens the `palette`  |   1.2 |
 */
const rows = [
  { key: "⌘K", action: "palette", verb: "Opens the", since: "1.2" },
  { key: "⌘/", action: "sidebar", verb: "Toggles the", since: "1.4" },
  { key: "⌘.", action: "outline", verb: "Shows the", since: "2.0" },
]

export default function SimpleTableMarkdown() {
  const { table: Table, thead: Thead, tbody: Tbody, tr: Tr, th: Th, td: Td } = mdxTableComponents
  return (
    <Table>
      <Thead>
        <Tr>
          <Th align="left">Key</Th>
          <Th align="left">Action</Th>
          <Th align="right">Since</Th>
        </Tr>
      </Thead>
      <Tbody>
        {rows.map((r) => (
          <Tr key={r.key}>
            <Td align="left">
              <code>{r.key}</code>
            </Td>
            <Td align="left">
              {r.verb} <code>{r.action}</code>
            </Td>
            <Td align="right">{r.since}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  )
}
