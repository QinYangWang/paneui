import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: {"en": "Summarises an agent’s work.", "zh": "汇总助手的工作过程。"},
  baseUi: {
    name: "Collapsible",
    href: "https://base-ui.com/react/components/collapsible",
  },
  usage: {
    imports: `import { AgentActivity } from "@/components/ui/agent-activity"`,
    code: `<AgentActivity
  status="working"
  items={[{ id: "1", type: "search", query: "flights HKG to KIX", status: "active" }]}
/>`,
  },
  examples: [
    {
      id: "item-types",
      title: { en: "Item Types", zh: "条目类型" },
      description: { en: "Use to show every kind of work in one run; consecutive items of one type fold into a group.", zh: "适用于汇总一次运行中的各类工作。" },
    },
    {
      id: "completed",
      title: { en: "Completed", zh: "已完成" },
    },
    {
      id: "custom-labels",
      title: { en: "Custom Labels", zh: "自定义标签" },
    },
    {
      id: "errors",
      title: { en: "Errors", zh: "错误" },
    },
    {
      id: "keep-open",
      title: { en: "Keep Open", zh: "保持展开" },
    },
  ],
  notes: [
    {
      title: "Behaviour",
      body: "While `working` the stream is always open, the header can't be toggled and the live group stays open. Groups the reader opens or closes keep that choice.",
    },
    {
      title: "Motion",
      body: "Under reduced motion the spinners stop, the live group loses its pulse ring, search chips fade in without scaling, and panels open without a height transition.",
    },
  ],
  api: [
    {
      name: "AgentActivity",
      description: "One adaptive activity stream for an agent run.",
      extends: "Collapsible.Root",
      extendsHref: "https://base-ui.com/react/components/collapsible#root",
      props: [
        { name: "items", type: "AgentActivityItem[]", required: true, description: "Chronological activity. Append or update items as events stream in." },
        { name: "status", type: `"working" | "complete"`, default: `"working"`, description: "Run state." },
        { name: "duration", type: "number", description: "Total seconds; while working and unset, the header ticks on its own." },
        { name: "open", type: "boolean", description: "Controlled open state once complete." },
        { name: "defaultOpen", type: "boolean", default: "false", description: "Initial open state when mounting complete." },
        { name: "onOpenChange", type: "(open: boolean) => void", description: "Called when the stream opens or closes." },
        { name: "collapseOnComplete", type: "boolean", default: "true", description: "Fold into the summary line when the run completes." },
        { name: "activeLabel", type: "ReactNode", description: "Override the live header label." },
        { name: "summary", type: "ReactNode", description: "Override the completed summary, which defaults to \"Worked for …\" plus a count of searches, tool calls and steps." },
      ],
      dataAttributes: [{ name: "data-status", description: "`working` or `complete`." }],
    },
    {
      name: "AgentActivityItem",
      description: "Union of the four item shapes. Every item has `id: string` and optional `status: \"active\" | \"complete\" | \"error\"`.",
      props: [
        { name: "type: \"reasoning\"", type: "{ text: ReactNode; duration?: number }", description: "Thinking text; `duration` feeds \"Thought for …\"." },
        { name: "type: \"search\"", type: "{ query: string; results?: CitationSource[] }", description: "A web search and its result chips." },
        {
          name: "type: \"tool\"",
          type: "{ action: string; target: ReactNode; detail?: ReactNode; additions?: number; deletions?: number }",
          description: "A tool call; `read`, `edit`, `write` and `run` get their own verb and icon.",
        },
        { name: "type: \"step\"", type: "{ label: ReactNode; detail?: ReactNode }", description: "A plan step with a checkable dot." },
      ],
    },
  ],
} satisfies ComponentDoc
