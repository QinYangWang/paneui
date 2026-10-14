import { AgentCodeBlock } from "@/registry/base-nova/ui/agent-code-block"

const CODE = `export function formatDate(date: Date, locale = "en-US") {
  return new Intl.DateTimeFormat(locale, {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(date)
}`

export default function AgentCodeBlockExcerpt() {
  return (
    <AgentCodeBlock
      filename="lib/format.ts"
      code={CODE}
      startLine={41}
      highlightLines={[41, [44, 45]]}
      className="w-full max-w-xl"
    />
  )
}
