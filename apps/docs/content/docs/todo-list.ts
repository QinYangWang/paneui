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
      body: { en: "The in-progress item has `aria-current=\"step\"`, every title ends with a screen-reader-only status, and the header reads \"N of M done\".", zh: "进行中的条目带有 `aria-current=\"step\"`，每个标题结尾都有仅屏幕阅读器可见的状态，头部会读作“N of M done”。" },
    },
    {
      title: "Motion",
      body: { en: "Under reduced motion the in-progress arc pulses instead of spinning, checks and crosses appear without drawing, and rows don't animate their position.", zh: "在减少动态效果下，进行中的弧线会脉冲而不是旋转，对勾和叉号直接出现而不是绘制，行的位置也不会动画。" },
    },
  ],
  api: [
    {
      name: "TodoList",
      description: { en: "Collapsible agent task plan with a live completion count; failures are counted in the header.", zh: "可折叠的 agent 任务计划，带实时完成计数；失败数量会计入头部。" },
      extends: "Collapsible.Root",
      extendsHref: "https://base-ui.com/react/components/collapsible#root",
      props: [
        { name: "items", type: "TodoItem[]", required: true, description: { en: "Plan items in order.", zh: "按顺序排列的计划条目。" } },
        { name: "title", type: "ReactNode", default: `"Plan"`, description: { en: "Header label.", zh: "表头标签。" } },
        { name: "open", type: "boolean", description: { en: "Controlled open state.", zh: "受控的打开状态。" } },
        { name: "defaultOpen", type: "boolean", default: "true", description: { en: "Initial open state when uncontrolled.", zh: "非受控时的初始打开状态。" } },
        { name: "onOpenChange", type: "(open: boolean) => void", description: { en: "Called when the plan opens or closes.", zh: "计划打开或关闭时调用。" } },
        { name: "collapseOnComplete", type: "boolean", default: "false", description: { en: "Fold the plan away 700ms after every item is done.", zh: "每个条目完成后 700ms 折叠计划。" } },
        { name: "maxHeight", type: "number", description: { en: "Cap the list height in px; it scrolls past this.", zh: "限制列表高度，单位为 px；超出后会滚动。" } },
      ],
      dataAttributes: [
        { name: "data-complete", description: { en: "On the root once every item is done.", zh: "每个条目完成后在根元素上触发。" } },
        { name: "data-status", description: { en: "On each item: its status.", zh: "在每个条目上：其状态。" } },
      ],
    },
    {
      name: "TodoItem",
      description: { en: "Shape of one plan item.", zh: "一个计划条目的结构。" },
      props: [
        { name: "id", type: "string", required: true, description: { en: "Stable key.", zh: "稳定的 key。" } },
        { name: "title", type: "ReactNode", required: true, description: { en: "What the step does.", zh: "该步骤做什么。" } },
        { name: "status", type: `"pending" | "in-progress" | "done" | "failed"`, default: `"pending"`, description: { en: "Step state.", zh: "步骤状态。" } },
        { name: "meta", type: "ReactNode", description: { en: "Trailing note, such as a duration, count or failure reason.", zh: "尾部备注，例如耗时、数量或失败原因。" } },
        { name: "detail", type: "ReactNode", description: { en: "Second line under the title.", zh: "标题下方的第二行。" } },
      ],
    },
    {
      name: "TodoStatusMark",
      description: { en: "The morphing 20px status glyph.", zh: "变形的 20px 状态图标。" },
      props: [
        { name: "status", type: `"pending" | "in-progress" | "done" | "failed"`, required: true, description: { en: "State to draw.", zh: "要绘制的状态。" } },
        { name: "className", type: "string", description: { en: "Merged onto the SVG.", zh: "合并到 SVG 上。" } },
      ],
    },
  ],
} satisfies ComponentDoc
