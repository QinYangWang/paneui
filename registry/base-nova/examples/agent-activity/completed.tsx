import { AgentActivity, type AgentActivityItem } from "@/registry/base-nova/ui/agent-activity"

const ITEMS: AgentActivityItem[] = [
  { id: "s1", type: "search", query: "typhoon signal hong kong today", status: "complete" },
  { id: "s2", type: "search", query: "cathay pacific flight status CX 520", status: "complete" },
  { id: "t1", type: "tool", action: "calendar.update", target: "Flight CX 520", status: "complete" },
]

export default function AgentActivityCompleted() {
  return <AgentActivity items={ITEMS} status="complete" duration={38} className="max-w-md" />
}
