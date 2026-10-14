"use client"

import * as React from "react"
import { NodeViewContent, NodeViewWrapper, ReactNodeViewRenderer, type ReactNodeViewProps } from "@tiptap/react"

import { CodeIcon } from "@/components/icons"
import { cn } from "@/lib/utils"
import { Callout, MdxBlock, type CalloutType } from "@/registry/base-nova/blocks/notion-editor/extensions"
import { Menu, MenuContent, MenuGroup, MenuLabel, MenuRadioGroup, MenuRadioItem, MenuTrigger } from "@/registry/base-nova/ui/menu"

const calloutTone: Record<CalloutType, string> = {
  info: "bg-primary/8",
  note: "bg-secondary",
  success: "bg-success/10",
  warning: "bg-warning/12",
  danger: "bg-destructive/10",
}

const calloutIcons: Record<CalloutType, string> = { info: "💡", note: "📝", success: "✅", warning: "⚠️", danger: "🚨" }

function CalloutView({ node, updateAttributes, editor }: ReactNodeViewProps) {
  const type = (node.attrs.type as CalloutType) in calloutTone ? (node.attrs.type as CalloutType) : "info"
  const icon = (node.attrs.icon as string | null) ?? calloutIcons[type]
  return (
    <NodeViewWrapper
      data-type="callout"
      data-callout-type={type}
      className={cn("my-2 flex gap-2 rounded-lg py-2 pr-3 pl-2", calloutTone[type])}
    >
      <Menu>
        <MenuTrigger
          disabled={!editor.isEditable}
          contentEditable={false}
          aria-label="Callout style"
          className="mt-px inline-flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-md text-base leading-none outline-none select-none hover:bg-foreground/6 focus-visible:ring-2 focus-visible:ring-ring/50 disabled:cursor-default disabled:hover:bg-transparent"
        >
          {icon}
        </MenuTrigger>
        <MenuContent className="w-40">
          <MenuGroup>
            <MenuLabel>Callout</MenuLabel>
            <MenuRadioGroup
              value={type}
              onValueChange={(value) => updateAttributes({ type: value, icon: calloutIcons[value as CalloutType] })}
            >
              {(Object.keys(calloutIcons) as CalloutType[]).map((t) => (
                <MenuRadioItem key={t} value={t}>
                  <span aria-hidden>{calloutIcons[t]}</span>
                  <span className="capitalize">{t}</span>
                </MenuRadioItem>
              ))}
            </MenuRadioGroup>
          </MenuGroup>
        </MenuContent>
      </Menu>
      <NodeViewContent className="min-w-0 flex-1 [&>*:first-child]:mt-0 [&>*:last-child]:mb-0" />
    </NodeViewWrapper>
  )
}

function MdxBlockView({ node, updateAttributes, editor, selected }: ReactNodeViewProps) {
  const source = node.attrs.source as string
  const [draft, setDraft] = React.useState(source)
  React.useEffect(() => setDraft(source), [source])
  const rows = Math.max(1, draft.split("\n").length)
  return (
    <NodeViewWrapper
      data-type="mdx-block"
      className={cn(
        "my-2 overflow-hidden rounded-xl bg-code shadow-raised transition-[box-shadow] duration-150",
        selected && "ring-2 ring-ring/50"
      )}
    >
      <div contentEditable={false} className="flex h-7 items-center gap-1.5 border-b border-border px-2.5 text-ui-xs text-muted-foreground select-none">
        <CodeIcon className="size-3.5" />
        <span className="font-medium">MDX</span>
        <span className="text-muted-foreground/72">kept as written</span>
      </div>
      <textarea
        contentEditable={false}
        aria-label="Raw MDX"
        readOnly={!editor.isEditable}
        value={draft}
        rows={rows}
        spellCheck={false}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={() => draft !== source && updateAttributes({ source: draft })}
        onKeyDown={(e) => e.stopPropagation()}
        className="block w-full resize-none bg-transparent px-3 py-2 font-mono text-ui-sm leading-relaxed text-foreground outline-none"
      />
    </NodeViewWrapper>
  )
}

/** Callout and MDX blocks with their React node views. */
export const CalloutWithView = Callout.extend({
  addNodeView() {
    return ReactNodeViewRenderer(CalloutView)
  },
})

export const MdxBlockWithView = MdxBlock.extend({
  addNodeView() {
    return ReactNodeViewRenderer(MdxBlockView, { stopEvent: ({ event }) => event.target instanceof HTMLTextAreaElement })
  },
})
