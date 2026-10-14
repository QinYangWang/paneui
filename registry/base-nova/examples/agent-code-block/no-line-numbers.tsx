import { AgentCodeBlock } from "@/registry/base-nova/ui/agent-code-block"

const CODE = `pnpm dlx shadcn@latest add @qinyang/agent-code-block
pnpm dev`

export default function AgentCodeBlockNoLineNumbers() {
  return <AgentCodeBlock filename="Terminal" language="bash" code={CODE} showLineNumbers={false} className="w-full max-w-xl" />
}
