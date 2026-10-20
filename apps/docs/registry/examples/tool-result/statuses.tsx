import { ToolResult, ToolResultOutput } from "@paneui/ui/components/tool-result"

export default function ToolResultStatuses() {
  return (
    <div className="flex w-full max-w-lg flex-col gap-3">
      <ToolResult kind="terminal" tool="bash" title="Installing dependencies" status="running" defaultOpen={false}>
        <ToolResultOutput>{"$ pnpm install"}</ToolResultOutput>
      </ToolResult>
      <ToolResult kind="terminal" tool="bash" title="Type check" status="success" duration={3.2} defaultOpen={false}>
        <ToolResultOutput>{"$ tsc --noEmit\nNo errors."}</ToolResultOutput>
      </ToolResult>
      <ToolResult kind="terminal" tool="bash" title="Lint" status="error" duration={1.4} defaultOpen={false}>
        <ToolResultOutput>{"$ eslint .\n2 errors"}</ToolResultOutput>
      </ToolResult>
      <ToolResult kind="terminal" tool="bash" title="Deploy preview" status="cancelled" duration={12} defaultOpen={false}>
        <ToolResultOutput>{"$ pnpm deploy\nCancelled by user."}</ToolResultOutput>
      </ToolResult>
    </div>
  )
}
