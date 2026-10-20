# Block Editor

> Writes and saves documents.

Page: https://paneui.dev/docs/notion-editor/

## Installation

```bash
npx shadcn@latest add @paneui/notion-editor
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/notion-editor.json
```

Packages: `@tiptap/core`, `@tiptap/pm`, `@tiptap/react`, `@tiptap/starter-kit`, `@tiptap/extensions`, `@tiptap/extension-text-style`, `@tiptap/extension-highlight`, `@tiptap/suggestion`, `@floating-ui/dom`, `@tiptap/extension-list`, `@tiptap/extension-table`, `@tiptap/extension-image`, `@tiptap/extension-code-block-lowlight`, `@tiptap/extension-details`, `lowlight`, `unified`, `remark-parse`, `remark-mdx`, `remark-gfm`, `remark-stringify`, `mdast-util-mdx`, `@base-ui/react`.

Registry items it builds on: `@paneui/theme`, `@paneui/icons`, `@paneui/button`, `@paneui/input`, `@paneui/menu`, `@paneui/popover`, `@paneui/tooltip`, `@paneui/toolbar`, `@paneui/menu-list`, `@paneui/swatch-picker`.

## Usage

```tsx
import { NotionEditor, toMDX, fromMDX } from "@/components/notion-editor/notion-editor"
```

```tsx
const [mdx, setMdx] = React.useState("# Hello\n\nType **/** for blocks.")

<NotionEditor toolbar value={mdx} onChange={setMdx} className="h-128" />
```

## Composition

```text
NotionEditor
├── NotionEditorToolbar        undo / redo, word count, Import / Export MDX
├── EditorContent              the document (notionExtensions)
├── EditorBlockHandle          "+" and drag grip in the gutter, drop line
└── EditorBubbleMenu           turn into, marks, link, colour

useNotionEditor(options)      the editor instance, for your own layout
toMDX(editor | json) / fromMDX(source)
moveBlock(editor, from, to) · moveSelectedBlock(editor, "up" | "down")
SlashCommand · defaultSlashItems · suggestionRenderer
```

## Examples

### Controlled MDX

Use when the document lives in your own state as an MDX string.

```tsx
"use client"

import * as React from "react"

import { NotionEditor } from "@/registry/base-nova/blocks/notion-editor/notion-editor"

export default function NotionEditorControlledMdx() {
  const [mdx, setMdx] = React.useState("# Draft\n\nEdit on the left, the MDX updates on the right.\n\n- [ ] try a **bold** word\n")
  return (
    <div className="grid w-full max-w-4xl gap-3 md:grid-cols-2">
      <NotionEditor value={mdx} onChange={setMdx} className="h-80" contentClassName="py-6" />
      <pre className="h-80 overflow-auto rounded-xl bg-code p-4 font-mono text-xs leading-relaxed whitespace-pre-wrap shadow-raised">{mdx}</pre>
    </div>
  )
}
```

### Read Only

Use to show a finished document that no one should edit.

```tsx
"use client"

import { NotionEditor } from "@/registry/base-nova/blocks/notion-editor/notion-editor"

const doc = `## Release notes

<Callout type="success" icon="✅">
  Version 2.4 is live for everyone.
</Callout>

- Faster cold starts
- A new **email editor** block
- Fixed the toggle chevron in dark mode
`

export default function NotionEditorReadOnly() {
  return <NotionEditor readOnly defaultValue={doc} className="w-full max-w-2xl" contentClassName="py-6" />
}
```

### Custom Slash Items

```tsx
"use client"

import { SparklesIcon } from "@/components/icons"
import { NotionEditor } from "@/registry/base-nova/blocks/notion-editor/notion-editor"
import { defaultSlashItems, type SlashItem } from "@/registry/base-nova/blocks/notion-editor/slash-command"

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
```

## Blocks and shortcuts

