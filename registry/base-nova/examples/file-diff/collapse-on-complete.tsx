"use client"

import * as React from "react"

import { Button } from "@/registry/base-nova/ui/button"
import { FileDiff, parseUnifiedDiff, type FileDiffLine } from "@/registry/base-nova/ui/file-diff"

const ALL = parseUnifiedDiff(`@@ -1,4 +1,5 @@
 export const config = {
-  retries: 2,
+  retries: 3,
+  backoffMs: 500,
   timeoutMs: 10_000,
 }
`)

export default function FileDiffCollapseOnComplete() {
  const [lines, setLines] = React.useState<FileDiffLine[]>(ALL)
  const [streaming, setStreaming] = React.useState(false)
  const timer = React.useRef<number | undefined>(undefined)

  React.useEffect(() => () => window.clearInterval(timer.current), [])

  const run = () => {
    let i = 0
    setLines([])
    setStreaming(true)
    timer.current = window.setInterval(() => {
      i += 1
      setLines(ALL.slice(0, i))
      if (i >= ALL.length) {
        window.clearInterval(timer.current)
        setStreaming(false)
      }
    }, 220)
  }

  return (
    <div className="flex w-full max-w-xl flex-col gap-3">
      <FileDiff filename="lib/http/config.ts" lines={lines} status={streaming ? "streaming" : "complete"} collapseOnComplete />
      <Button size="sm" variant="secondary" className="self-end" onClick={run} disabled={streaming}>
        {streaming ? "Applying…" : "Apply edit"}
      </Button>
    </div>
  )
}
