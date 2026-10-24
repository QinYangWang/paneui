"use client"

import { localeLabels, type LocaleLabels } from "@paneui/ui/components/locale-provider"

import * as React from "react"
import { Extension, type Editor, type Range } from "@tiptap/core"
import { PluginKey } from "@tiptap/pm/state"
import { Suggestion } from "@tiptap/suggestion"

import {
  CalloutIcon,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  ImageIcon,
  ListCollapseIcon,
  ListIcon,
  ListOrderedIcon,
  ListTodoIcon,
  MinusIcon,
  QuoteIcon,
  SquareCodeIcon,
  TableIcon,
  TypeIcon,
} from "@paneui/ui/icons"
import { fileToDataUrl, type ImageUploader } from "@paneui/ui/blocks/notion-editor/extensions"
import {
  filterSuggestionItems,
  suggestionRenderer,
  type SuggestionMenuItem,
} from "@paneui/ui/blocks/notion-editor/suggestion-menu"

export type SlashItem = SuggestionMenuItem & {
  keywords?: string[]
  command: (props: { editor: Editor; range: Range }) => void
}

/** Opens a file picker and resolves with the chosen image (or null). */
export function pickFile(accept: string) {
  return new Promise<File | null>((resolve) => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = accept
    input.onchange = () => resolve(input.files?.[0] ?? null)
    input.oncancel = () => resolve(null)
    input.click()
  })
}

function uploaderOf(editor: Editor): ImageUploader {
  const storage = (editor.storage as unknown as Record<string, { upload?: ImageUploader } | undefined>).imageUpload
  return storage?.upload ?? fileToDataUrl
}

/** Inserts an image block from a picked file, through the editor's ImageUpload uploader. */
export async function insertImageFromFile(editor: Editor) {
  const file = await pickFile("image/*")
  if (!file) return
  const src = await uploaderOf(editor)(file)
  editor.chain().focus().setImage({ src, alt: file.name }).run()
}

const icon = (I: React.ComponentType<{ className?: string }>) => <I className="size-4 text-muted-foreground" />

