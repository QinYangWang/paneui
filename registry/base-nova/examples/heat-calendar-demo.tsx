"use client"

import * as React from "react"

import { seededRandom } from "@/registry/base-nova/ui/chart-utils"
import {
  generateHeatCalendarData,
  HeatCalendar,
  type HeatCalendarSelection,
} from "@/registry/base-nova/ui/heat-calendar"

const data = generateHeatCalendarData(seededRandom(2026), { endDate: "2026-10-13", days: 371 })

export default function HeatCalendarDemo() {
  const [selection, setSelection] = React.useState<HeatCalendarSelection | null>({
    start: "2026-09-14",
    end: "2026-09-27",
  })
  return (
    <div className="w-full max-w-2xl space-y-3">
      <div>
        <div className="text-sm font-medium">Commit activity</div>
        <div className="text-xs text-muted-foreground">Drag across days, or use arrows + Enter, to total a range</div>
      </div>
      <HeatCalendar
        data={data}
        endDate="2026-10-13"
        weeks={30}
        unit="commits"
        label="Commit activity, last 30 weeks"
        selection={selection}
        onSelectionChange={setSelection}
      />
    </div>
  )
}
