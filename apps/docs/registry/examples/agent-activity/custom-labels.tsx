import { AgentActivity, type AgentActivityItem } from "@paneui/ui/components/agent-activity"

const ITEMS: AgentActivityItem[] = [
  { id: "t1", type: "tool", action: "read", target: "statements/2026-09.pdf", status: "complete" },
  { id: "t2", type: "tool", action: "read", target: "statements/2026-10.pdf", status: "active" },
]

export default function AgentActivityCustomLabels() {
  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <AgentActivity items={ITEMS} activeLabel="Reading your bank statements…" />
      <AgentActivity items={ITEMS.map((i) => ({ ...i, status: "complete" as const }))} status="complete" duration={21} summary="Checked two months of spending" />
    </div>
  )
}