Text, headings 1–3 (4–6 kept from MDX), bulleted, numbered and to-do lists, toggle, quote, callout, divider, code block (with syntax highlighting), image and table. Markdown input rules cover `#`, `-`, `1.`, `[ ]`, `>`, three backticks, `---`, `**bold**`, `_italic_`, backtick code, `~~strike~~`. `⌘B` `⌘I` `⌘U` `⌘⇧S` `⌘E` for marks, `⌘K` for a link, `⌘⇧H` highlight, `⌘⌥1–3` headings, `⌘⇧7/8/9` lists, `⌘⇧↑` / `⌘⇧↓` move the block.

## Moving blocks

Drag the grip with a mouse, pen or finger; a line marks where the block lands, the scroll area follows the pointer near its edges and Escape cancels. On touch the gutter sits on the block that holds the caret. The grip menu also has Move up and Move down. Every move is one undo step.

## MDX round trip

`fromMDX` parses MDX with GitHub-flavoured Markdown and `toMDX` prints it back. `<Callout type icon>` maps to the callout block, `<details><summary>` to the toggle, `<u>`, `<mark>` and `<span style={{ color }}>` to underline, highlight and colour. Anything else (unknown JSX, `import` / `export`, `{expressions}`, footnotes) becomes an editable raw MDX block, so `toMDX(fromMDX(source))` equals `formatMDX(source)`.

## Images

The image block, paste and drop go through `uploadImage(file) => Promise<url>`; the default inlines a data URL, so pass your own uploader for real documents.

## API Reference

### NotionEditor

Also takes every `useNotionEditor` option.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `defaultValue` | `string \| JSONContent` | — | Initial document: an MDX string or editor JSON (`JSONContent`). |
| `value` | `string \| JSONContent` | — | Controlled document. Pair with `onChange`; setting it from outside replaces the document. |
| `onChange` | `(mdx: string, editor: Editor) => void` | — | Called with the document as MDX on every change. |
| `onUpdate` | `(editor: Editor) => void` | — | Called on every change; read `editor.getJSON()` for JSON. |
| `readOnly` | `boolean` | `false` | Hide the gutter, bubble and slash menu. |
| `toolbar` | `boolean` | `false` | Show the top bar with undo / redo and Import / Export MDX. |
| `fileName` | `string` | `"document.mdx"` | Download name for Export. |
| `placeholder` | `string` | — | Empty-block placeholder. |
| `placeholders` | `Partial<Record<string, string>>` | — | Placeholder per node type (`heading`, `paragraph`, `detailsSummary`…). |
| `slashItems` | `SlashItem[]` | `defaultSlashItems` | The `/` menu. Each item has a `command({ editor, range })`. |
| `uploadImage` | `(file: File) => Promise<string>` | — | Uploader for picked, pasted and dropped images. |
| `extensions` | `AnyExtension[]` | — | Extra editor extensions. |
| `onReady` | `(editor: Editor) => void` | — | Receive the editor instance. |
| `contentClassName` | `string` | — | Classes for the scrolling document area (padding). |

### toMDX

`toMDX(editor | json): string`. Unknown nodes keep their children.

### fromMDX

`fromMDX(source): JSONContent`, ready for `editor.commands.setContent`.

### NotionEditorToolbar

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `editor` (required) | `Editor \| null` | — | The editor to drive. |
| `fileName` | `string` | `"document.mdx"` | Download name. |

### EditorBubbleMenu

Shared with the email editor.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `editor` (required) | `Editor` | — | The editor. |
| `blockTypes` | `BlockType[] \| false` | — | "Turn into" targets; `false` hides the dropdown. |
| `colors` | `boolean` | `true` | Show the colour popover. |
| `textColors / highlightColors` | `Swatch[]` | — | Palettes (theme tokens by default). |

### moveBlock

`moveBlock(editor, from, to): boolean` moves the top-level block at `from` to the gap at `to`.

### EditorBlockHandle

Render inside the same `relative` container as `EditorContent`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `editor` (required) | `Editor` | — | The editor. |
| `blockTypes` | `BlockType[] \| false` | — | "Turn into" targets in the grip menu. |
