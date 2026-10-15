import type { ComponentDoc } from "@/lib/doc-types"

export default {
  usage: {
    imports: `import { NotionEditor, toMDX, fromMDX } from "@/components/notion-editor/notion-editor"`,
    code: `const [mdx, setMdx] = React.useState("# Hello\\n\\nType **/** for blocks.")

<NotionEditor toolbar value={mdx} onChange={setMdx} className="h-128" />`,
  },
  composition: `NotionEditor
├── NotionEditorToolbar        undo / redo, word count, Import / Export MDX
├── EditorContent              the document (notionExtensions)
├── EditorBlockHandle          "+" and drag grip in the gutter
└── EditorBubbleMenu           turn into, marks, link, colour

useNotionEditor(options)      the editor instance, for your own layout
toMDX(editor | json) / fromMDX(source)
SlashCommand · defaultSlashItems · suggestionRenderer`,
  examples: [
    { id: "controlled-mdx", title: "Controlled MDX", description: "`value` + `onChange` with an MDX string. Every change is serialised with `toMDX`; setting `value` from outside replaces the document." },
    { id: "read-only", title: "Read Only", description: "`readOnly` hides the gutter, bubble and slash menu and drops the gutter padding." },
    { id: "custom-slash-items", title: "Custom Slash Items", description: "Pass `slashItems` to replace or extend `defaultSlashItems`. Each item has a `command({ editor, range })`." },
  ],
  notes: [
    { title: "Blocks and shortcuts", body: "Text, headings 1–3 (4–6 kept from MDX), bulleted, numbered and to-do lists, toggle, quote, callout, divider, code block (lowlight syntax highlighting), image and table. Markdown input rules: `#`, `-`, `1.`, `[ ]`, `>`, three backticks, `---`, `**bold**`, `_italic_`, backtick code, `~~strike~~`. `⌘B` `⌘I` `⌘U` `⌘⇧S` `⌘E` for marks, `⌘K` for a link, `⌘⇧H` highlight, `⌘⌥1–3` headings, `⌘⇧7/8/9` lists." },
    { title: "MDX round trip", body: "`fromMDX` parses MDX with GitHub-flavoured Markdown and `toMDX` prints it back. `<Callout type icon>` maps to the callout block, `<details><summary>` to the toggle, `<u>`, `<mark>` and `<span style={{ color }}>` to underline, highlight and colour. Anything else (unknown JSX, `import` / `export`, `{expressions}`, footnotes) becomes an editable raw MDX block, so `toMDX(fromMDX(source))` equals the source after the printer's normal formatting (`formatMDX(source)`); a Node test covers every block (`scripts/test-notion-editor-mdx.ts`)." },
    { title: "Images", body: "The image block, paste and drop go through `uploadImage(file) => Promise<url>`; the default inlines a data URL, so pass your own uploader for real documents." },
    { title: "Licences", body: "Uses MIT-licensed editor packages only (starter kit, details, table, mention / suggestion, highlighted code blocks); no paid extensions." },
  ],
  api: [
    { name: "NotionEditor", description: "Also takes every `useNotionEditor` option.", props: [
      { name: "defaultValue", type: "string | JSONContent", description: "Initial document: an MDX string or editor JSON (`JSONContent`)." },
      { name: "value", type: "string | JSONContent", description: "Controlled document. Pair with `onChange`." },
      { name: "onChange", type: "(mdx: string, editor: Editor) => void", description: "Called with the document as MDX on every change." },
      { name: "onUpdate", type: "(editor: Editor) => void", description: "Called on every change; read `editor.getJSON()` for JSON." },
      { name: "readOnly", type: "boolean", default: "false", description: "Render without editing UI." },
      { name: "toolbar", type: "boolean", default: "false", description: "Show the top bar with undo / redo and Import / Export MDX." },
      { name: "fileName", type: "string", default: `"document.mdx"`, description: "Download name for Export." },
      { name: "placeholder", type: "string", description: "Empty-block placeholder." },
      { name: "placeholders", type: "Partial<Record<string, string>>", description: "Placeholder per node type (`heading`, `paragraph`, `detailsSummary`…)." },
      { name: "slashItems", type: "SlashItem[]", default: "defaultSlashItems", description: "The `/` menu." },
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
    { name: "EditorBlockHandle", description: "Render inside the same `relative` container as `EditorContent`.", props: [
      { name: "editor", type: "Editor", required: true, description: "The editor." },
      { name: "blockTypes", type: "BlockType[] | false", description: "\"Turn into\" targets in the grip menu." },
    ] },
  ],
} satisfies ComponentDoc
