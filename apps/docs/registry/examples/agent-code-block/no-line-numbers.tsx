import { AgentCodeBlock } from "@paneui/ui/components/agent-code-block"

const CODE = `pnpm dlx shadcn@latest add @paneui/agent-code-block
pnpm dev`

export default function AgentCodeBlockNoLineNumbers() {
  return <AgentCodeBlock filename="Terminal" language="bash" code={CODE} showLineNumbers={false} className="w-full max-w-xl" />
}
