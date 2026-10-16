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
} from "@/components/icons"
import type { Swatch } from "@/registry/base-nova/ui/swatch-picker"

/** "Turn into" targets shared by the bubble menu and the block handle menu. */
export type BlockType = {
  id: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  isActive: (editor: Editor) => boolean
  apply: (editor: Editor) => void
}

const clear = (editor: Editor) => editor.chain().focus().clearNodes()

export const blockTypes: BlockType[] = [
  { id: "text", label: "Text", icon: TypeIcon, isActive: (e) => e.isActive("paragraph") && !e.isActive("listItem") && !e.isActive("taskItem") && !e.isActive("blockquote") && !e.isActive("callout"), apply: (e) => clear(e).setParagraph().run() },
  { id: "heading-1", label: "Heading 1", icon: Heading1Icon, isActive: (e) => e.isActive("heading", { level: 1 }), apply: (e) => clear(e).setHeading({ level: 1 }).run() },
  { id: "heading-2", label: "Heading 2", icon: Heading2Icon, isActive: (e) => e.isActive("heading", { level: 2 }), apply: (e) => clear(e).setHeading({ level: 2 }).run() },
  { id: "heading-3", label: "Heading 3", icon: Heading3Icon, isActive: (e) => e.isActive("heading", { level: 3 }), apply: (e) => clear(e).setHeading({ level: 3 }).run() },
  { id: "bullet-list", label: "Bulleted list", icon: ListIcon, isActive: (e) => e.isActive("bulletList"), apply: (e) => clear(e).toggleBulletList().run() },
  { id: "numbered-list", label: "Numbered list", icon: ListOrderedIcon, isActive: (e) => e.isActive("orderedList"), apply: (e) => clear(e).toggleOrderedList().run() },
  { id: "todo-list", label: "To-do list", icon: ListTodoIcon, isActive: (e) => e.isActive("taskList"), apply: (e) => clear(e).toggleTaskList().run() },
  { id: "quote", label: "Quote", icon: QuoteIcon, isActive: (e) => e.isActive("blockquote"), apply: (e) => clear(e).toggleBlockquote().run() },
  { id: "callout", label: "Callout", icon: CalloutIcon, isActive: (e) => e.isActive("callout"), apply: (e) => clear(e).setCallout({ type: "info", icon: "💡" }).run() },
  { id: "code", label: "Code block", icon: SquareCodeIcon, isActive: (e) => e.isActive("codeBlock"), apply: (e) => clear(e).toggleCodeBlock().run() },
]

/** Text colours: theme tokens, so they read in light and dark. */
export const textColors: Swatch[] = [
  { value: "default", label: "Default" },
  { value: "var(--muted-foreground)", label: "Gray", color: "var(--muted-foreground)" },
  { value: "var(--destructive)", label: "Red", color: "var(--destructive)" },
  { value: "var(--warning)", label: "Yellow", color: "var(--warning)" },
  { value: "var(--success)", label: "Green", color: "var(--success)" },
  { value: "var(--chart-7)", label: "Teal", color: "var(--chart-7)" },
  { value: "var(--chart-1)", label: "Blue", color: "var(--chart-1)" },
  { value: "var(--chart-3)", label: "Purple", color: "var(--chart-3)" },
  { value: "var(--chart-5)", label: "Pink", color: "var(--chart-5)" },
]

const wash = (token: string) => `color-mix(in oklch, var(${token}) 28%, transparent)`

/** Highlight washes: the same hues at 28% so text keeps its contrast. */
export const highlightColors: Swatch[] = [
  { value: "default", label: "None" },
  { value: wash("--muted-foreground"), label: "Gray", color: wash("--muted-foreground") },
  { value: wash("--destructive"), label: "Red", color: wash("--destructive") },
  { value: wash("--chart-6"), label: "Yellow", color: wash("--chart-6") },
  { value: wash("--chart-4"), label: "Green", color: wash("--chart-4") },
  { value: wash("--chart-7"), label: "Teal", color: wash("--chart-7") },
  { value: wash("--chart-1"), label: "Blue", color: wash("--chart-1") },
  { value: wash("--chart-3"), label: "Purple", color: wash("--chart-3") },
  { value: wash("--chart-5"), label: "Pink", color: wash("--chart-5") },
]
