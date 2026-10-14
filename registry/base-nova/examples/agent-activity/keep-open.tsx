"use client"

import * as React from "react"

import { AgentActivity, type AgentActivityItem } from "@/registry/base-nova/ui/agent-activity"
import { Button } from "@/registry/base-nova/ui/button"

const STEPS = ["Find three hotels near Namba", "Compare prices for Nov 20–23", "Check cancellation terms"]

export default function AgentActivityKeepOpen() {
  const [done, setDone] = React.useState(0)
  const [open, setOpen] = React.useState(true)
  const working = done < STEPS.length

  const items: AgentActivityItem[] = STEPS.map((label, i) => ({
    id: String(i),
    type: "step",
    label,
    status: i < done ? "complete" : i === done ? "active" : undefined,
  }))

  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <AgentActivity
        items={items}
        status={working ? "working" : "complete"}
        collapseOnComplete={false}
        open={open}
        onOpenChange={setOpen}
      />
      <Button size="sm" variant="secondary" className="self-start" onClick={() => setDone((d) => (d >= STEPS.length ? 0 : d + 1))}>
        {working ? "Finish step" : "Restart"}
      </Button>
    </div>
  )
}
