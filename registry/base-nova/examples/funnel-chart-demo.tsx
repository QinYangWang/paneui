"use client"

import * as React from "react"

import { FunnelChart } from "@/registry/base-nova/ui/funnel-chart"
import { Tabs, TabsList, TabsTab } from "@/registry/base-nova/ui/tabs"

const periods = {
  week: [
    { id: "visit", label: "Visited pricing", value: 18420 },
    { id: "signup", label: "Started signup", value: 6210 },
    { id: "verify", label: "Verified email", value: 4870 },
    { id: "trial", label: "Began trial", value: 2390 },
    { id: "paid", label: "Upgraded", value: 612 },
  ],
  month: [
    { id: "visit", label: "Visited pricing", value: 74100 },
    { id: "signup", label: "Started signup", value: 22800 },
    { id: "verify", label: "Verified email", value: 18900 },
    { id: "trial", label: "Began trial", value: 10400 },
    { id: "paid", label: "Upgraded", value: 3120 },
  ],
}

export default function FunnelChartDemo() {
  const [period, setPeriod] = React.useState<keyof typeof periods>("week")
  const [direction, setDirection] = React.useState<"vertical" | "horizontal">("vertical")
  return (
    <div className="w-full max-w-2xl space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <Tabs value={period} onValueChange={(v) => setPeriod(v as keyof typeof periods)}>
          <TabsList>
            <TabsTab value="week">7 days</TabsTab>
            <TabsTab value="month">30 days</TabsTab>
          </TabsList>
        </Tabs>
        <Tabs value={direction} onValueChange={(v) => setDirection(v as "vertical" | "horizontal")}>
          <TabsList>
            <TabsTab value="vertical">Vertical</TabsTab>
            <TabsTab value="horizontal">Horizontal</TabsTab>
          </TabsList>
        </Tabs>
      </div>
      <FunnelChart
        stages={periods[period]}
        direction={direction}
        label="Signup funnel"
        unit="users"
        formatValue={(v) => Math.round(v).toLocaleString("en-US")}
      />
    </div>
  )
}
