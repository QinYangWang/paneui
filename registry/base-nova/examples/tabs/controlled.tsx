"use client"

import * as React from "react"

import { Tabs, TabsList, TabsPanel, TabsTab } from "@/registry/base-nova/ui/tabs"

const ranges = [
  { value: "day", label: "Day", total: "$412" },
  { value: "week", label: "Week", total: "$2,870" },
  { value: "month", label: "Month", total: "$11,940" },
]

export default function TabsControlled() {
  const [range, setRange] = React.useState("week")
  return (
    <Tabs value={range} onValueChange={(value) => setRange(String(value))} className="items-center">
      <TabsList>
        {ranges.map((r) => (
          <TabsTab key={r.value} value={r.value}>
            {r.label}
          </TabsTab>
        ))}
      </TabsList>
      {ranges.map((r) => (
        <TabsPanel key={r.value} value={r.value} className="flex flex-col items-center gap-1">
          <span className="text-2xl font-semibold tracking-tight tabular-nums">{r.total}</span>
          <span className="text-sm text-muted-foreground">Revenue this {r.value}</span>
        </TabsPanel>
      ))}
    </Tabs>
  )
}
