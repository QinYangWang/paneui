import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: {"en": "Shows an agent's step-by-step plan and its progress.", "zh": "展示助手的计划与进度。"},
  baseUi: {
    name: "Collapsible",
    href: "https://base-ui.com/react/components/collapsible",
  },
  usage: {
    imports: `import { TodoList } from "@/components/ui/todo-list"`,
    code: `<TodoList
  title="Plan"
  items={[
    { id: "1", title: "Find flights", status: "done" },
    { id: "2", title: "Book hotel", status: "in-progress" },
  ]}
/>`,
  },
  examples: [
    {
      id: "statuses",
      title: { en: "Statuses", zh: "状态" },
    },
    {
      id: "collapsed",
      title: { en: "Collapsed", zh: "收起" },
    },
    {
      id: "collapse-on-complete",
      title: { en: "Collapse on Complete", zh: "完成后收起" },
      description: { en: "Use when a finished plan should get out of the way of the reply.", zh: "适用于完成后应让位给回复的计划。" },
    },
    {
      id: "max-height",
      title: { en: "Max Height", zh: "最大高度" },
      description: { en: "Use for long plans inside a fixed-height panel.", zh: "适用于固定高度面板中的长计划。" },
    },
    {
      id: "status-mark",
      title: { en: "Status Mark", zh: "状态标记" },
      description: { en: "Use the mark alone in your own step lists.", zh: "适用于自定义步骤列表。" },
    },
  ],
  notes: [
    {
      title: "Accessibility",
      body: 'The in-progress item has `aria-current="step"`, every title ends with a screen-reader-only status, and the header reads "N of M done".',
    },
    {
      title: "Motion",
      body: "Under reduced motion the in-progress arc pulses instead of spinning, checks and crosses appear without drawing, and rows don't animate their position.",
    },
  ],
  api: [
    {
      name: "TodoList",
      description: "Collapsible agent task plan with a live completion count; failures are counted in the header.",
      extends: "Collapsible.Root",
      extendsHref: "https://base-ui.com/react/components/collapsible#root",
      props: [
        { name: "items", type: "TodoItem[]", required: true, description: "Plan items in order." },
        { name: "title", type: "ReactNode", default: `"Plan"`, description: "Header label." },
        { name: "open", type: "boolean", description: "Controlled open state." },
        { name: "defaultOpen", type: "boolean", default: "true", description: "Initial open state when uncontrolled." },
        { name: "onOpenChange", type: "(open: boolean) => void", description: "Called when the plan opens or closes." },
        { name: "collapseOnComplete", type: "boolean", default: "false", description: "Fold the plan away 700ms after every item is done." },
        { name: "maxHeight", type: "number", description: "Cap the list height in px; it scrolls past this." },
      ],
      dataAttributes: [
        { name: "data-complete", description: "On the root once every item is done." },
        { name: "data-status", description: "On each item: its status." },
      ],
    },
    {
      name: "TodoItem",
      description: "Shape of one plan item.",
      props: [
        { name: "id", type: "string", required: true, description: "Stable key." },
        { name: "title", type: "ReactNode", required: true, description: "What the step does." },
        { name: "status", type: `"pending" | "in-progress" | "done" | "failed"`, default: `"pending"`, description: "Step state." },
        { name: "meta", type: "ReactNode", description: "Trailing note, such as a duration, count or failure reason." },
        { name: "detail", type: "ReactNode", description: "Second line under the title." },
      ],
    },
    {
      name: "TodoStatusMark",
      description: "The morphing 20px status glyph.",
      props: [
        { name: "status", type: `"pending" | "in-progress" | "done" | "failed"`, required: true, description: "State to draw." },
        { name: "className", type: "string", description: "Merged onto the SVG." },
      ],
    },
  ],
} satisfies ComponentDoc
