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
      body: "The result opens when a run starts and, with `collapseOnComplete` (default), folds to its header only after a `success`. While running the duration ticks on its own and the log follows its tail.",
    },
    {
      title: "Highlighting",
      body: "`CodeHighlight` loads the highlighter core, the two themes and each grammar on first use. Only the seven `CodeLanguage` grammars reach your bundle, each as its own chunk.",
    },
    {
      title: "Motion",
      body: "Under reduced motion the panel opens without a height transition, the spinner stops and the log tail jumps instead of smooth-scrolling.",
    },
  ],
  api: [
    {
      name: "ToolResult",
      description: "Execution disclosure for one agent tool call.",
      extends: "Collapsible.Root",
      extendsHref: "https://base-ui.com/react/components/collapsible#root",
      props: [
        { name: "tool", type: "ReactNode", required: true, description: "Tool identifier shown in mono, e.g. `bash` or `http.get`. Hidden below `sm`." },
        { name: "title", type: "ReactNode", required: true, description: "What the call does." },
        { name: "status", type: `"running" | "success" | "error" | "cancelled"`, default: `"running"`, description: "Run state." },
        { name: "kind", type: `"terminal" | "request" | "custom"`, default: `"custom"`, description: "Picks the default header icon." },
        { name: "duration", type: "number", description: "Final duration in seconds. While running and unset, elapsed time ticks on its own (and stays frozen after); a call that never ran in this mount shows no duration." },
        { name: "meta", type: "ReactNode", description: "Extra header text such as an exit code." },
        { name: "icon", type: "ReactNode", description: "Replaces the `kind` icon in the chip." },
        { name: "open", type: "boolean", description: "Controlled open state." },
        { name: "defaultOpen", type: "boolean", default: "true", description: "Initial open state when uncontrolled." },
        { name: "onOpenChange", type: "(open: boolean) => void", description: "Called when the disclosure opens or closes." },
        { name: "collapseOnComplete", type: "boolean", default: "true", description: "Fold to the header when a run finishes with `success`." },
        { name: "maxHeight", type: "number", default: "240", description: "Max height of the output well before it scrolls, in px." },
        { name: "copyText", type: "string | (() => void | Promise<void>)", description: "Text (or handler) for the Copy output action; omit to hide it." },
        { name: "onRetry", type: "() => void", description: "Show a Run again action (disabled while running)." },
        { name: "contentClassName", type: "string", description: "Classes for the padded box around `children`." },
      ],
      dataAttributes: [{ name: "data-status", description: "The current `status`." }],
    },
    {
      name: "ToolResultOutput",
      description: "Highlighted, wrapping output body.",
      props: [
        { name: "children", type: "string", required: true, description: "The output text." },
        { name: "language", type: `"bash" | "json" | "diff" | "tsx" | "typescript" | "yaml" | "python" | "text"`, default: `"bash"`, description: "Highlight grammar." },
        { name: "className", type: "string", description: "Merged onto the `pre`." },
      ],
    },
    {
      name: "ToolResultRequest",
      description: "Request line plus response body for `kind=\"request\"`.",
      props: [
        { name: "url", type: "string", required: true, description: "Request URL." },
        { name: "method", type: "string", default: `"GET"`, description: "HTTP method; GET, POST, PUT, PATCH and DELETE get their own tint." },
        { name: "statusCode", type: "number", description: "Response code; green below 400, red otherwise." },
        { name: "statusText", type: "string", description: "Text after the code, e.g. `OK`." },
        { name: "body", type: "string", description: "Response body." },
        { name: "language", type: "CodeLanguage", default: `"json"`, description: "Highlight grammar for `body`." },
        { name: "className", type: "string", description: "Merged onto the wrapper." },
      ],
    },
    {
      name: "CodeHighlight",
      description: "Dual-theme syntax highlight shared by the agent components.",
      extends: "pre",
      props: [
        { name: "code", type: "string", required: true, description: "Source text." },
        { name: "language", type: "CodeLanguage", default: `"bash"`, description: "Highlight grammar." },
        { name: "wrap", type: "boolean", default: "false", description: "Wrap long lines instead of scrolling horizontally." },
      ],
    },
    {
      name: "ToolStatusIcon",
      description: "The spinner / check / cross / stop glyph for a status.",
      props: [
        { name: "status", type: "ToolResultStatus", required: true, description: "Which glyph to show." },
        { name: "className", type: "string", description: "Merged onto the icon." },
      ],
    },
    {
      name: "AgentIconButton",
      description: "Small round ghost icon button used across the agent components.",
      extends: "button",
      props: [
        { name: "label", type: "string", required: true, description: "`aria-label` and `title`." },
        { name: "pressed", type: "boolean", description: "Sets `aria-pressed` and a pressed chip style." },
      ],
    },
    {
      name: "AgentCopyButton",
      description: "`AgentIconButton` that copies and flips to a check.",
      props: [
        { name: "value", type: "string | (() => void | Promise<void>)", required: true, description: "Text to copy, or a handler to run instead." },
        { name: "label", type: "string", default: `"Copy"`, description: "Accessible label." },
        { name: "className", type: "string", description: "Merged onto the button." },
      ],
    },
    {
      name: "Hooks and helpers",
      description:
        "`useCodeTokens(code, language)`, `useCopyToClipboard(timeout = 1600)`, `useElapsed(active)`, `useControllableOpen(open, defaultOpen, onOpenChange)`, `formatDuration(seconds)` (`420ms`, `2.4s`, `1m 05s`) and the `AGENT_EASE` curve are exported for the other agent components.",
      props: [],
    },
  ],
} satisfies ComponentDoc
