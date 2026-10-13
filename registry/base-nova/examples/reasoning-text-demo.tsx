import { ReasoningText } from "@/registry/base-nova/ui/reasoning-text"

export default function ReasoningTextDemo() {
  return (
    <div className="flex flex-col gap-4">
      <ReasoningText phrases={["Thinking", "Reading your calendar", "Comparing three options", "Drafting a reply"]} />
      <ReasoningText mode="cascade" spinner="dots" phrases={["Searching the web", "Reading 6 sources", "Checking the dates"]} />
      <ReasoningText mode="scramble" spinner="line" phrases={["Indexing repo", "Tracing the failure", "Patching formatDate"]} />
    </div>
  )
}
