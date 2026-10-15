import type { ComponentDoc } from "@/lib/doc-types"

export default {
  usage: {
    imports: `import { WorkSummary, WorkSummaryStep } from "@/components/ui/work-summary"`,
    code: `<WorkSummary duration={25}>
  <WorkSummaryStep kind="read" title="Read SidebarThreadRow.tsx" />
  <WorkSummaryStep kind="execute" title="Run tests" detail="bun run test" />
</WorkSummary>`,
  },
  composition: `WorkSummary
└── WorkSummaryStep`,
  examples: [
    { id: "running", title: "Running", description: "Use `running` with `startedAt` while the agent is still working." },
    { id: "with-output", title: "With Output", description: "Use step children for command output, a diff or an error." },
  ],
  notes: [
    { title: "ACP", body: "`kind` and `status` use the Agent Client Protocol's `ToolKind` and `ToolCallStatus` values, so `tool_call` updates map straight onto steps." },
    { title: "Motion", body: "The list opens with a 250ms height and opacity ease; the chevron turns 90°. With reduced motion only the opacity changes." },
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
      ],
    },
  ],
} satisfies ComponentDoc
