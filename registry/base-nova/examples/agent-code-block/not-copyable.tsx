import { AgentCodeBlock } from "@/registry/base-nova/ui/agent-code-block"

const CODE = `✓ 128 tests passed
✓ Coverage 91.4%
Done in 6.2s`

export default function AgentCodeBlockNotCopyable() {
  return <AgentCodeBlock filename="vitest output" code={CODE} copyable={false} showLineNumbers={false} className="w-full max-w-xl" />
}
