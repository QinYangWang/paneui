"use client"

import * as React from "react"

import { Button } from "@/registry/base-nova/ui/button"
import { ToolApproval, type ToolApprovalDecision } from "@/registry/base-nova/ui/tool-approval"

export default function ToolApprovalControlled() {
  const [decision, setDecision] = React.useState<ToolApprovalDecision | null>(null)
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <ToolApproval
        tool="slack.post_message"
        title="Post to #design?"
        args={{ channel: "#design", text: "Review moved to Thursday 3 pm." }}
        decision={decision}
        onDecisionChange={setDecision}
      />
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs text-muted-foreground">Decision: {decision ?? "pending"}</span>
        <Button size="sm" variant="ghost" onClick={() => setDecision(null)} disabled={decision === null}>
          Ask again
        </Button>
      </div>
    </div>
  )
}
