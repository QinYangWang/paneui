"use client"

import * as React from "react"

import { Button } from "@/registry/base-nova/ui/button"
import { Collapsible, CollapsiblePanel, CollapsibleTrigger } from "@/registry/base-nova/ui/collapsible"

export default function CollapsibleControlled() {
  const [open, setOpen] = React.useState(false)

  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <Button variant="secondary" size="sm" className="self-start" onClick={() => setOpen((o) => !o)}>
        {open ? "Hide" : "Show"} logs from outside
      </Button>
      <Collapsible open={open} onOpenChange={setOpen}>
        <CollapsibleTrigger className="w-full">Last run · 3 steps</CollapsibleTrigger>
        <CollapsiblePanel>
          <ol className="flex flex-col gap-1 px-3 pt-2 font-mono text-xs text-muted-foreground">
            <li>09:00:02 fetched 14 new emails</li>
            <li>09:00:05 drafted 2 replies</li>
            <li>09:00:06 waiting for your approval</li>
          </ol>
        </CollapsiblePanel>
      </Collapsible>
    </div>
  )
}
