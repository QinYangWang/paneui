import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: {"en": "Shows what an agent tool call ran and what it returned.", "zh": "展示工具调用与返回结果。"},
  baseUi: {
    name: "Collapsible",
    href: "https://base-ui.com/react/components/collapsible",
  },
  usage: {
    imports: `import { ToolResult, ToolResultOutput } from "@/components/ui/tool-result"`,
    code: `<ToolResult kind="terminal" tool="bash" title="List files" status="success" duration={0.42}>
  <ToolResultOutput>{"$ ls\\nREADME.md  package.json  src"}</ToolResultOutput>
</ToolResult>`,
  },
  composition: `ToolResult
├── ToolResultOutput
└── ToolResultRequest`,
  examples: [
    {
      id: "statuses",
      title: { en: "Statuses", zh: "状态" },
    },
    {
      id: "error-retry",
      title: { en: "Error with Retry", zh: "错误与重试" },
    },
    {
      id: "requests",
      title: { en: "Requests", zh: "请求" },
    },
    {
      id: "custom-icon",
      title: { en: "Custom Icon", zh: "自定义图标" },
    },
    {
      id: "output-languages",
      title: { en: "Output Languages", zh: "输出语言" },
    },
    {
      id: "controlled",
      title: { en: "Controlled", zh: "受控" },
    },
  ],
  notes: [
    {
      title: "Behaviour",
      body: { en: "The result opens when a run starts and, with `collapseOnComplete` (default), folds to its header only after a `success`. While running the duration ticks on its own and the log follows its tail.", zh: "运行开始时结果会打开，使用 `collapseOnComplete`（默认）时，仅在 `success` 后折叠为仅头部。运行时耗时自行跳动，日志跟随尾部。" },
    },
    {
      title: "Highlighting",
      body: { en: "`CodeHighlight` loads the highlighter core, the two themes and each grammar on first use. Only the seven `CodeLanguage` grammars reach your bundle, each as its own chunk.", zh: "`CodeHighlight` 在首次使用时加载高亮核心、两个主题和每个语法。只有七种 `CodeLanguage` 语法会进入你的 bundle，每种各自一个 chunk。" },
    },
    {
      title: "Motion",
      body: { en: "Under reduced motion the panel opens without a height transition, the spinner stops and the log tail jumps instead of smooth-scrolling.", zh: "在减少动态效果下，面板打开时没有高度过渡，spinner 停止，日志尾部会跳转而不是平滑滚动。" },
    },
  ],
  api: [
    {
      name: "ToolResult",
      description: { en: "Execution disclosure for one agent tool call.", zh: "一次 agent 工具调用的执行详情。" },
      extends: "Collapsible.Root",
      extendsHref: "https://base-ui.com/react/components/collapsible#root",
      props: [
        { name: "tool", type: "ReactNode", required: true, description: { en: "Tool identifier shown in mono, e.g. `bash` or `http.get`. Hidden below `sm`.", zh: "以等宽字体显示的工具标识符，例如 `bash` 或 `http.get`。在 `sm` 以下隐藏。" } },
        { name: "title", type: "ReactNode", required: true, description: { en: "What the call does.", zh: "该调用的作用。" } },
        { name: "status", type: `"running" | "success" | "error" | "cancelled"`, default: `"running"`, description: { en: "Run state.", zh: "运行状态。" } },
        { name: "kind", type: `"terminal" | "request" | "custom"`, default: `"custom"`, description: { en: "Picks the default header icon.", zh: "选择默认头部图标。" } },
        { name: "duration", type: "number", description: { en: "Final duration in seconds. While running and unset, elapsed time ticks on its own (and stays frozen after); a call that never ran in this mount shows no duration.", zh: "最终耗时，单位为秒。运行中且未设置时，已用时间会自行跳动（之后保持冻结）；本次挂载中从未运行的调用不显示耗时。" } },
        { name: "meta", type: "ReactNode", description: { en: "Extra header text such as an exit code.", zh: "额外的头部文本，例如退出码。" } },
        { name: "icon", type: "ReactNode", description: { en: "Replaces the `kind` icon in the chip.", zh: "替换 chip 中的 `kind` 图标。" } },
        { name: "open", type: "boolean", description: { en: "Controlled open state.", zh: "受控的打开状态。" } },
        { name: "defaultOpen", type: "boolean", default: "true", description: { en: "Initial open state when uncontrolled.", zh: "非受控时的初始打开状态。" } },
        { name: "onOpenChange", type: "(open: boolean) => void", description: { en: "Called when the disclosure opens or closes.", zh: "展开项打开或关闭时调用。" } },
        { name: "collapseOnComplete", type: "boolean", default: "true", description: { en: "Fold to the header when a run finishes with `success`.", zh: "运行以 `success` 完成时折叠到头部。" } },
        { name: "maxHeight", type: "number", default: "240", description: { en: "Max height of the output well before it scrolls, in px.", zh: "输出区域在滚动前的最大高度，单位为 px。" } },
        { name: "copyText", type: "string | (() => void | Promise<void>)", description: { en: "Text (or handler) for the Copy output action; omit to hide it.", zh: "Copy output 操作的文本（或处理器）；省略则隐藏。" } },
        { name: "onRetry", type: "() => void", description: { en: "Show a Run again action (disabled while running).", zh: "显示 Run again 操作（运行中禁用）。" } },
        { name: "contentClassName", type: "string", description: { en: "Classes for the padded box around `children`.", zh: "`children` 周围带内边距盒子的类名。" } },
      ],
      dataAttributes: [{ name: "data-status", description: { en: "The current `status`.", zh: "当前的 `status`。" } }],
    },
    {
      name: "ToolResultOutput",
      description: { en: "Highlighted, wrapping output body.", zh: "高亮、自动换行的输出主体。" },
      props: [
        { name: "children", type: "string", required: true, description: { en: "The output text.", zh: "输出文本。" } },
        { name: "language", type: `"bash" | "json" | "diff" | "tsx" | "typescript" | "yaml" | "python" | "text"`, default: `"bash"`, description: { en: "Highlight grammar.", zh: "高亮语法。" } },
        { name: "className", type: "string", description: { en: "Merged onto the `pre`.", zh: "合并到 `pre` 上。" } },
      ],
    },
    {
      name: "ToolResultRequest",
      description: { en: "Request line plus response body for `kind=\"request\"`.", zh: "`kind=\"request\"` 时的请求行加响应体。" },
      props: [
        { name: "url", type: "string", required: true, description: { en: "Request URL.", zh: "请求 URL。" } },
        { name: "method", type: "string", default: `"GET"`, description: { en: "HTTP method; GET, POST, PUT, PATCH and DELETE get their own tint.", zh: "HTTP 方法；GET、POST、PUT、PATCH 和 DELETE 各有自己的色调。" } },
        { name: "statusCode", type: "number", description: { en: "Response code; green below 400, red otherwise.", zh: "响应码；低于 400 为绿色，否则为红色。" } },
        { name: "statusText", type: "string", description: { en: "Text after the code, e.g. `OK`.", zh: "响应码之后的文本，例如 `OK`。" } },
        { name: "body", type: "string", description: { en: "Response body.", zh: "响应体。" } },
        { name: "language", type: "CodeLanguage", default: `"json"`, description: { en: "Highlight grammar for `body`.", zh: "`body` 的高亮语法。" } },
        { name: "className", type: "string", description: { en: "Merged onto the wrapper.", zh: "合并到包装器上。" } },
      ],
    },
    {
      name: "CodeHighlight",
      description: { en: "Dual-theme syntax highlight shared by the agent components.", zh: "由各 agent 组件共享的双主题语法高亮。" },
      extends: "pre",
      props: [
        { name: "code", type: "string", required: true, description: { en: "Source text.", zh: "源文本。" } },
        { name: "language", type: "CodeLanguage", default: `"bash"`, description: { en: "Highlight grammar.", zh: "高亮语法。" } },
        { name: "wrap", type: "boolean", default: "false", description: { en: "Wrap long lines instead of scrolling horizontally.", zh: "长行换行，而非水平滚动。" } },
      ],
    },
    {
      name: "ToolStatusIcon",
      description: { en: "The spinner / check / cross / stop glyph for a status.", zh: "某个状态的 spinner / 对勾 / 叉号 / 停止图标。" },
      props: [
        { name: "status", type: "ToolResultStatus", required: true, description: { en: "Which glyph to show.", zh: "要显示的图标。" } },
        { name: "className", type: "string", description: { en: "Merged onto the icon.", zh: "合并到图标上。" } },
      ],
    },
    {
      name: "AgentIconButton",
      description: { en: "Small round ghost icon button used across the agent components.", zh: "各 agent 组件共用的小号圆形幽灵图标按钮。" },
      extends: "button",
      props: [
        { name: "label", type: "string", required: true, description: { en: "`aria-label` and `title`.", zh: "`aria-label` 和 `title`。" } },
        { name: "pressed", type: "boolean", description: { en: "Sets `aria-pressed` and a pressed chip style.", zh: "设置 `aria-pressed` 和按下态的 chip 样式。" } },
      ],
    },
    {
      name: "AgentCopyButton",
      description: { en: "`AgentIconButton` that copies and flips to a check.", zh: "复制后翻转为对勾的 `AgentIconButton`。" },
      props: [
        { name: "value", type: "string | (() => void | Promise<void>)", required: true, description: { en: "Text to copy, or a handler to run instead.", zh: "要复制的文本，或改为执行的处理函数。" } },
        { name: "label", type: "string", default: `"Copy"`, description: { en: "Accessible label.", zh: "无障碍标签。" } },
        { name: "className", type: "string", description: { en: "Merged onto the button.", zh: "合并到按钮上。" } },
      ],
    },
    {
      name: "Hooks and helpers",
      description:
        { en: "`useCodeTokens(code, language)`, `useCopyToClipboard(timeout = 1600)`, `useElapsed(active)`, `useControllableOpen(open, defaultOpen, onOpenChange)`, `formatDuration(seconds)` (`420ms`, `2.4s`, `1m 05s`) and the `AGENT_EASE` curve are exported for the other agent components.", zh: "`useCodeTokens(code, language)`、`useCopyToClipboard(timeout = 1600)`、`useElapsed(active)`、`useControllableOpen(open, defaultOpen, onOpenChange)`、`formatDuration(seconds)`（输出 `420ms`、`2.4s`、`1m 05s`）以及 `AGENT_EASE` 曲线均已导出，供其他 agent 组件使用。" },
      props: [],
    },
  ],
} satisfies ComponentDoc
