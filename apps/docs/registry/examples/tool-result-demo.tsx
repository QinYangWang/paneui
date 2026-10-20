"use client"

import * as React from "react"

import { ToolResult, ToolResultOutput, ToolResultRequest, type ToolResultStatus } from "@paneui/ui/components/tool-result"

const LOG = [
  "$ pnpm vitest run --reporter=dot",
  "",
  " RUN  v3.2.4 /repo/packages/billing",
  "",
  " ✓ src/invoice.test.ts (12 tests) 48ms",
  " ✓ src/tax/rates.test.ts (31 tests) 112ms",
  " ✓ src/webhooks/stripe.test.ts (9 tests) 204ms",
  " ✓ src/ledger/reconcile.test.ts (17 tests) 391ms",
  "",
  " Test Files  4 passed (4)",
  "      Tests  69 passed (69)",
  "   Duration  1.84s",
]

const RESPONSE = JSON.stringify(
  { id: "cus_R82kQ", email: "dana@acme.co", plan: "team", seats: 12, delinquent: false },
  null,
  2
)

export default function ToolResultDemo() {
  const [lines, setLines] = React.useState(1)
  const [status, setStatus] = React.useState<ToolResultStatus>("running")
  const [run, setRun] = React.useState(0)

  React.useEffect(() => {
    setLines(1)
    setStatus("running")
    let i = 1
    let done: number | undefined
    const id = window.setInterval(() => {
      i += 1
      setLines(i)
      if (i >= LOG.length) {
        window.clearInterval(id)
        done = window.setTimeout(() => setStatus("success"), 400)
      }
    }, 260)
    return () => {
      window.clearInterval(id)
      window.clearTimeout(done)
    }
  }, [run])

  const output = LOG.slice(0, lines).join("\n")

  return (
    <div className="flex w-full max-w-lg flex-col gap-3">
      <ToolResult
        kind="terminal"
        tool="bash"
        title={status === "running" ? "Running billing tests" : "Billing tests passed"}
        status={status}
        meta={status === "success" ? "exit 0" : undefined}
        copyText={output}
        onRetry={() => setRun((r) => r + 1)}
      >
        <ToolResultOutput>{output}</ToolResultOutput>
      </ToolResult>
      <ToolResult
        kind="request"
        tool="http.get"
        title="Fetch customer"
        status="success"
        duration={0.318}
        defaultOpen={false}
        copyText={RESPONSE}
      >
        <ToolResultRequest method="GET" url="https://api.acme.co/v1/customers/cus_R82kQ" statusCode={200} statusText="OK" body={RESPONSE} />
      </ToolResult>
    </div>
  )
}
