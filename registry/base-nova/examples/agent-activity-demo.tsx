"use client"

import * as React from "react"

import { AgentActivity, type AgentActivityItem } from "@/registry/base-nova/ui/agent-activity"
import { Button } from "@/registry/base-nova/ui/button"

const FINAL: AgentActivityItem[] = [
  {
    id: "r1",
    type: "reasoning",
    duration: 3,
    text: "The user wants Q3 churn by plan. I should check the warehouse schema first, then confirm how cancellations are recorded.",
  },
  {
    id: "s1",
    type: "search",
    query: "stripe subscription cancel_at_period_end churn definition",
    results: [
      { id: "s1a", title: "Subscriptions", url: "https://docs.stripe.com/billing/subscriptions/cancel", domain: "docs.stripe.com" },
      { id: "s1b", title: "Measuring churn", url: "https://www.chartmogul.com/blog/churn", domain: "chartmogul.com" },
    ],
  },
  {
    id: "s2",
    type: "search",
    query: "dbt incremental model late-arriving events",
    results: [{ id: "s2a", title: "Incremental models", url: "https://docs.getdbt.com/docs/build/incremental-models", domain: "docs.getdbt.com" }],
  },
  { id: "t1", type: "tool", action: "read", target: "models/marts/fct_subscriptions.sql" },
  { id: "t2", type: "tool", action: "run", target: "dbt run --select fct_churn", detail: "Built 1 model in 4.2s" },
  { id: "t3", type: "tool", action: "edit", target: "models/marts/fct_churn.sql", additions: 18, deletions: 4 },
  { id: "p1", type: "step", label: "Compute churn by plan" },
  { id: "p2", type: "step", label: "Draft summary for the team" },
]

export default function AgentActivityDemo() {
  const [count, setCount] = React.useState(1)
  const [run, setRun] = React.useState(0)
  const done = count > FINAL.length

  React.useEffect(() => {
    setCount(1)
    let n = 1
    const id = window.setInterval(() => {
      n += 1
      setCount(n)
      if (n > FINAL.length) window.clearInterval(id)
    }, 1100)
    return () => window.clearInterval(id)
  }, [run])

  // Visible items: earlier ones are complete, the newest is live.
  const items = FINAL.slice(0, Math.min(count, FINAL.length)).map((item, i, arr): AgentActivityItem => {
    const live = !done && i === arr.length - 1
    if (item.type === "search" && live) return { ...item, status: "active", results: [] }
    if (item.type === "reasoning") return live ? { ...item, status: "active" } : item
    return { ...item, status: live ? "active" : "complete" }
  })

  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <AgentActivity items={items} status={done ? "complete" : "working"} />
      {done ? (
        <Button size="sm" variant="secondary" className="self-start" onClick={() => setRun((r) => r + 1)}>
          Replay run
        </Button>
      ) : null}
    </div>
  )
}
