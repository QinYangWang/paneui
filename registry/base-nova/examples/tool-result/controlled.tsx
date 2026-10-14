"use client"

import * as React from "react"

import { Button } from "@/registry/base-nova/ui/button"
import { ToolResult, ToolResultOutput } from "@/registry/base-nova/ui/tool-result"

export default function ToolResultControlled() {
  const [open, setOpen] = React.useState(false)
  return (
    <div className="flex w-full max-w-lg flex-col gap-3">
      <ToolResult
        kind="terminal"
        tool="bash"
        title="Disk usage"
        status="success"
        duration={0.31}
        open={open}
        onOpenChange={setOpen}
      >
        <ToolResultOutput>{"$ du -sh *\n412M  node_modules\n 18M  .next\n2.1M  public"}</ToolResultOutput>
      </ToolResult>
      <Button size="sm" variant="secondary" className="self-end" onClick={() => setOpen((o) => !o)}>
        {open ? "Hide output" : "Show output"}
      </Button>
    </div>
  )
}
