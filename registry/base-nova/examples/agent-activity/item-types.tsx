import { AgentActivity, type AgentActivityItem } from "@/registry/base-nova/ui/agent-activity"

const ITEMS: AgentActivityItem[] = [
  { id: "r1", type: "reasoning", duration: 2.4, text: "You asked for a quiet dinner near the office. I’ll check reviews first, then availability." },
  {
    id: "s1",
    type: "search",
    query: "quiet japanese restaurant central hong kong",
    results: [
      { id: "a", title: "Best kaiseki in Central", domain: "timeout.com" },
      { id: "b", title: "Kaiseki Mori", domain: "openrice.com" },
    ],
  },
  { id: "t1", type: "tool", action: "run", target: "tables.availability", detail: "Found 3 slots tonight", status: "complete" },
  { id: "t2", type: "tool", action: "edit", target: "notes/dinner-plans.md", additions: 6, deletions: 1, status: "complete" },
  { id: "p1", type: "step", label: "Pick the 8:15 pm table", status: "complete" },
  { id: "p2", type: "step", label: "Send the booking for approval" },
]

export default function AgentActivityItemTypes() {
  return <AgentActivity items={ITEMS} status="complete" duration={14} defaultOpen collapseOnComplete={false} className="max-w-md" />
}
