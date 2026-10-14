"use client"

import * as React from "react"
import type { Editor } from "@tiptap/core"
import type { Node as PMNode } from "@tiptap/pm/model"
import { NodeSelection, TextSelection } from "@tiptap/pm/state"

import { CopyIcon, GripVerticalIcon, PlusIcon, TrashIcon } from "@/components/icons"
import { cn } from "@/lib/utils"
import { blockTypes as defaultBlockTypes, type BlockType } from "@/registry/base-nova/blocks/notion-editor/block-types"
import {
  Menu,
  MenuContent,
  MenuGroup,
  MenuItem,
  MenuLabel,
  MenuSeparator,
  MenuShortcut,
  MenuSub,
  MenuSubContent,
  MenuSubTrigger,
  MenuTrigger,
} from "@/registry/base-nova/ui/menu"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/registry/base-nova/ui/tooltip"

type Hovered = { pos: number; top: number; left: number }

/** The top-level block under a viewport y coordinate. */
function blockAt(editor: Editor, y: number) {
  let found: { pos: number; node: PMNode; dom: HTMLElement } | null = null
  editor.state.doc.forEach((node, offset) => {
    if (found) return
    const dom = editor.view.nodeDOM(offset)
    if (!(dom instanceof HTMLElement)) return
    const r = dom.getBoundingClientRect()
    const style = getComputedStyle(dom)
    const mt = parseFloat(style.marginTop) || 0
    const mb = parseFloat(style.marginBottom) || 0
    if (y >= r.top - mt && y <= r.bottom + mb) found = { pos: offset, node, dom }
  })
  return found as { pos: number; node: PMNode; dom: HTMLElement } | null
}

type BlockHandleProps = {
  editor: Editor
  /** "Turn into" targets in the handle menu; `false` hides the submenu. */
  blockTypes?: BlockType[] | false
  className?: string
}

/**
 * Notion's gutter controls: hover a block to get "+" (insert below and open the
 * slash menu) and a grip (drag to reorder, click for delete / duplicate / turn
 * into). Render it inside the same `relative` container as `EditorContent`; it
 * tracks the pointer over that container. Content needs ~3.5rem of left padding.
 */
