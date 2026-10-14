"use client"

import * as React from "react"

import { Button } from "@/registry/base-nova/ui/button"
import { AnimatedBadge } from "@/registry/base-nova/ui/animated-badge"

export default function AnimatedBadgeCounter() {
  const [open, setOpen] = React.useState(3)

  return (
    <div className="flex items-center gap-3">
      <AnimatedBadge status={open === 0 ? "success" : "warning"} contentKey={open}>
        {open === 0 ? "All resolved" : `${open} open issues`}
      </AnimatedBadge>
      <Button variant="secondary" size="sm" disabled={open === 0} onClick={() => setOpen((n) => Math.max(0, n - 1))}>
        Resolve one
      </Button>
      <Button variant="ghost" size="sm" onClick={() => setOpen(3)}>
        Reset
      </Button>
    </div>
  )
}
