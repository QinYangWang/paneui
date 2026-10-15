"use client"

import * as React from "react"

import { Button } from "@/registry/base-nova/ui/button"
import { ToolApproval, forgetToolApproval, type ToolApprovalDecision } from "@/registry/base-nova/ui/tool-approval"

const REMEMBER_KEY = "docs-tool-approval-weather"

export default function ToolApprovalRemembered() {
  const [decision, setDecision] = React.useState<ToolApprovalDecision | null>(null)
  return (
    <div className="flex w-full max-w-md flex-col gap-2">
      <ToolApproval
        tool="weather.forecast"
        title="Check the weather?"
        description="Hong Kong, next three days."
        risk="low"
        rememberKey={REMEMBER_KEY}
        args={{ city: "Hong Kong", days: 3 }}
        decision={decision}
        onDecisionChange={setDecision}
      />
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs text-pretty text-muted-foreground">
          {decision === "always" ? "Saved. Reload the page and the card stays approved." : "Pick Always allow, then reload the page."}
        </p>
        <Button
          size="sm"
          variant="ghost"
          disabled={decision !== "always"}
          onClick={() => {
            // Resetting a controlled decision doesn't clear the saved permission.
            forgetToolApproval(REMEMBER_KEY)
            setDecision(null)
          }}
        >
          Forget
        </Button>
      </div>
    </div>
  )
}
