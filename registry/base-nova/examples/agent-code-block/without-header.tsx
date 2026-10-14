import { AgentCodeBlock } from "@/registry/base-nova/ui/agent-code-block"

const CODE = `def nights_between(check_in, check_out):
    return (check_out - check_in).days
`

export default function AgentCodeBlockWithoutHeader() {
  return <AgentCodeBlock language="python" code={CODE} className="w-full max-w-xl" />
}
