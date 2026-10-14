"use client"

import { MenuList, MenuListItem, MenuListSeparator } from "@/registry/base-nova/ui/menu-list"

export default function MenuListPlain() {
  return (
    <div className="frame-xl frame-p-1 w-48 bg-card shadow-raised">
      <MenuList variant="plain" tabIndex={0} aria-label="Sort">
        <MenuListItem value="newest">Newest first</MenuListItem>
        <MenuListItem value="oldest">Oldest first</MenuListItem>
        <MenuListSeparator />
        <MenuListItem value="name">Name A–Z</MenuListItem>
        <MenuListItem value="size" disabled>
          Size (soon)
        </MenuListItem>
      </MenuList>
    </div>
  )
}