export function EditorBlockHandle({ editor, blockTypes = defaultBlockTypes, className }: BlockHandleProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = React.useState<Hovered | null>(null)
  const [menuOpen, setMenuOpen] = React.useState(false)
  const [dragging, setDragging] = React.useState(false)
  // read in DOM listeners without re-subscribing (a menu opening fires mouseleave synchronously)
  const busy = React.useRef(false)
  busy.current = menuOpen || dragging

  React.useEffect(() => {
    const container = ref.current?.parentElement
    if (!container) return
    const onMove = (e: MouseEvent) => {
      if (!editor.isEditable || busy.current) return
      if (ref.current?.contains(e.target as globalThis.Node)) return
      const found = blockAt(editor, e.clientY)
      if (!found) return
      const c = container.getBoundingClientRect()
      const r = found.dom.getBoundingClientRect()
      const style = getComputedStyle(found.dom)
      const lineHeight = parseFloat(style.lineHeight)
      const padTop = parseFloat(style.paddingTop) || 0
      const line = Number.isFinite(lineHeight) ? lineHeight : 24
      setHovered({
        pos: found.pos,
        top: r.top - c.top + container.scrollTop + padTop + (line - 24) / 2,
        left: r.left - c.left + container.scrollLeft,
      })
    }
    const hide = () => {
      if (!busy.current) setHovered(null)
    }
    container.addEventListener("mousemove", onMove)
    container.addEventListener("mouseleave", hide)
    editor.view.dom.addEventListener("keydown", hide)
    editor.on("update", hide)
    return () => {
      container.removeEventListener("mousemove", onMove)
      container.removeEventListener("mouseleave", hide)
      editor.view.dom.removeEventListener("keydown", hide)
      editor.off("update", hide)
    }
  }, [editor])

  const node = hovered ? editor.state.doc.nodeAt(hovered.pos) : null

  const insertBelow = () => {
    if (!hovered || !node) return
    if (node.type.name === "paragraph" && node.content.size === 0) {
      editor.chain().focus().setTextSelection(hovered.pos + 1).insertContent("/").run()
    } else {
      const end = hovered.pos + node.nodeSize
      editor
        .chain()
        .insertContentAt(end, { type: "paragraph", content: [{ type: "text", text: "/" }] })
        .setTextSelection(end + 2)
        .focus()
        .run()
    }
    setHovered(null)
  }

  const selectBlock = () => {
    if (!hovered) return
    const { view } = editor
    view.dispatch(view.state.tr.setSelection(NodeSelection.create(view.state.doc, hovered.pos)))
  }

  const onDragStart = (e: React.DragEvent) => {
    if (!hovered || !node) return
    const { view } = editor
    const selection = NodeSelection.create(view.state.doc, hovered.pos)
    view.dispatch(view.state.tr.setSelection(selection))
    view.dragging = { slice: selection.content(), move: true }
    busy.current = true
    e.dataTransfer.effectAllowed = "copyMove"
    e.dataTransfer.setData("text/plain", node.textContent)
    const dom = view.nodeDOM(hovered.pos)
    if (dom instanceof HTMLElement) e.dataTransfer.setDragImage(dom, 0, 0)
    setDragging(true)
  }

  const turnInto = (b: BlockType) => {
    if (!hovered || !node) return
    const inside = node.isTextblock ? hovered.pos + 1 : hovered.pos + 2
    const { view } = editor
    const pos = Math.min(inside, view.state.doc.content.size)
    view.dispatch(view.state.tr.setSelection(TextSelection.near(view.state.doc.resolve(pos))))
    b.apply(editor)
  }

  const duplicate = () => {
    if (!hovered || !node) return
    editor.chain().insertContentAt(hovered.pos + node.nodeSize, node.toJSON()).focus().run()
  }

  const remove = () => {
    if (!hovered || !node) return
    editor.chain().deleteRange({ from: hovered.pos, to: hovered.pos + node.nodeSize }).focus().run()
    setHovered(null)
  }

  const visible = !!hovered && editor.isEditable
  return (
    <div
      ref={ref}
      data-slot="editor-block-handle"
      aria-hidden={!visible}
      className={cn(
        "absolute z-10 flex items-center gap-0.5 transition-opacity duration-150",
        visible ? "opacity-100" : "pointer-events-none opacity-0",
        className
      )}
      style={hovered ? { top: hovered.top, left: hovered.left - 52 } : undefined}
    >
      <Tooltip>
        <TooltipTrigger
          render={
            <button
              type="button"
              aria-label="Insert block below"
              onClick={insertBelow}
              className="inline-flex size-6 cursor-pointer items-center justify-center rounded-md text-muted-foreground/72 transition-colors outline-none hover:bg-secondary hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/50"
            >
              <PlusIcon className="size-4" />
            </button>
          }
        />
        <TooltipContent side="bottom">Click to add below</TooltipContent>
      </Tooltip>
      <Menu
        open={menuOpen}
        onOpenChange={(open) => {
          busy.current = open
          setMenuOpen(open)
          if (open) selectBlock()
        }}
      >
        <MenuTrigger
          render={
            <button
              type="button"
              aria-label="Drag to move, click for block actions"
              draggable
              // Base UI menus open on mousedown, which would cancel the drag: open on click instead.
              onMouseDown={(e: React.MouseEvent & { preventBaseUIHandler?: () => void }) => e.preventBaseUIHandler?.()}
              onClick={(e: React.MouseEvent & { preventBaseUIHandler?: () => void }) => {
                e.preventBaseUIHandler?.()
                busy.current = !menuOpen
                if (!menuOpen) selectBlock()
                setMenuOpen(!menuOpen)
              }}
              onDragStart={onDragStart}
              onDragEnd={() => {
                busy.current = false
                setDragging(false)
                setHovered(null)
              }}
              className="inline-flex h-6 w-5 cursor-grab items-center justify-center rounded-md text-muted-foreground/72 transition-colors outline-none hover:bg-secondary hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/50 active:cursor-grabbing data-popup-open:bg-secondary"
            >
              <GripVerticalIcon className="size-4" />
            </button>
          }
        />
        <MenuContent side="left" align="start" sideOffset={4} className="w-52">
          <MenuGroup>
            <MenuLabel>{node ? labelOf(node) : "Block"}</MenuLabel>
            {blockTypes && node?.isTextblock !== false && node?.type.name !== "codeBlock" && (
              <MenuSub>
                <MenuSubTrigger>Turn into</MenuSubTrigger>
                <MenuSubContent className="w-44">
                  {blockTypes.map((b) => (
                    <MenuItem key={b.id} onClick={() => turnInto(b)}>
                      <b.icon />
                      {b.label}
                    </MenuItem>
                  ))}
                </MenuSubContent>
              </MenuSub>
            )}
            <MenuItem onClick={duplicate}>
              <CopyIcon />
              Duplicate
            </MenuItem>
          </MenuGroup>
          <MenuSeparator />
          <MenuItem variant="destructive" onClick={remove}>
            <TrashIcon />
            Delete
            <MenuShortcut>Del</MenuShortcut>
          </MenuItem>
        </MenuContent>
      </Menu>
    </div>
  )
}

function labelOf(node: PMNode) {
  const names: Record<string, string> = {
    paragraph: "Text",
    heading: `Heading ${node.attrs.level}`,
    bulletList: "Bulleted list",
    orderedList: "Numbered list",
    taskList: "To-do list",
    blockquote: "Quote",
    codeBlock: "Code block",
    horizontalRule: "Divider",
    image: "Image",
    table: "Table",
    details: "Toggle",
    callout: "Callout",
    mdxBlock: "MDX",
  }
  return names[node.type.name] ?? node.type.name.replace(/^\w/, (c) => c.toUpperCase())
}
