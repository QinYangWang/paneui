import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: {"en": "Summarises the steps an agent took during one turn.", "zh": "汇总助手本轮的工作步骤。"},
  usage: {
    imports: `import { WorkSummary, WorkSummaryStep, WorkSummaryThought } from "@/components/ui/work-summary"`,
    code: `<WorkSummary duration={25}>
  <WorkSummaryStep kind="read" title="Read SidebarThreadRow.tsx" />
  <WorkSummaryStep kind="execute" title="Run tests" detail="bun run test" />
</WorkSummary>`,
  },
  composition: `WorkSummary
├── WorkSummaryThought
└── WorkSummaryStep`,
  examples: [
    { id: "running", title: { en: "Running", zh: "运行中" },  },
    { id: "with-output", title: { en: "With Output", zh: "带输出" }, description: { en: "Use step children for command output, a diff or an error.", zh: "适用于包含命令输出、差异或错误的步骤。" } },
    { id: "collapsible-steps", title: { en: "Collapsible Steps", zh: "可收起步骤" }, description: { en: "Use when a turn has many steps with long output.", zh: "适用于步骤多且输出较长的工作过程。" } },
  ],
  notes: [
    { title: "ACP", body: "`kind` and `status` use the Agent Client Protocol's `ToolKind` and `ToolCallStatus` values, so `tool_call` updates map straight onto steps." },
    { title: "Motion", body: "The list opens with a 250ms height and opacity ease, a collapsible step with 200ms; the chevron turns 90°. With reduced motion only the opacity changes." },
    { title: "Collapsible steps", body: "With `collapsible` the step row is a button with `aria-expanded`; its children mount only while open. Without children it stays a plain row." },
  ],
  api: [
    {
      name: "WorkSummary",
      extends: "div",
      props: [
        { name: "duration", type: "number", description: "Seconds the work took (finished turns)." },
        { name: "startedAt", type: "number", description: "Epoch ms the work started; the label counts up from it while `running`." },
        { name: "running", type: "boolean", default: "false", description: "Show “Working for …” with a shimmer." },
        { name: "label", type: "ReactNode", description: "Replace the label." },
        { name: "open", type: "boolean", description: "Controlled open state." },
        { name: "defaultOpen", type: "boolean", default: "false", description: "Initial open state." },
        { name: "onOpenChange", type: "(open: boolean) => void", description: "Called when toggled." },
      ],
      dataAttributes: [{ name: "data-open / data-running", description: "Present when open / running." }],
    },
    {
      name: "WorkSummaryStep",
      extends: "li",
      props: [
        { name: "kind", type: `"read" | "edit" | "delete" | "move" | "search" | "execute" | "think" | "fetch" | "switch_mode" | "other"`, default: `"other"`, description: "Picks the icon." },
        { name: "title", type: "ReactNode", required: true, description: "What happened." },
        { name: "detail", type: "ReactNode", description: "Muted monospace detail, such as a path or command." },
        { name: "status", type: `"pending" | "in_progress" | "completed" | "failed"`, default: `"completed"`, description: "Spinner, dimmed, icon or ✕." },
        { name: "icon", type: "ReactNode", description: "Override the kind's icon." },
        { name: "collapsible", type: "boolean", default: "false", description: "The step row shows and hides its children." },
        { name: "open", type: "boolean", description: "Controlled open state of a collapsible step." },
        { name: "defaultOpen", type: "boolean", default: "false", description: "Initial open state." },
        { name: "onOpenChange", type: "(open: boolean) => void", description: "Called when toggled." },
      ],
      dataAttributes: [{ name: "data-status / data-open", description: "Step status; present while a collapsible step is open." }],
    },
    {
      name: "WorkSummaryThought",
      extends: "li",
      description: "The model's thinking text.",
      props: [
        { name: "title", type: "ReactNode", description: "Heading such as “Thought for 4s”; with it the text folds under the heading." },
        { name: "open / defaultOpen / onOpenChange", type: "boolean / boolean / (open: boolean) => void", description: "Open state when `title` is set." },
      ],
    },
  ],
} satisfies ComponentDoc
