"use client"

import * as React from "react"

import { ToolResult, ToolResultOutput, type ToolResultStatus } from "@/registry/base-nova/ui/tool-result"

const FAIL = `$ pnpm build
▲ Next.js 15.3.1
  Creating an optimized production build ...
Failed to compile.

./app/trips/page.tsx:14:7
Type error: Property 'startsAt' does not exist on type 'Trip'.`

const PASS = `$ pnpm build
▲ Next.js 15.3.1
  Creating an optimized production build ...
✓ Compiled successfully in 18.4s`

export default function ToolResultErrorRetry() {
  const [status, setStatus] = React.useState<ToolResultStatus>("error")
  const [attempt, setAttempt] = React.useState(1)
  const timer = React.useRef<number | undefined>(undefined)
  React.useEffect(() => () => window.clearTimeout(timer.current), [])

  const retry = () => {
    setStatus("running")
    timer.current = window.setTimeout(() => {
      setAttempt((a) => a + 1)
      setStatus("success")
    }, 1800)
  }

  const output = status === "success" ? PASS : FAIL
  return (
    <ToolResult
      kind="terminal"
      tool="bash"
      title="Production build"
      status={status}
      duration={status === "running" ? undefined : status === "success" ? 18.4 : 6.1}
      meta={status === "running" ? undefined : status === "success" ? "exit 0" : "exit 1"}
      copyText={output}
      onRetry={retry}
      collapseOnComplete={false}
      className="max-w-lg"
    >
      <ToolResultOutput>{status === "running" ? `$ pnpm build   # attempt ${attempt + 1}` : output}</ToolResultOutput>
    </ToolResult>
  )
}
