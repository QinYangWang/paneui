"use client"

import { SparklesIcon } from "@paneui/ui/icons"
import { NotionEditor } from "@paneui/ui/blocks/notion-editor/notion-editor"
import { defaultSlashItems, type SlashItem } from "@paneui/ui/blocks/notion-editor/slash-command"

const items: SlashItem[] = [
  {
    id: "summary",
    title: "Summary callout",
    description: "A TL;DR box at the top",
    group: "Custom",
    icon: <SparklesIcon className="size-4 text-muted-foreground" />,
    keywords: ["tldr", "summary"],
    command: ({ editor, range }) =>
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .insertContent({ type: "callout", attrs: { type: "note", icon: "📝" }, content: [{ type: "paragraph", content: [{ type: "text", text: "TL;DR: " }] }] })
        .run(),
  },
  ...defaultSlashItems,
]

export default function NotionEditorCustomSlashItems() {
  return <NotionEditor slashItems={items} placeholder="Type '/' and pick “Summary callout”…" className="h-64 w-full max-w-2xl" contentClassName="py-6" />
}
