"use client"

import * as React from "react"

import { BoldIcon, ChevronDownIcon, CodeIcon, ItalicIcon, LinkIcon, StrikethroughIcon, UnderlineIcon } from "@/components/icons"
import { Menu, MenuContent, MenuItem, MenuTrigger } from "@/registry/base-nova/ui/menu"
import { Toolbar, ToolbarButton, ToolbarSeparator, ToolbarToggle } from "@/registry/base-nova/ui/toolbar"

const marks = [
  { id: "bold", label: "Bold", Icon: BoldIcon },
  { id: "italic", label: "Italic", Icon: ItalicIcon },
  { id: "underline", label: "Underline", Icon: UnderlineIcon },
  { id: "strike", label: "Strikethrough", Icon: StrikethroughIcon },
  { id: "code", label: "Code", Icon: CodeIcon },
]

export default function ToolbarDemo() {
  const [active, setActive] = React.useState<string[]>(["bold"])
  const [block, setBlock] = React.useState("Text")
  return (
    <Toolbar variant="floating" aria-label="Format">
      <Menu>
        <MenuTrigger render={<ToolbarButton size="label" />}>
          {block}
          <ChevronDownIcon className="size-3 opacity-60" />
        </MenuTrigger>
        <MenuContent className="w-40">
          {["Text", "Heading 1", "Heading 2", "Quote"].map((b) => (
            <MenuItem key={b} onClick={() => setBlock(b)}>
              {b}
            </MenuItem>
          ))}
        </MenuContent>
      </Menu>
      <ToolbarSeparator />
      {marks.map(({ id, label, Icon }) => (
        <ToolbarToggle
          key={id}
          aria-label={label}
          pressed={active.includes(id)}
          onPressedChange={(on) => setActive((a) => (on ? [...a, id] : a.filter((x) => x !== id)))}
        >
          <Icon />
        </ToolbarToggle>
      ))}
      <ToolbarSeparator />
      <ToolbarButton aria-label="Link">
        <LinkIcon />
      </ToolbarButton>
    </Toolbar>
  )
}
