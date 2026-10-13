"use client"

import * as React from "react"

import { seededRandom } from "@/registry/base-nova/ui/chart-utils"
import { ReturnsCalendar, type ReturnsCalendarView } from "@/registry/base-nova/ui/returns-calendar"
import { Tabs, TabsList, TabsTab } from "@/registry/base-nova/ui/tabs"

const data = (() => {
  const r = seededRandom(1987)
  return Array.from({ length: 8 }, (_, i) => {
    const year = 2019 + i
    return {
      year,
      // 2026 has data through September (UTC)
      returns: Array.from({ length: 12 }, (_, m) =>
        year === 2026 && m > 8 ? null : Number(((r() - 0.42) * 9 + (year === 2022 ? -1.8 : 0)).toFixed(2))
      ),
    }
  })
})()

export default function ReturnsCalendarDemo() {
  const [view, setView] = React.useState<ReturnsCalendarView>("months")
  return (
    <div className="w-full max-w-3xl space-y-3">
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-sm font-medium">Strategy returns</div>
          <div className="text-xs text-muted-foreground">Monthly, net of fees · click or shift-click to compound a range</div>
        </div>
        <Tabs value={view} onValueChange={(v) => setView(v as ReturnsCalendarView)}>
          <TabsList>
            <TabsTab value="months">Months</TabsTab>
            <TabsTab value="years">Years</TabsTab>
          </TabsList>
        </Tabs>
      </div>
      <ReturnsCalendar data={data} view={view} onViewChange={setView} label="Strategy monthly returns" />
    </div>
  )
}
