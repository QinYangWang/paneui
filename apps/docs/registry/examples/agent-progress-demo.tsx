"use client"

import * as React from "react"

import { AgentProgress } from "@paneui/ui/components/agent-progress"
import { Button } from "@paneui/ui/components/button"

export default function AgentProgressDemo() {
  const [running, setRunning] = React.useState(true)
  return (
    <div className="flex flex-col items-start gap-4">
      <AgentProgress label="Compiling" running={running} meta="2.4k tokens" />
      <AgentProgress label="Researching" initialElapsed={83} />
      <Button variant="secondary" size="sm" onClick={() => setRunning((r) => !r)}>
        {running ? "Pause" : "Resume"}
      </Button>
    </div>
  )
}
