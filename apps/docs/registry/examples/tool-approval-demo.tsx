"use client"

import * as React from "react"

import { GitPullRequestIcon, TerminalSquareIcon } from "@paneui/ui/icons"
import { ToolApproval, type ToolApprovalDecision, type ToolApprovalStatus } from "@paneui/ui/components/tool-approval"

/** Approving starts the call; it finishes a moment later. */
function useRun(decision: ToolApprovalDecision | null, ms: number) {
  const [status, setStatus] = React.useState<ToolApprovalStatus | undefined>()
  React.useEffect(() => {
    if (decision !== "once" && decision !== "always") return
    const start = window.setTimeout(() => setStatus("running"), 500)
    const end = window.setTimeout(() => setStatus("done"), 500 + ms)
    return () => {
      window.clearTimeout(start)
      window.clearTimeout(end)
      setStatus(undefined)
    }
  }, [decision, ms])
  return status
}

export default function ToolApprovalDemo() {
  const [command, setCommand] = React.useState<ToolApprovalDecision | null>(null)
  const [pr, setPr] = React.useState<ToolApprovalDecision | null>(null)
  const commandStatus = useRun(command, 1400)
  const prStatus = useRun(pr, 1800)

  return (
    <div className="flex w-full max-w-md flex-col gap-2">
      <ToolApproval
        tool="shell.exec"
        icon={<TerminalSquareIcon />}
        risk="low"
        title={
          <>
            Run <code>rm -rf dist</code>?
          </>
        }
        resultTitle={<code>rm -rf dist</code>}
        description="The command runs in this project."
        decision={command}
        onDecisionChange={setCommand}
        status={commandStatus}
      />
      <ToolApproval
        tool="github.create_pull_request"
        icon={<GitPullRequestIcon />}
        title="Open a pull request?"
        description="fix/invoice-rounding into main"
        args={{ repo: "acme/billing", head: "fix/invoice-rounding", base: "main", draft: false }}
        decision={pr}
        onDecisionChange={setPr}
        status={prStatus}
      />
    </div>
  )
}
