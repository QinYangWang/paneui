"use client"

import * as React from "react"

import { Badge } from "@/registry/base-nova/ui/badge"
import { SegmentedControl, SegmentedControlItem } from "@/registry/base-nova/ui/segmented-control"

export default function SegmentedControlDemo() {
  const [cycle, setCycle] = React.useState("yearly")
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-3">
        <SegmentedControl value={cycle} onValueChange={setCycle} aria-label="Billing cycle">
          <SegmentedControlItem value="monthly">Monthly</SegmentedControlItem>
          <SegmentedControlItem value="yearly">Yearly</SegmentedControlItem>
        </SegmentedControl>
        <Badge size="sm" variant="success">
          Save 17%
        </Badge>
      </div>
      <p className="text-sm text-muted-foreground tabular-nums">{cycle === "yearly" ? "$24" : "$29"} per seat / month</p>
    </div>
  )
}
