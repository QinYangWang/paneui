import { AgentProgress } from "@paneui/ui/components/agent-progress"

export default function AgentProgressWithMeta() {
  return (
    <div className="flex flex-col items-start gap-3">
      <AgentProgress label="Reading" meta="12 files" />
      <AgentProgress label="Writing" initialElapsed={14} meta="1.8k tokens" />
    </div>
  )
}
