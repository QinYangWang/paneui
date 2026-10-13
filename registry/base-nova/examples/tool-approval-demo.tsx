"use client"

import * as React from "react"

import { ToolApproval, type ToolApprovalDecision } from "@/registry/base-nova/ui/tool-approval"

export default function ToolApprovalDemo() {
  const [last, setLast] = React.useState<ToolApprovalDecision | null>(null)

  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <ToolApproval
        tool="github.create_pull_request"
        title="Open a pull request?"
        description="The agent wants to push branch fix/invoice-rounding and open a PR against main."
        risk="medium"
        args={{
          repo: "acme/billing",
          head: "fix/invoice-rounding",
          base: "main",
          title: "Round line items before tax",
          draft: false,
        }}
        onDecisionChange={setLast}
      />
      <ToolApproval
        tool="shell.exec"
        title="Run a destructive command?"
        risk="high"
        args="rm -rf ./dist && pnpm build --filter @acme/web"
        defaultArgsOpen={false}
      />
      <p className="px-1 text-xs text-muted-foreground" aria-live="polite">
        Last decision: {last ?? "pending"}
      </p>
    </div>
  )
}
