import { Treemap, type TreemapNode } from "@/registry/base-nova/ui/treemap"

const DATA: TreemapNode[] = [
  {
    id: "passing",
    label: "Passing",
    color: "var(--success)",
    children: [
      { id: "unit", label: "Unit", value: 412 },
      { id: "integration", label: "Integration", value: 96 },
      { id: "e2e", label: "End-to-end", value: 38 },
    ],
  },
  { id: "flaky", label: "Flaky", color: "var(--warning)", value: 14, description: "Passed on retry" },
  { id: "failing", label: "Failing", color: "var(--destructive)", value: 6 },
]

export default function TreemapCustomColors() {
  return <Treemap data={DATA} label="Test results" height={260} className="max-w-xl" />
}
