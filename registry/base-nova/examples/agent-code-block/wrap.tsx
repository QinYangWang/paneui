import { AgentCodeBlock } from "@/registry/base-nova/ui/agent-code-block"

const CODE = `{
  "summary": "Moved the Thursday design review to 3 pm, notified all six attendees, and attached the updated agenda with the two new items from Dana about the onboarding flow.",
  "attendees": ["dana@example.com", "sam@example.com", "lee@example.com", "kai@example.com", "mo@example.com", "ren@example.com"],
  "status": "confirmed"
}`

export default function AgentCodeBlockWrap() {
  return <AgentCodeBlock filename="response.json" code={CODE} wrap maxHeight={200} className="w-full max-w-xl" />
}
