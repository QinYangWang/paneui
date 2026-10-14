import { AgentProgress } from "@/registry/base-nova/ui/agent-progress"

export default function AgentProgressFormats() {
  return (
    <div className="flex flex-col items-start gap-3">
      <AgentProgress label="Searching" running={false} initialElapsed={8.4} />
      <AgentProgress label="Researching" running={false} initialElapsed={83} />
      <AgentProgress label="Training" running={false} initialElapsed={3900} />
    </div>
  )
}
