"use client"

import * as React from "react"

import { Heading1Icon, ImageIcon, ListTodoIcon, QuoteIcon, TableIcon, TypeIcon } from "@paneui/ui/icons"
import { Input } from "@paneui/ui/components/input"
import {
  MenuList,
  MenuListEmpty,
  MenuListGroup,
  MenuListItem,
  MenuListItemText,
  MenuListLabel,
  MenuListShortcut,
  type MenuListHandle,
} from "@paneui/ui/components/menu-list"

const blocks = [
  { id: "text", title: "Text", description: "Plain paragraph", Icon: TypeIcon },
  { id: "h1", title: "Heading 1", description: "Big section heading", Icon: Heading1Icon, hint: "#" },
  { id: "todo", title: "To-do list", description: "Track tasks", Icon: ListTodoIcon, hint: "[]" },
  { id: "quote", title: "Quote", description: "Capture a quote", Icon: QuoteIcon, hint: ">" },
  { id: "image", title: "Image", description: "Upload or embed", Icon: ImageIcon },
  { id: "table", title: "Table", description: "Rows and columns", Icon: TableIcon },
]

export default function MenuListDemo() {
  const list = React.useRef<MenuListHandle>(null)
  const [query, setQuery] = React.useState("")
  const [picked, setPicked] = React.useState<string | null>(null)
  const items = blocks.filter((b) => b.title.toLowerCase().includes(query.toLowerCase()))
  return (
    <div className="flex w-72 flex-col gap-2">
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => list.current?.onKeyDown(e) && e.preventDefault()}
        placeholder="Filter blocks, then ↑ ↓ ↵"
        aria-label="Filter blocks"
      />
      <MenuList ref={list} aria-label="Blocks">
        <MenuListGroup>
          <MenuListLabel>Blocks</MenuListLabel>
          {items.map(({ id, title, description, Icon, hint }) => (
            <MenuListItem key={id} value={id} onSelect={() => setPicked(title)}>
              <Icon />
              <MenuListItemText title={title} description={description} />
              {hint && <MenuListShortcut>{hint}</MenuListShortcut>}
            </MenuListItem>
          ))}
        </MenuListGroup>
        {items.length === 0 && <MenuListEmpty>No blocks</MenuListEmpty>}
      </MenuList>
      <p className="text-xs text-muted-foreground">{picked ? `Picked: ${picked}` : "Focus stays in the input."}</p>
    </div>
  )
}
