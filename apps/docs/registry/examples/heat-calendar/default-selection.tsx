"use client"

import { seededRandom } from "@paneui/ui/components/chart-utils"
import { generateHeatCalendarData, HeatCalendar } from "@paneui/ui/components/heat-calendar"

const data = generateHeatCalendarData(seededRandom(5), { endDate: "2026-10-13", days: 180, intensity: 6 })

export default function HeatCalendarDefaultSelection() {
  return (
    <div className="w-full max-w-2xl">
      <HeatCalendar
        data={data}
        endDate="2026-10-13"
        weeks={20}
        unit="deploys"
        defaultSelection={{ start: "2026-08-03", end: "2026-08-16" }}
        label="Deploys, last 20 weeks"
      />
    </div>
  )
}
