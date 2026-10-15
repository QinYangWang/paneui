import type { ComponentDoc } from "@/lib/doc-types"

export default {
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
      title: "Item Types",
      description: "Items are `reasoning`, `search` (with `results`), `tool` (`read`, `edit`, `write`, `run` or any name, with `additions` / `deletions`) and `step`; consecutive items of one type fold into a group.",
    },
    {
      id: "completed",
      title: "Completed",
      description: "With `status=\"complete\"` the stream folds into \"Worked for …\" plus a count of searches, tool calls and steps; `duration` sets the total.",
    },
    {
      id: "custom-labels",
      title: "Custom Labels",
      description: "`activeLabel` overrides the live header and `summary` the completed one.",
    },
    {
      id: "errors",
      title: "Errors",
      description: "Set `status: \"error\"` on an item to mark it with a cross and tint its group's icon red.",
    },
    {
      id: "keep-open",
      title: "Keep Open",
      description: "`collapseOnComplete={false}` leaves the stream expanded when the run ends; `open` and `onOpenChange` control it after that.",
    },
  ],
  notes: [
    {
      title: "Behaviour",
      body: "While `working` the stream is always open and the header can't be toggled; the live group stays open with a shimmering label and the timer ticks. Groups the reader opens or closes keep that choice.",
    },
    {
      title: "Motion",
      body: "Under reduced motion the spinners and pulse rings stop, search chips fade in without scaling, and panels open without a height transition.",
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
        { name: "summary", type: "ReactNode", description: "Override the completed summary." },
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
