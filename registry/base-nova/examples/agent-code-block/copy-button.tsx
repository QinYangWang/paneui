import { CodeCopyButton } from "@/registry/base-nova/ui/agent-code-block"

export default function AgentCodeBlockCopyButton() {
  return (
    <div className="flex w-full max-w-sm items-center justify-between gap-3 rounded-xl bg-muted py-1.5 pr-1.5 pl-3 shadow-well">
      <code className="truncate font-mono text-sm">sk-live-7f3a…c91e</code>
      <CodeCopyButton value="sk-live-7f3a2b8d4e6f0c91e" label="Copy API key" />
    </div>
  )
}
