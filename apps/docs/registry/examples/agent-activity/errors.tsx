import { AgentActivity, type AgentActivityItem } from "@paneui/ui/components/agent-activity"

const ITEMS: AgentActivityItem[] = [
  { id: "t1", type: "tool", action: "run", target: "pnpm test", detail: "2 failing tests in invoice.test.ts", status: "error" },
  { id: "t2", type: "tool", action: "edit", target: "src/invoice.ts", additions: 3, deletions: 2, status: "complete" },
  { id: "t3", type: "tool", action: "run", target: "pnpm test", detail: "All 69 tests passed", status: "complete" },
]

export default function AgentActivityErrors() {
  return <AgentActivity items={ITEMS} status="complete" duration={47} defaultOpen collapseOnComplete={false} className="max-w-md" />
}
