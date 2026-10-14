"use client"

import { seededRandom } from "@/registry/base-nova/ui/chart-utils"
import { generateHeatCalendarData, HeatCalendar } from "@/registry/base-nova/ui/heat-calendar"

const data = generateHeatCalendarData(seededRandom(41), { endDate: "2026-10-13", days: 120, intensity: 3 })

export default function HeatCalendarMondayStart() {
  return (
    <div className="w-full max-w-md">
      <HeatCalendar
        data={data}
        endDate="2026-10-13"
        weeks={16}
        weekStartsOn={1}
        cellSize={16}
        gap={4}
        color="var(--primary)"
        unit="workouts"
        label="Workouts, last 16 weeks"
      />
    </div>
  )
}
