"use client"

import * as React from "react"

import { SortIcon } from "@/components/icons"
import { Button } from "@/registry/base-nova/ui/button"
import { Menu, MenuContent, MenuGroup, MenuLabel, MenuRadioGroup, MenuRadioItem, MenuTrigger } from "@/registry/base-nova/ui/menu"

const options = [
  { value: "newest", label: "Newest first" },
  { value: "oldest", label: "Oldest first" },
  { value: "name", label: "Name A–Z" },
  { value: "size", label: "Largest first" },
]

export default function MenuRadioItems() {
  const [sort, setSort] = React.useState("newest")
  const current = options.find((o) => o.value === sort)
  return (
    <Menu>
      <MenuTrigger render={<Button variant="secondary" />}>
        <SortIcon data-icon="inline-start" />
        {current?.label}
      </MenuTrigger>
      <MenuContent>
        <MenuGroup>
          <MenuLabel>Sort files</MenuLabel>
          <MenuRadioGroup value={sort} onValueChange={(value) => setSort(String(value))}>
            {options.map((o) => (
              <MenuRadioItem key={o.value} value={o.value}>
                {o.label}
              </MenuRadioItem>
            ))}
          </MenuRadioGroup>
        </MenuGroup>
      </MenuContent>
    </Menu>
  )
}
