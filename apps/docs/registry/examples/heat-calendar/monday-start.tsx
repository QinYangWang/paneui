"use client"

import { seededRandom } from "@paneui/ui/components/chart-utils"
import { generateHeatCalendarData, HeatCalendar } from "@paneui/ui/components/heat-calendar"

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
        color="var(--chart-1)"
        unit="workouts"
        label="Workouts, last 16 weeks"
      />
    </div>
  )
}
