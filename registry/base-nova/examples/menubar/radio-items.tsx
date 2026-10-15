"use client"

import * as React from "react"

import {
  Menubar,
  MenubarContent,
  MenubarGroup,
  MenubarLabel,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarTrigger,
} from "@/registry/base-nova/ui/menubar"

export default function MenubarRadioItems() {
  const [sort, setSort] = React.useState("modified")
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>Sort</MenubarTrigger>
        <MenubarContent>
          <MenubarGroup>
            <MenubarLabel>Sort by</MenubarLabel>
            <MenubarRadioGroup value={sort} onValueChange={setSort}>
              <MenubarRadioItem value="name">Name</MenubarRadioItem>
              <MenubarRadioItem value="modified">Date modified</MenubarRadioItem>
              <MenubarRadioItem value="size">Size</MenubarRadioItem>
            </MenubarRadioGroup>
          </MenubarGroup>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}
