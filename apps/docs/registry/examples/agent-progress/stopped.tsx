import { AgentProgress } from "@paneui/ui/components/agent-progress"

export default function AgentProgressStopped() {
  return (
    <div className="flex flex-col items-start gap-3">
      <AgentProgress label="Indexing" />
      <AgentProgress label="Indexed" running={false} initialElapsed={27.3} meta="318 files" />
    </div>
  )
}
