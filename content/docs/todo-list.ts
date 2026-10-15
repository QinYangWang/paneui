import type { ComponentDoc } from "@/lib/doc-types"

export default {
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
      title: "Statuses",
      description: "Each item's `status` is `pending`, `in-progress`, `done` or `failed`; `detail` adds a second line and `meta` a trailing note. Failures are counted in the header.",
    },
    {
      id: "collapsed",
      title: "Collapsed",
      description: "With `defaultOpen={false}`, the header shows the in-progress item under the title so the plan stays glanceable.",
    },
    {
      id: "collapse-on-complete",
      title: "Collapse on Complete",
      description: "`collapseOnComplete` folds the plan away 700ms after every item is done, and the header icon turns into a check.",
    },
    {
      id: "max-height",
      title: "Max Height",
      description: "`maxHeight` caps the list in px; longer plans scroll inside it.",
    },
    {
      id: "status-mark",
      title: "Status Mark",
      description: "`TodoStatusMark` is exported on its own: one SVG that morphs between the four states.",
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
      description: "Collapsible agent task plan with a live completion count.",
      extends: "Collapsible.Root",
      extendsHref: "https://base-ui.com/react/components/collapsible#root",
      props: [
        { name: "items", type: "TodoItem[]", required: true, description: "Plan items in order." },
        { name: "title", type: "ReactNode", default: `"Plan"`, description: "Header label." },
        { name: "open", type: "boolean", description: "Controlled open state." },
        { name: "defaultOpen", type: "boolean", default: "true", description: "Initial open state when uncontrolled." },
        { name: "onOpenChange", type: "(open: boolean) => void", description: "Called when the plan opens or closes." },
        { name: "collapseOnComplete", type: "boolean", default: "false", description: "Fold the plan away once every item is done." },
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
        { name: "meta", type: "ReactNode", description: "Trailing note: a duration, a count, a failure reason." },
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
