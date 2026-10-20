"use client"

import { AgentComposer } from "@paneui/ui/blocks/agent-composer/agent-composer"

export default function AgentComposerMinimal() {
  return (
    <div className="w-full max-w-xl">
      <AgentComposer placeholder="Message the agent" />
    </div>
  )
}
