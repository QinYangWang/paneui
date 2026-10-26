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
      body: { en: "While `working` the stream is always open, the header can't be toggled and the live group stays open. Groups the reader opens or closes keep that choice.", zh: "`working` 期间，流始终展开，标题不可切换，实时组保持展开。读者手动展开或关闭的组会保留其选择。" },
    },
    {
      title: "Motion",
      body: { en: "Under reduced motion the spinners stop, the live group loses its pulse ring, search chips fade in without scaling, and panels open without a height transition.", zh: "在减少动态效果下，加载动画停止，实时组失去脉冲环，搜索片段无缩放淡入，面板展开时无高度过渡。" },
    },
  ],
  api: [
    {
      name: "AgentActivity",
      description: { en: "One adaptive activity stream for an agent run.", zh: "面向智能体运行的自适应活动流。" },
      extends: "Collapsible.Root",
      extendsHref: "https://base-ui.com/react/components/collapsible#root",
      props: [
        { name: "items", type: "AgentActivityItem[]", required: true, description: { en: "Chronological activity. Append or update items as events stream in.", zh: "按时间顺序排列的活动。随事件流入追加或更新项。" } },
        { name: "status", type: `"working" | "complete"`, default: `"working"`, description: { en: "Run state.", zh: "运行状态。" } },
        { name: "duration", type: "number", description: { en: "Total seconds; while working and unset, the header ticks on its own.", zh: "总秒数；working 且未设置时，标题自行计时。" } },
        { name: "open", type: "boolean", description: { en: "Controlled open state once complete.", zh: "完成后受控的展开状态。" } },
        { name: "defaultOpen", type: "boolean", default: "false", description: { en: "Initial open state when mounting complete.", zh: "挂载完成时的初始展开状态。" } },
        { name: "onOpenChange", type: "(open: boolean) => void", description: { en: "Called when the stream opens or closes.", zh: "流展开或关闭时调用。" } },
        { name: "collapseOnComplete", type: "boolean", default: "true", description: { en: "Fold into the summary line when the run completes.", zh: "运行完成时折叠进摘要行。" } },
        { name: "activeLabel", type: "ReactNode", description: { en: "Override the live header label.", zh: "覆盖实时标题标签。" } },
        { name: "summary", type: "ReactNode", description: { en: "Override the completed summary, which defaults to \"Worked for …\" plus a count of searches, tool calls and steps.", zh: "覆盖完成摘要，默认为 \"Worked for …\" 加上搜索、工具调用和步骤的数量。" } },
      ],
      dataAttributes: [{ name: "data-status", description: { en: "`working` or `complete`.", zh: "`working` 或 `complete`。" } }],
    },
    {
      name: "AgentActivityItem",
      description: { en: "Union of the four item shapes. Every item has `id: string` and optional `status: \"active\" | \"complete\" | \"error\"`.", zh: "四种项形状的联合。每项都有 `id: string` 和可选的 `status: \"active\" | \"complete\" | \"error\"`。" },
      props: [
        { name: "type: \"reasoning\"", type: "{ text: ReactNode; duration?: number }", description: { en: "Thinking text; `duration` feeds \"Thought for …\".", zh: "思考文本；`duration` 用于生成 \"Thought for …\"。" } },
        { name: "type: \"search\"", type: "{ query: string; results?: CitationSource[] }", description: { en: "A web search and its result chips.", zh: "一次网页搜索及其结果片段。" } },
        {
          name: "type: \"tool\"",
          type: "{ action: string; target: ReactNode; detail?: ReactNode; additions?: number; deletions?: number }",
          description: { en: "A tool call; `read`, `edit`, `write` and `run` get their own verb and icon.", zh: "一次工具调用；`read`、`edit`、`write` 和 `run` 各有自己的动词和图标。" },
        },
        { name: "type: \"step\"", type: "{ label: ReactNode; detail?: ReactNode }", description: { en: "A plan step with a checkable dot.", zh: "带可勾选圆点的计划步骤。" } },
      ],
    },
  ],
} satisfies ComponentDoc
