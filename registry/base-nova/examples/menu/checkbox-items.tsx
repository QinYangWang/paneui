"use client"

import * as React from "react"

import { FilterIcon } from "@/components/icons"
import { Button } from "@/registry/base-nova/ui/button"
import { Menu, MenuCheckboxItem, MenuContent, MenuGroup, MenuLabel, MenuTrigger } from "@/registry/base-nova/ui/menu"

const columns = ["Status", "Assignee", "Due date", "Priority", "Estimate"]

export default function MenuCheckboxItems() {
  const [visible, setVisible] = React.useState<string[]>(["Status", "Assignee", "Due date"])
  return (
    <Menu>
      <MenuTrigger render={<Button variant="secondary" />}>
        <FilterIcon data-icon="inline-start" />
        Columns ({visible.length})
      </MenuTrigger>
      <MenuContent>
        <MenuGroup>
          <MenuLabel>Show columns</MenuLabel>
          {columns.map((column) => (
            <MenuCheckboxItem
              key={column}
              checked={visible.includes(column)}
              onCheckedChange={(checked) =>
                setVisible((prev) => (checked ? [...prev, column] : prev.filter((c) => c !== column)))
              }
            >
              {column}
            </MenuCheckboxItem>
          ))}
        </MenuGroup>
      </MenuContent>
    </Menu>
  )
}
