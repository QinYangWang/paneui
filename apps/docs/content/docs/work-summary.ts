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
    { title: "ACP", body: { en: "`kind` and `status` use the Agent Client Protocol's `ToolKind` and `ToolCallStatus` values, so `tool_call` updates map straight onto steps.", zh: "`kind` 和 `status` 使用 Agent Client Protocol 的 `ToolKind` 和 `ToolCallStatus` 值，因此 `tool_call` 更新可直接映射到步骤。" } },
    { title: "Motion", body: { en: "The list opens with a 250ms height and opacity ease, a collapsible step with 200ms; the chevron turns 90°. With reduced motion only the opacity changes.", zh: "列表打开时高度和透明度以 250ms 缓动，可折叠步骤为 200ms；箭头旋转 90°。在减少动态效果下仅透明度变化。" } },
    { title: "Collapsible steps", body: { en: "With `collapsible` the step row is a button with `aria-expanded`; its children mount only while open. Without children it stays a plain row.", zh: "使用 `collapsible` 时，步骤行为一个带有 `aria-expanded` 的按钮；其子项仅在打开时挂载。没有子项时它保持为普通行。" } },
  ],
  api: [
    {
      name: "WorkSummary",
      extends: "div",
      props: [
        { name: "duration", type: "number", description: { en: "Seconds the work took (finished turns).", zh: "工作花费的秒数（已完成的轮次）。" } },
        { name: "startedAt", type: "number", description: { en: "Epoch ms the work started; the label counts up from it while `running`.", zh: "工作开始时的 epoch 毫秒时间戳；在 `running` 时标签从此处开始计数。" } },
        { name: "running", type: "boolean", default: "false", description: { en: "Show “Working for …” with a shimmer.", zh: "以微光效果显示“Working for …”。" } },
        { name: "label", type: "ReactNode", description: { en: "Replace the label.", zh: "替换标签。" } },
        { name: "open", type: "boolean", description: { en: "Controlled open state.", zh: "受控的打开状态。" } },
        { name: "defaultOpen", type: "boolean", default: "false", description: { en: "Initial open state.", zh: "初始打开状态。" } },
        { name: "onOpenChange", type: "(open: boolean) => void", description: { en: "Called when toggled.", zh: "切换时调用。" } },
      ],
      dataAttributes: [{ name: "data-open / data-running", description: { en: "Present when open / running.", zh: "当打开 / 运行时存在。" } }],
    },
    {
      name: "WorkSummaryStep",
      extends: "li",
      props: [
        { name: "kind", type: `"read" | "edit" | "delete" | "move" | "search" | "execute" | "think" | "fetch" | "switch_mode" | "other"`, default: `"other"`, description: { en: "Picks the icon.", zh: "选择图标。" } },
        { name: "title", type: "ReactNode", required: true, description: { en: "What happened.", zh: "发生了什么。" } },
        { name: "detail", type: "ReactNode", description: { en: "Muted monospace detail, such as a path or command.", zh: "弱化的等宽细节，例如路径或命令。" } },
        { name: "status", type: `"pending" | "in_progress" | "completed" | "failed"`, default: `"completed"`, description: { en: "Spinner, dimmed, icon or ✕.", zh: "旋转加载指示器、变暗、图标或 ✕。" } },
        { name: "icon", type: "ReactNode", description: { en: "Override the kind's icon.", zh: "覆盖该 kind 的图标。" } },
        { name: "collapsible", type: "boolean", default: "false", description: { en: "The step row shows and hides its children.", zh: "步骤行显示和隐藏其子项。" } },
        { name: "open", type: "boolean", description: { en: "Controlled open state of a collapsible step.", zh: "可折叠步骤的受控打开状态。" } },
        { name: "defaultOpen", type: "boolean", default: "false", description: { en: "Initial open state.", zh: "初始打开状态。" } },
        { name: "onOpenChange", type: "(open: boolean) => void", description: { en: "Called when toggled.", zh: "切换时调用。" } },
      ],
      dataAttributes: [{ name: "data-status / data-open", description: { en: "Step status; present while a collapsible step is open.", zh: "步骤状态；当可折叠步骤打开时存在。" } }],
    },
    {
      name: "WorkSummaryThought",
      extends: "li",
      description: { en: "The model's thinking text.", zh: "模型的思考文本。" },
      props: [
        { name: "title", type: "ReactNode", description: { en: "Heading such as “Thought for 4s”; with it the text folds under the heading.", zh: "标题，例如“Thought for 4s”；有它时文本折叠在标题下。" } },
        { name: "open / defaultOpen / onOpenChange", type: "boolean / boolean / (open: boolean) => void", description: { en: "Open state when `title` is set.", zh: "设置 `title` 时的打开状态。" } },
      ],
    },
  ],
} satisfies ComponentDoc