/** The block menu of the block editor. Pass your own list (or extend this one) via `slashItems`. */
export function getDefaultSlashItems(l10n: LocaleLabels = localeLabels.en): SlashItem[] {
  return ([
  {
    id: "text",
    title: l10n.text,
    description: l10n.plainParagraph,
    group: l10n.basicBlocks,
    icon: icon(TypeIcon),
    keywords: ["paragraph", "p"],
    command: ({ editor, range }) => editor.chain().focus().deleteRange(range).setParagraph().run(),
  },
  {
    id: "heading-1",
    title: l10n.heading1,
    description: l10n.bigSectionHeading,
    group: l10n.basicBlocks,
    icon: icon(Heading1Icon),
    hint: "#",
    keywords: ["h1", "title"],
    command: ({ editor, range }) => editor.chain().focus().deleteRange(range).setHeading({ level: 1 }).run(),
  },
  {
    id: "heading-2",
    title: l10n.heading2,
    description: l10n.mediumSectionHeading,
    group: l10n.basicBlocks,
    icon: icon(Heading2Icon),
    hint: "##",
    keywords: ["h2", "subtitle"],
    command: ({ editor, range }) => editor.chain().focus().deleteRange(range).setHeading({ level: 2 }).run(),
  },
  {
    id: "heading-3",
    title: l10n.heading3,
    description: l10n.smallSectionHeading,
    group: l10n.basicBlocks,
    icon: icon(Heading3Icon),
    hint: "###",
    keywords: ["h3"],
    command: ({ editor, range }) => editor.chain().focus().deleteRange(range).setHeading({ level: 3 }).run(),
  },
  {
    id: "bullet-list",
    title: l10n.bulletedList,
    description: l10n.simpleBulletedList,
    group: l10n.basicBlocks,
    icon: icon(ListIcon),
    hint: "-",
    keywords: ["ul", "unordered"],
    command: ({ editor, range }) => editor.chain().focus().deleteRange(range).toggleBulletList().run(),
  },
  {
    id: "numbered-list",
    title: l10n.numberedList,
    description: l10n.simpleNumberedList,
    group: l10n.basicBlocks,
    icon: icon(ListOrderedIcon),
    hint: "1.",
    keywords: ["ol", "ordered"],
    command: ({ editor, range }) => editor.chain().focus().deleteRange(range).toggleOrderedList().run(),
  },
  {
    id: "todo-list",
    title: l10n.todoList,
    description: l10n.trackTasksWithCheckboxes,
    group: l10n.basicBlocks,
    icon: icon(ListTodoIcon),
    hint: "[]",
    keywords: ["task", "checkbox", "check"],
    command: ({ editor, range }) => editor.chain().focus().deleteRange(range).toggleTaskList().run(),
  },
  {
    id: "toggle",
    title: l10n.toggle,
    description: l10n.collapsibleSection,
    group: l10n.basicBlocks,
    icon: icon(ListCollapseIcon),
    keywords: ["details", "collapse", "accordion"],
    command: ({ editor, range }) => editor.chain().focus().deleteRange(range).setDetails().run(),
  },
  {
    id: "quote",
    title: l10n.quote,
    description: l10n.captureAQuote,
    group: l10n.basicBlocks,
    icon: icon(QuoteIcon),
    hint: ">",
    keywords: ["blockquote", "citation"],
    command: ({ editor, range }) => editor.chain().focus().deleteRange(range).toggleBlockquote().run(),
  },
  {
    id: "callout",
    title: l10n.callout,
    description: l10n.makeANoteStandOut,
    group: l10n.basicBlocks,
    icon: icon(CalloutIcon),
    keywords: ["note", "info", "warning", "admonition"],
    command: ({ editor, range }) => editor.chain().focus().deleteRange(range).setCallout({ type: "info", icon: "💡" }).run(),
  },
  {
    id: "divider",
    title: l10n.divider,
    description: l10n.separateSections,
    group: l10n.basicBlocks,
    icon: icon(MinusIcon),
    hint: "---",
    keywords: ["hr", "rule", "separator", "line"],
    command: ({ editor, range }) => editor.chain().focus().deleteRange(range).setHorizontalRule().run(),
  },
  {
    id: "code",
    title: l10n.codeBlock,
    description: l10n.codeWithSyntaxHighlighting,
    group: l10n.media,
    icon: icon(SquareCodeIcon),
    hint: "```",
    keywords: ["snippet", "pre"],
    command: ({ editor, range }) => editor.chain().focus().deleteRange(range).toggleCodeBlock().run(),
  },
  {
    id: "image",
    title: l10n.image,
    description: l10n.uploadOrPasteAnImage,
    group: l10n.media,
    icon: icon(ImageIcon),
    keywords: ["picture", "photo", "media"],
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).run()
      void insertImageFromFile(editor)
    },
  },
  {
    id: "table",
    title: l10n.table,
    description: l10n.simpleTable,
    group: l10n.media,
    icon: icon(TableIcon),
    keywords: ["grid", "rows", "columns"],
    command: ({ editor, range }) =>
      editor.chain().focus().deleteRange(range).insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run(),
  },
])
}

export const defaultSlashItems = getDefaultSlashItems()

export type SlashCommandOptions = {
  items: SlashItem[] | (() => SlashItem[])
  labels: () => LocaleLabels
  /** Trigger character. Default "/". */
  char: string
}

export const slashCommandKey = new PluginKey("slashCommand")

/** "/" opens a filterable block menu; arrows + Enter pick, Escape closes. */
export const SlashCommand = Extension.create<SlashCommandOptions>({
  name: "slashCommand",
  addOptions() {
    return { items: defaultSlashItems, char: "/", labels: () => localeLabels.en }
  },
  addProseMirrorPlugins() {
    return [
      Suggestion<SlashItem, SlashItem>({
        editor: this.editor,
        pluginKey: slashCommandKey,
        char: this.options.char,
        placement: "bottom-start",
        offset: { mainAxis: 6 },
        // not inside code
        allow: ({ state, range }) => {
          const $from = state.doc.resolve(range.from)
          return !$from.parent.type.spec.code
        },
        items: ({ query }) => filterSuggestionItems(typeof this.options.items === "function" ? this.options.items() : this.options.items, query),
        command: ({ editor, range, props }) => props.command({ editor, range }),
        render: suggestionRenderer<SlashItem>({ emptyLabel: () => this.options.labels().noMatchingBlocks }),
      }),
    ]
  },
})
