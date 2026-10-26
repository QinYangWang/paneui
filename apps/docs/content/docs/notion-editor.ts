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
    { title: "Blocks and shortcuts", body: { en: "Text, headings 1–3 (4–6 kept from MDX), bulleted, numbered and to-do lists, toggle, quote, callout, divider, code block (with syntax highlighting), image and table. Markdown input rules cover `#`, `-`, `1.`, `[ ]`, `>`, three backticks, `---`, `**bold**`, `_italic_`, backtick code, `~~strike~~`. `⌘B` `⌘I` `⌘U` `⌘⇧S` `⌘E` for marks, `⌘K` for a link, `⌘⇧H` highlight, `⌘⌥1–3` headings, `⌘⇧7/8/9` lists, `⌘⇧↑` / `⌘⇧↓` move the block.", zh: "文本、标题 1–3（4–6 从 MDX 保留）、无序列表、有序列表和待办列表、折叠块、引用、标注、分隔线、代码块（带语法高亮）、图片和表格。Markdown 输入规则覆盖 `#`、`-`、`1.`、`[ ]`、`>`、三个反引号、`---`、`**bold**`、`_italic_`、反引号代码、`~~strike~~`。`⌘B` `⌘I` `⌘U` `⌘⇧S` `⌘E` 用于标记，`⌘K` 用于链接，`⌘⇧H` 高亮，`⌘⌥1–3` 标题，`⌘⇧7/8/9` 列表，`⌘⇧↑` / `⌘⇧↓` 移动块。" } },
    { title: "Moving blocks", body: { en: "Drag the grip with a mouse, pen or finger; a line marks where the block lands, the scroll area follows the pointer near its edges and Escape cancels. On touch the gutter sits on the block that holds the caret. The grip menu also has Move up and Move down. Every move is one undo step.", zh: "用鼠标、笔或手指拖动抓手；一条线标出块的落点，滚动区域在指针靠近边缘时跟随指针，Escape 取消。在触摸设备上，抓手位于光标所在块旁。抓手菜单也有 Move up 和 Move down。每次移动都是一步撤销。" } },
    { title: "MDX round trip", body: { en: "`fromMDX` parses MDX with GitHub-flavoured Markdown and `toMDX` prints it back. `<Callout type icon>` maps to the callout block, `<details><summary>` to the toggle, `<u>`, `<mark>` and `<span style={{ color }}>` to underline, highlight and colour. Anything else (unknown JSX, `import` / `export`, `{expressions}`, footnotes) becomes an editable raw MDX block, so `toMDX(fromMDX(source))` equals `formatMDX(source)`.", zh: "`fromMDX` 以 GitHub 风格 Markdown 解析 MDX，`toMDX` 将其打印回来。`<Callout type icon>` 映射到标注块，`<details><summary>` 映射到折叠块，`<u>`、`<mark>` 和 `<span style={{ color }}>` 映射到下划线、高亮和颜色。其他内容（未知 JSX、`import` / `export`、`{expressions}`、脚注）变为可编辑的原始 MDX 块，因此 `toMDX(fromMDX(source))` 等于 `formatMDX(source)`。" } },
    { title: "Images", body: { en: "The image block, paste and drop go through `uploadImage(file) => Promise<url>`; the default inlines a data URL, so pass your own uploader for real documents.", zh: "图片块、粘贴和拖放都经过 `uploadImage(file) => Promise<url>`；默认内联为 data URL，因此实际文档请传入自己的上传器。" } },
  ],
  api: [
    { name: "NotionEditor", description: { en: "Also takes every `useNotionEditor` option.", zh: "同时接受所有 `useNotionEditor` 选项。" }, props: [
      { name: "defaultValue", type: "string | JSONContent", description: { en: "Initial document: an MDX string or editor JSON (`JSONContent`).", zh: "初始文档：MDX 字符串或编辑器 JSON（`JSONContent`）。" } },
      { name: "value", type: "string | JSONContent", description: { en: "Controlled document. Pair with `onChange`; setting it from outside replaces the document.", zh: "受控文档。配合 `onChange` 使用；从外部设置会替换文档。" } },
      { name: "onChange", type: "(mdx: string, editor: Editor) => void", description: { en: "Called with the document as MDX on every change.", zh: "每次变更时以 MDX 形式调用传入文档。" } },
      { name: "onUpdate", type: "(editor: Editor) => void", description: { en: "Called on every change; read `editor.getJSON()` for JSON.", zh: "每次变更时调用；读取 `editor.getJSON()` 获取 JSON。" } },
      { name: "readOnly", type: "boolean", default: "false", description: { en: "Hide the gutter, bubble and slash menu.", zh: "隐藏抓手、气泡和斜杠菜单。" } },
      { name: "toolbar", type: "boolean", default: "false", description: { en: "Show the top bar with undo / redo and Import / Export MDX.", zh: "显示带撤销/重做和 Import / Export MDX 的顶栏。" } },
      { name: "fileName", type: "string", default: `"document.mdx"`, description: { en: "Download name for Export.", zh: "Export 的下载文件名。" } },
      { name: "placeholder", type: "string", description: { en: "Empty-block placeholder.", zh: "空块占位符。" } },
      { name: "placeholders", type: "Partial<Record<string, string>>", description: { en: "Placeholder per node type (`heading`, `paragraph`, `detailsSummary`…).", zh: "按节点类型设置占位符（`heading`、`paragraph`、`detailsSummary`…）。" } },
      { name: "slashItems", type: "SlashItem[]", default: "defaultSlashItems", description: { en: "The `/` menu. Each item has a `command({ editor, range })`.", zh: "`/` 菜单。每项有 `command({ editor, range })`。" } },
      { name: "uploadImage", type: "(file: File) => Promise<string>", description: { en: "Uploader for picked, pasted and dropped images.", zh: "用于选择、粘贴和拖放图片的上传器。" } },
      { name: "extensions", type: "AnyExtension[]", description: { en: "Extra editor extensions.", zh: "额外的编辑器扩展。" } },
      { name: "onReady", type: "(editor: Editor) => void", description: { en: "Receive the editor instance.", zh: "接收编辑器实例。" } },
      { name: "contentClassName", type: "string", description: { en: "Classes for the scrolling document area (padding).", zh: "滚动文档区域的类名（内边距）。" } },
    ] },
    { name: "toMDX", description: { en: "`toMDX(editor | json): string`. Unknown nodes keep their children.", zh: "`toMDX(editor | json): string`。未知节点保留其子节点。" }, props: [] },
    { name: "fromMDX", description: { en: "`fromMDX(source): JSONContent`, ready for `editor.commands.setContent`.", zh: "`fromMDX(source): JSONContent`，可直接用于 `editor.commands.setContent`。" }, props: [] },
    { name: "NotionEditorToolbar", props: [
      { name: "editor", type: "Editor | null", required: true, description: { en: "The editor to drive.", zh: "要驱动的编辑器。" } },
      { name: "fileName", type: "string", default: `"document.mdx"`, description: { en: "Download name.", zh: "下载名称。" } },
    ] },
    { name: "EditorBubbleMenu", description: { en: "Shared with the email editor.", zh: "与邮件编辑器共享。" }, props: [
      { name: "editor", type: "Editor", required: true, description: { en: "The editor.", zh: "编辑器。" } },
      { name: "blockTypes", type: "BlockType[] | false", description: { en: "\"Turn into\" targets; `false` hides the dropdown.", zh: "\"Turn into\" 的目标；`false` 隐藏下拉菜单。" } },
      { name: "colors", type: "boolean", default: "true", description: { en: "Show the colour popover.", zh: "显示颜色弹出层。" } },
      { name: "textColors / highlightColors", type: "Swatch[]", description: { en: "Palettes (theme tokens by default).", zh: "调色板（默认为主题变量）。" } },
    ] },
    { name: "moveBlock", description: { en: "`moveBlock(editor, from, to): boolean` moves the top-level block at `from` to the gap at `to`.", zh: "`moveBlock(editor, from, to): boolean` 将位于 `from` 的顶层块移动到 `to` 处的间隙。" }, props: [] },
    { name: "EditorBlockHandle", description: { en: "Render inside the same `relative` container as `EditorContent`.", zh: "在与 `EditorContent` 相同的 `relative` 容器内渲染。" }, props: [
      { name: "editor", type: "Editor", required: true, description: { en: "The editor.", zh: "编辑器。" } },
      { name: "blockTypes", type: "BlockType[] | false", description: { en: "\"Turn into\" targets in the grip menu.", zh: "抓手菜单中的 \"Turn into\" 目标。" } },
    ] },
  ],
} satisfies ComponentDoc
