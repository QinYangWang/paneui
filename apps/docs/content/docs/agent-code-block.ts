import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: {"en": "Displays code from an agent, including code still streaming in.", "zh": "显示编码助手输出的代码。"},
  usage: {
    imports: `import { AgentCodeBlock } from "@/components/ui/agent-code-block"`,
    code: `<AgentCodeBlock filename="lib/greet.ts" code={code} />`,
  },
  examples: [
    {
      id: "without-header",
      title: { en: "Without Header", zh: "无标题栏" },
    },
    {
      id: "excerpt",
      title: { en: "Excerpt", zh: "片段" },
    },
    {
      id: "no-line-numbers",
      title: { en: "Without Line Numbers", zh: "无行号" },
      description: { en: "Turn line numbers off for shell commands and short snippets.", zh: "适用于命令和短代码片段。" },
    },
    {
      id: "wrap",
      title: { en: "Wrap", zh: "换行" },
    },
    {
      id: "not-copyable",
      title: { en: "Not Copyable", zh: "禁止复制" },
      description: { en: "Turn copying off for read-only output that shouldn't be pasted back.", zh: "适用于不应再次粘贴执行的只读输出。" },
    },
    {
      id: "copy-button",
      title: { en: "Copy Button", zh: "复制按钮" },
    },
  ],
  notes: [
    {
      title: "Scrollbars",
      body: { en: "The code area scrolls in a [Scroll Area](/docs/scroll-area) on both axes, below the header and inside the rounded frame.", zh: "代码区域在 [Scroll Area](/docs/scroll-area) 中双轴滚动，位于标题下方、圆角框内部。" },
    },
    {
      title: "Streaming",
      body: { en: "While `streaming`, the block follows the newest line unless the reader scrolls away, and keeps already-coloured tokens so lines never flash back to plain text.", zh: "`streaming` 期间，块跟随最新行，除非读者滚动离开，并保留已着色 token，使行不会闪回纯文本。" },
    },
    {
      title: "Motion",
      body: { en: "The copy-to-check swap cross-fades without scaling under reduced motion, and the streaming follow jumps instead of smooth-scrolling.", zh: "在减少动态效果下，复制到对勾的切换交叉淡化而无缩放，流式跟随跳转而非平滑滚动。" },
    },
  ],
  api: [
    {
      name: "AgentCodeBlock",
      description: { en: "Syntax-highlighted code surface (light and dark themes) for agent output.", zh: "语法高亮的代码区域（浅色和深色主题），用于智能体输出。" },
      extends: "div",
      props: [
        { name: "code", type: "string", required: true, description: { en: "Source text.", zh: "源文本。" } },
        { name: "language", type: "string", description: { en: "Syntax language id. Inferred from `filename` when omitted; unknown ids render as plain text.", zh: "语法语言 id。省略时从 `filename` 推断；未知 id 以纯文本渲染。" } },
        { name: "filename", type: "ReactNode", description: { en: "Shown in a header with the language chip and copy button. Without it the copy button floats.", zh: "在标题中显示语言标签和复制按钮。未提供时复制按钮浮动。" } },
        { name: "showLineNumbers", type: "boolean", default: "true", description: { en: "Show the sticky line-number gutter.", zh: "显示粘性行号栏。" } },
        { name: "startLine", type: "number", default: "1", description: { en: "First line number, for excerpts.", zh: "首行行号，用于摘录。" } },
        { name: "highlightLines", type: "(number | [start: number, end: number])[]", description: { en: "Line numbers or `[start, end]` ranges, as displayed, to emphasise.", zh: "要高亮的行号或 `[start, end]` 范围（按显示行号）。" } },
        { name: "streaming", type: "boolean", default: "false", description: { en: "Show a live caret and Writing badge and follow the newest line.", zh: "显示实时光标和 Writing 徽标，并跟随最新行。" } },
        { name: "maxHeight", type: "number", default: "360", description: { en: "Max height of the scrolling code area in px.", zh: "滚动代码区域的最大高度，单位 px。" } },
        { name: "copyable", type: "boolean", default: "true", description: { en: "Show the copy button.", zh: "显示复制按钮。" } },
        { name: "wrap", type: "boolean", default: "false", description: { en: "Wrap long lines instead of scrolling horizontally.", zh: "长行换行，而非水平滚动。" } },
      ],
      dataAttributes: [
        { name: "data-streaming", description: { en: "On the root while `streaming`.", zh: "`streaming` 时作用于根元素。" } },
        { name: "data-line", description: { en: "On each line, its displayed number.", zh: "作用于每一行，即其显示行号。" } },
        { name: "data-highlighted", description: { en: "On lines listed in `highlightLines`.", zh: "作用于 `highlightLines` 中列出的行。" } },
      ],
    },
    {
      name: "CodeCopyButton",
      description: { en: "Round icon button that copies and swaps to a check.", zh: "圆形图标按钮，复制后切换为对勾。" },
      extends: "button",
      props: [
        { name: "value", type: "string | (() => string)", required: true, description: { en: "Text to copy, or a function returning it at click time.", zh: "要复制的文本，或点击时返回该文本的函数。" } },
        { name: "label", type: "string", default: `"Copy code"`, description: { en: "Accessible label before copying.", zh: "复制前的无障碍标签。" } },
        { name: "className", type: "string", description: { en: "Merged onto the button.", zh: "合并到按钮上。" } },
      ],
      dataAttributes: [{ name: "data-copied", description: { en: "Present for 1.6s after a successful copy.", zh: "复制成功后呈现 1.6s。" } }],
    },
    {
      name: "useCodeTokens",
      description: { en: "`(code: string, language: string) => CodeToken[][] | null`. Tokenises with light and dark colours; `null` until the first pass.", zh: "`(code: string, language: string) => CodeToken[][] | null`。使用浅色和深色颜色进行分词；首次处理完成前为 `null`。" },
      props: [],
    },
    {
      name: "CodeLine",
      description: { en: "Renders one line from (possibly stale) tokens.", zh: "用（可能过时的）token 渲染一行。" },
      props: [
        { name: "text", type: "string", required: true, description: { en: "The line's text.", zh: "该行的文本。" } },
        { name: "tokens", type: "CodeToken[]", description: { en: "Tokens for that line from `useCodeTokens`.", zh: "来自 `useCodeTokens` 的该行 token。" } },
      ],
    },
    {
      name: "useCopy",
      description: { en: "`(timeout = 1600) => { copied: boolean; copy: (text: string) => Promise<void> }`.", zh: "`(timeout = 1600) => { copied: boolean; copy: (text: string) => Promise<void> }`。" },
      props: [],
    },
    {
      name: "languageFromFilename",
      description: { en: "`(filename?: string, fallback = \"text\") => string`. Maps an extension like `.tsx` to a language id.", zh: "`(filename?: string, fallback = \"text\") => string`。将 `.tsx` 之类的扩展名映射为语言 id。" },
      props: [],
    },
  ],
} satisfies ComponentDoc
