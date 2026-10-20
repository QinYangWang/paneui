"use client"

import * as React from "react"

import { AgentProgress } from "@paneui/ui/components/agent-progress"
import { Button } from "@paneui/ui/components/button"

export default function AgentProgressControlled() {
  const [elapsed, setElapsed] = React.useState(42)
  return (
    <div className="flex flex-col items-start gap-4">
      <AgentProgress label="Deploying" elapsed={elapsed} />
      <div className="flex gap-2">
        <Button variant="secondary" size="sm" onClick={() => setElapsed((s) => s + 10)}>
          Add 10s
        </Button>
        <Button variant="ghost" size="sm" onClick={() => setElapsed(0)}>
          Reset
        </Button>
      </div>
    </div>
  )
}
