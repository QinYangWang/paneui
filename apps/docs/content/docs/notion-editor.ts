import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: {"en": "Writes and saves documents.", "zh": "编写并保存文档。"},
  usage: {
    imports: `import { NotionEditor, toMDX, fromMDX } from "@/components/notion-editor/notion-editor"`,
    code: `const [mdx, setMdx] = React.useState("# Hello\\n\\nType **/** for blocks.")

<NotionEditor toolbar value={mdx} onChange={setMdx} className="h-128" />`,
  },
  composition: `NotionEditor
├── NotionEditorToolbar        undo / redo, word count, Import / Export MDX
├── EditorContent              the document (notionExtensions)
├── EditorBlockHandle          "+" and drag grip in the gutter, drop line
└── EditorBubbleMenu           turn into, marks, link, colour

useNotionEditor(options)      the editor instance, for your own layout
toMDX(editor | json) / fromMDX(source)
moveBlock(editor, from, to) · moveSelectedBlock(editor, "up" | "down")
SlashCommand · defaultSlashItems · suggestionRenderer`,
  examples: [
    { id: "controlled-mdx", title: { en: "Controlled MDX", zh: "受控 MDX" }, description: { en: "Use when the document lives in your own state as an MDX string.", zh: "适用于由应用状态管理的 MDX 文档。" } },
    { id: "read-only", title: { en: "Read Only", zh: "只读" }, description: { en: "Use to show a finished document that no one should edit.", zh: "适用于已完成且不允许修改的文档。" } },
    { id: "custom-slash-items", title: { en: "Custom Slash Items", zh: "自定义斜杠命令" },  },
  ],
  notes: [
    { title: "Blocks and shortcuts", body: "Text, headings 1–3 (4–6 kept from MDX), bulleted, numbered and to-do lists, toggle, quote, callout, divider, code block (with syntax highlighting), image and table. Markdown input rules cover `#`, `-`, `1.`, `[ ]`, `>`, three backticks, `---`, `**bold**`, `_italic_`, backtick code, `~~strike~~`. `⌘B` `⌘I` `⌘U` `⌘⇧S` `⌘E` for marks, `⌘K` for a link, `⌘⇧H` highlight, `⌘⌥1–3` headings, `⌘⇧7/8/9` lists, `⌘⇧↑` / `⌘⇧↓` move the block." },
    { title: "Moving blocks", body: "Drag the grip with a mouse, pen or finger; a line marks where the block lands, the scroll area follows the pointer near its edges and Escape cancels. On touch the gutter sits on the block that holds the caret. The grip menu also has Move up and Move down. Every move is one undo step." },
    { title: "MDX round trip", body: "`fromMDX` parses MDX with GitHub-flavoured Markdown and `toMDX` prints it back. `<Callout type icon>` maps to the callout block, `<details><summary>` to the toggle, `<u>`, `<mark>` and `<span style={{ color }}>` to underline, highlight and colour. Anything else (unknown JSX, `import` / `export`, `{expressions}`, footnotes) becomes an editable raw MDX block, so `toMDX(fromMDX(source))` equals `formatMDX(source)`." },
    { title: "Images", body: "The image block, paste and drop go through `uploadImage(file) => Promise<url>`; the default inlines a data URL, so pass your own uploader for real documents." },
  ],
  api: [
    { name: "NotionEditor", description: "Also takes every `useNotionEditor` option.", props: [
      { name: "defaultValue", type: "string | JSONContent", description: "Initial document: an MDX string or editor JSON (`JSONContent`)." },
      { name: "value", type: "string | JSONContent", description: "Controlled document. Pair with `onChange`; setting it from outside replaces the document." },
      { name: "onChange", type: "(mdx: string, editor: Editor) => void", description: "Called with the document as MDX on every change." },
      { name: "onUpdate", type: "(editor: Editor) => void", description: "Called on every change; read `editor.getJSON()` for JSON." },
      { name: "readOnly", type: "boolean", default: "false", description: "Hide the gutter, bubble and slash menu." },
      { name: "toolbar", type: "boolean", default: "false", description: "Show the top bar with undo / redo and Import / Export MDX." },
      { name: "fileName", type: "string", default: `"document.mdx"`, description: "Download name for Export." },
      { name: "placeholder", type: "string", description: "Empty-block placeholder." },
      { name: "placeholders", type: "Partial<Record<string, string>>", description: "Placeholder per node type (`heading`, `paragraph`, `detailsSummary`…)." },
      { name: "slashItems", type: "SlashItem[]", default: "defaultSlashItems", description: "The `/` menu. Each item has a `command({ editor, range })`." },
      { name: "uploadImage", type: "(file: File) => Promise<string>", description: "Uploader for picked, pasted and dropped images." },
      { name: "extensions", type: "AnyExtension[]", description: "Extra editor extensions." },
      { name: "onReady", type: "(editor: Editor) => void", description: "Receive the editor instance." },
      { name: "contentClassName", type: "string", description: "Classes for the scrolling document area (padding)." },
    ] },
    { name: "toMDX", description: "`toMDX(editor | json): string`. Unknown nodes keep their children.", props: [] },
    { name: "fromMDX", description: "`fromMDX(source): JSONContent`, ready for `editor.commands.setContent`.", props: [] },
    { name: "NotionEditorToolbar", props: [
      { name: "editor", type: "Editor | null", required: true, description: "The editor to drive." },
      { name: "fileName", type: "string", default: `"document.mdx"`, description: "Download name." },
    ] },
    { name: "EditorBubbleMenu", description: "Shared with the email editor.", props: [
      { name: "editor", type: "Editor", required: true, description: "The editor." },
      { name: "blockTypes", type: "BlockType[] | false", description: "\"Turn into\" targets; `false` hides the dropdown." },
      { name: "colors", type: "boolean", default: "true", description: "Show the colour popover." },
      { name: "textColors / highlightColors", type: "Swatch[]", description: "Palettes (theme tokens by default)." },
    ] },
    { name: "moveBlock", description: "`moveBlock(editor, from, to): boolean` moves the top-level block at `from` to the gap at `to`.", props: [] },
    { name: "EditorBlockHandle", description: "Render inside the same `relative` container as `EditorContent`.", props: [
      { name: "editor", type: "Editor", required: true, description: "The editor." },
      { name: "blockTypes", type: "BlockType[] | false", description: "\"Turn into\" targets in the grip menu." },
    ] },
  ],
} satisfies ComponentDoc
