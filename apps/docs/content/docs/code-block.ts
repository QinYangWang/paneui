import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: {"en": "Shows code highlighted at build time, alone or in tabs.", "zh": "显示高亮代码。"},
  usage: {
    imports: `import { CodeBlock, CodeGroup } from "@/components/ui/code-block"`,
    code: `// html: a <pre> highlighted at build time with a light and a dark theme
<CodeBlock title="lib/greet.ts" language="ts" html={html} lineNumbers />

<CodeGroup storageKey="framework">
  <CodeBlock title="app/page.tsx" html={page} />
  <CodeBlock title="app/layout.tsx" html={layout} />
</CodeGroup>`,
  },
  composition: `CodeGroup
└── CodeBlock`,
  examples: [
    {
      id: "code-group",
      title: { en: "Code Group", zh: "代码组" },
      description: { en: "Use a group when the same step has several files or variants.", zh: "适用于同一步骤涉及多个文件的场景。" },
    },
    {
      id: "remember-tab",
      title: { en: "Remember the Tab", zh: "记住标签页" },
    },
    {
      id: "highlighted-lines",
      title: { en: "Highlighted Lines", zh: "高亮行" },
    },
    {
      id: "without-title",
      title: { en: "Without Title", zh: "无标题" },
      description: { en: "Use a bare block for short commands; the copy button shows on hover.", zh: "适用于短命令。" },
    },
    {
      id: "children",
      title: { en: "Markup as Children", zh: "使用子元素" },
    },
  ],
  notes: [
    {
      title: "Input",
      body: { en: "The block never highlights in the browser. Give it markup highlighted at build time, as an `html` string or as children. Use `highlight(code, language)` from the installed `lib/highlight` module. Its colours follow the current theme and style. Existing dual-theme markup remains supported. Only pass trusted build output to `html`.", zh: "该代码块在浏览器中永远不会高亮。传入在构建时高亮的标记，可以是 `html` 字符串或子元素。使用已安装的 `lib/highlight` 模块中的 `highlight(code, language)`。其颜色跟随当前主题和样式。仍支持现有的双主题标记。只把可信的构建输出传给 `html`。" },
    },
    {
      title: "Lines",
      body: { en: "Lines are the `.line` spans of the output. `lineNumbers` numbers them with CSS counters, so copying skips the numbers. Transformer classes are styled: `.line.highlighted`, `.line.diff.add`, `.line.diff.remove`, `.has-focused .line:not(.focused)` and `.highlighted-word`.", zh: "行是输出中的 `.line` span。`lineNumbers` 用 CSS 计数器为它们编号，因此复制时会跳过编号。转换器类会被设置样式：`.line.highlighted`、`.line.diff.add`、`.line.diff.remove`、`.has-focused .line:not(.focused)` 和 `.highlighted-word`。" },
    },
    {
      title: "In a content pipeline",
      body: { en: "Map your `pre` to a CodeBlock: `pre: ({ \"data-title\": title, \"data-language\": language, ...props }) => <CodeBlock title={title} language={language}><pre {...props} /></CodeBlock>`. A CodeBlock inside a `typeset` container keeps its own styles.", zh: "将你的 `pre` 映射为 CodeBlock：`pre: ({ \"data-title\": title, \"data-language\": language, ...props }) => <CodeBlock title={title} language={language}><pre {...props} /></CodeBlock>`。`typeset` 容器内的 CodeBlock 保持自己的样式。" },
    },
    {
      title: "Copy",
      body: { en: "The copy button copies the text of the `<pre>`. In a group it copies the open tab.", zh: "复制按钮复制 `<pre>` 的文本。在分组中它复制当前打开的标签页。" },
    },
  ],
  api: [
    {
      name: "CodeBlock",
      description: { en: "Frame with an optional title bar. Inside a `CodeGroup` it renders only its code; the group owns the frame.", zh: "带可选标题栏的框架。在 `CodeGroup` 内只渲染其代码；框架由分组负责。" },
      extends: "div",
      props: [
        { name: "html", type: "string", description: { en: "Highlighted markup, usually a whole `<pre>`.", zh: "高亮后的标记，通常是完整的 `<pre>`。" } },
        { name: "children", type: "ReactNode", description: { en: "Highlighted elements, used when `html` is not set.", zh: "高亮后的元素，未设置 `html` 时使用。" } },
        { name: "title", type: "ReactNode", description: { en: "Title bar text, usually a file name. Also the tab label (and, as a string, the tab value) in a group.", zh: "标题栏文本，通常是文件名。在分组中也是标签页标签（作为字符串时还是标签页的值）。" } },
        { name: "language", type: "string", description: { en: "Label in the title bar; picks the icon when `title` is not a file name.", zh: "标题栏中的标签；当 `title` 不是文件名时用来选择图标。" } },
        { name: "icon", type: "ReactNode | false", description: { en: "Title bar icon. Defaults to the file-type icon from `getFileKind`; `false` hides it.", zh: "标题栏图标。默认使用 `getFileKind` 返回的文件类型图标；`false` 隐藏它。" } },
        { name: "lineNumbers", type: "boolean", default: "false", description: { en: "Number the lines.", zh: "为各行编号。" } },
        { name: "wrap", type: "boolean", default: "false", description: { en: "Wrap long lines instead of scrolling sideways.", zh: "长行换行而不是横向滚动。" } },
        { name: "copyable", type: "boolean", default: "true", description: { en: "Show the copy button.", zh: "显示复制按钮。" } },
        { name: "maxHeight", type: "number | string", description: { en: "Height after which the code scrolls.", zh: "超过此高度后代码滚动。" } },
      ],
      dataAttributes: [
        { name: "data-line-numbers", description: { en: "On `code-block-content` while `lineNumbers` is set.", zh: "设置 `lineNumbers` 时作用于 `code-block-content`。" } },
      ],
    },
    {
      name: "CodeGroup",
      description: { en: "Tabs of CodeBlocks in one frame.", zh: "同一框架内的 CodeBlock 标签页。" },
      extends: "div",
      props: [
        { name: "value", type: "string", description: { en: "Controlled tab (a block's string `title`, else its `language`).", zh: "受控的标签页（代码块的字符串 `title`，否则是其 `language`）。" } },
        { name: "defaultValue", type: "string", description: { en: "First tab shown. Defaults to the first block.", zh: "初始显示的标签页。默认为第一个代码块。" } },
        { name: "onValueChange", type: "(value: string) => void", description: { en: "Called when the tab changes.", zh: "标签页变化时调用。" } },
        { name: "storageKey", type: "string", description: { en: "Remember the tab in `localStorage` and switch every group with the same key together.", zh: "将标签页记录在 `localStorage` 中，并同步切换所有使用相同 key 的分组。" } },
        { name: "copyable", type: "boolean", default: "true", description: { en: "Show the copy button.", zh: "显示复制按钮。" } },
      ],
    },
    {
      name: "CodeCopyButton",
      description: { en: "The copy button on its own. `value` is a string or a function that returns one.", zh: "单独的复制按钮。`value` 是字符串或返回字符串的函数。" },
      props: [
        { name: "value", type: "string | (() => string)", required: true, description: { en: "Text to copy.", zh: "要复制的文本。" } },
        { name: "label", type: "string", default: `"Copy code"`, description: { en: "Accessible label.", zh: "无障碍标签。" } },
      ],
    },
  ],
} satisfies ComponentDoc
