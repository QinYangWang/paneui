"use client"

import * as React from "react"

import { ToolApproval, type ToolApprovalDecision } from "@/registry/base-nova/ui/tool-approval"

export default function ToolApprovalRemembered() {
  const [decision, setDecision] = React.useState<ToolApprovalDecision | null>(null)
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <ToolApproval
        tool="weather.forecast"
        title="Check the weather?"
        risk="low"
        rememberKey="docs-tool-approval-weather"
        args={{ city: "Hong Kong", days: 3 }}
        onDecisionChange={setDecision}
      />
      <p className="text-xs text-muted-foreground text-pretty">
        {decision === "always" ? "Saved. Reload the page and the card stays approved." : "Pick Always allow, then reload the page."}
      </p>
    </div>
  )
}
