import { localeLabels, type LocaleLabels } from "@paneui/ui/components/locale-provider"
import * as React from "react"
import type { Editor } from "@tiptap/core"

import {
  CalloutIcon,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  ListIcon,
  ListOrderedIcon,
  ListTodoIcon,
  QuoteIcon,
  SquareCodeIcon,
  TypeIcon,
} from "@paneui/ui/icons"
import type { Swatch } from "@paneui/ui/components/swatch-picker"

/** "Turn into" targets shared by the bubble menu and the block handle menu. */
export type BlockType = {
  id: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  isActive: (editor: Editor) => boolean
  apply: (editor: Editor) => void
}

const clear = (editor: Editor) => editor.chain().focus().clearNodes()

export function getBlockTypes(l10n: LocaleLabels = localeLabels.en): BlockType[] {
  return ([
  { id: "text", label: l10n.text, icon: TypeIcon, isActive: (e) => e.isActive("paragraph") && !e.isActive("listItem") && !e.isActive("taskItem") && !e.isActive("blockquote") && !e.isActive("callout"), apply: (e) => clear(e).setParagraph().run() },
  { id: "heading-1", label: l10n.heading1, icon: Heading1Icon, isActive: (e) => e.isActive("heading", { level: 1 }), apply: (e) => clear(e).setHeading({ level: 1 }).run() },
  { id: "heading-2", label: l10n.heading2, icon: Heading2Icon, isActive: (e) => e.isActive("heading", { level: 2 }), apply: (e) => clear(e).setHeading({ level: 2 }).run() },
  { id: "heading-3", label: l10n.heading3, icon: Heading3Icon, isActive: (e) => e.isActive("heading", { level: 3 }), apply: (e) => clear(e).setHeading({ level: 3 }).run() },
  { id: "bullet-list", label: l10n.bulletedList, icon: ListIcon, isActive: (e) => e.isActive("bulletList"), apply: (e) => clear(e).toggleBulletList().run() },
  { id: "numbered-list", label: l10n.numberedList, icon: ListOrderedIcon, isActive: (e) => e.isActive("orderedList"), apply: (e) => clear(e).toggleOrderedList().run() },
  { id: "todo-list", label: l10n.todoList, icon: ListTodoIcon, isActive: (e) => e.isActive("taskList"), apply: (e) => clear(e).toggleTaskList().run() },
  { id: "quote", label: l10n.quote, icon: QuoteIcon, isActive: (e) => e.isActive("blockquote"), apply: (e) => clear(e).toggleBlockquote().run() },
  { id: "callout", label: l10n.callout, icon: CalloutIcon, isActive: (e) => e.isActive("callout"), apply: (e) => clear(e).setCallout({ type: "info", icon: "💡" }).run() },
  { id: "code", label: l10n.codeBlock, icon: SquareCodeIcon, isActive: (e) => e.isActive("codeBlock"), apply: (e) => clear(e).toggleCodeBlock().run() },
])
}

export const blockTypes = getBlockTypes()

/** Text colours: theme tokens, so they read in light and dark. */
export function getTextColors(l10n: LocaleLabels = localeLabels.en): Swatch[] {
  return ([
  { value: "default", label: l10n.default },
  { value: "var(--muted-foreground)", label: l10n.gray, color: "var(--muted-foreground)" },
  { value: "var(--destructive)", label: l10n.red, color: "var(--destructive)" },
  { value: "var(--warning)", label: l10n.yellow, color: "var(--warning)" },
  { value: "var(--success)", label: l10n.green, color: "var(--success)" },
  { value: "var(--chart-7)", label: l10n.teal, color: "var(--chart-7)" },
  { value: "var(--chart-1)", label: l10n.blue, color: "var(--chart-1)" },
  { value: "var(--chart-3)", label: l10n.purple, color: "var(--chart-3)" },
  { value: "var(--chart-5)", label: l10n.pink, color: "var(--chart-5)" },
])
}

export const textColors = getTextColors()

const wash = (token: string) => `color-mix(in oklch, var(${token}) 28%, transparent)`

/** Highlight washes: the same hues at 28% so text keeps its contrast. */
export function getHighlightColors(l10n: LocaleLabels = localeLabels.en): Swatch[] {
  return ([
  { value: "default", label: l10n.none },
  { value: wash("--muted-foreground"), label: l10n.gray, color: wash("--muted-foreground") },
  { value: wash("--destructive"), label: l10n.red, color: wash("--destructive") },
  { value: wash("--chart-6"), label: l10n.yellow, color: wash("--chart-6") },
  { value: wash("--chart-4"), label: l10n.green, color: wash("--chart-4") },
  { value: wash("--chart-7"), label: l10n.teal, color: wash("--chart-7") },
  { value: wash("--chart-1"), label: l10n.blue, color: wash("--chart-1") },
  { value: wash("--chart-3"), label: l10n.purple, color: wash("--chart-3") },
  { value: wash("--chart-5"), label: l10n.pink, color: wash("--chart-5") },
])
}

export const highlightColors = getHighlightColors()
