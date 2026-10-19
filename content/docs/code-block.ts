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
      body: "The block never highlights in the browser. Give it markup highlighted at build time, as an `html` string or as children. Dual-theme output that puts `--shiki-light` and `--shiki-dark` on the `<pre>` and its spans follows the `.dark` class; output with inline light colours plus `--shiki-dark` works too. Only pass trusted build output to `html`.",
    },
    {
      title: "Lines",
      body: "Lines are the `.line` spans of the output. `lineNumbers` numbers them with CSS counters, so copying skips the numbers. Transformer classes are styled: `.line.highlighted`, `.line.diff.add`, `.line.diff.remove`, `.has-focused .line:not(.focused)` and `.highlighted-word`.",
    },
    {
      title: "In a content pipeline",
      body: "Map your `pre` to a CodeBlock: `pre: ({ \"data-title\": title, \"data-language\": language, ...props }) => <CodeBlock title={title} language={language}><pre {...props} /></CodeBlock>`. A CodeBlock inside a `typeset` container keeps its own styles.",
    },
    {
      title: "Copy",
      body: "The copy button copies the text of the `<pre>`. In a group it copies the open tab.",
    },
  ],
  api: [
    {
      name: "CodeBlock",
      description: "Frame with an optional title bar. Inside a `CodeGroup` it renders only its code; the group owns the frame.",
      extends: "div",
      props: [
        { name: "html", type: "string", description: "Highlighted markup, usually a whole `<pre>`." },
        { name: "children", type: "ReactNode", description: "Highlighted elements, used when `html` is not set." },
        { name: "title", type: "ReactNode", description: "Title bar text, usually a file name. Also the tab label (and, as a string, the tab value) in a group." },
        { name: "language", type: "string", description: "Label in the title bar; picks the icon when `title` is not a file name." },
        { name: "icon", type: "ReactNode | false", description: "Title bar icon. Defaults to the file-type icon from `getFileKind`; `false` hides it." },
        { name: "lineNumbers", type: "boolean", default: "false", description: "Number the lines." },
        { name: "wrap", type: "boolean", default: "false", description: "Wrap long lines instead of scrolling sideways." },
        { name: "copyable", type: "boolean", default: "true", description: "Show the copy button." },
        { name: "maxHeight", type: "number | string", description: "Height after which the code scrolls." },
      ],
      dataAttributes: [
        { name: "data-line-numbers", description: "On `code-block-content` while `lineNumbers` is set." },
      ],
    },
    {
      name: "CodeGroup",
      description: "Tabs of CodeBlocks in one frame.",
      extends: "div",
      props: [
        { name: "value", type: "string", description: "Controlled tab (a block's string `title`, else its `language`)." },
        { name: "defaultValue", type: "string", description: "First tab shown. Defaults to the first block." },
        { name: "onValueChange", type: "(value: string) => void", description: "Called when the tab changes." },
        { name: "storageKey", type: "string", description: "Remember the tab in `localStorage` and switch every group with the same key together." },
        { name: "copyable", type: "boolean", default: "true", description: "Show the copy button." },
      ],
    },
    {
      name: "CodeCopyButton",
      description: "The copy button on its own. `value` is a string or a function that returns one.",
      props: [
        { name: "value", type: "string | (() => string)", required: true, description: "Text to copy." },
        { name: "label", type: "string", default: `"Copy code"`, description: "Accessible label." },
      ],
    },
  ],
} satisfies ComponentDoc
