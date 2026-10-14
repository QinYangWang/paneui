"use client"

import { seededRandom } from "@/registry/base-nova/ui/chart-utils"
import { generateHeatCalendarData, HeatCalendar } from "@/registry/base-nova/ui/heat-calendar"

const data = generateHeatCalendarData(seededRandom(7), { endDate: "2026-10-13", days: 371, intensity: 14 })

export default function HeatCalendarFullYear() {
  return (
    <div className="w-full max-w-3xl">
      <HeatCalendar
        data={data}
        endDate="2026-10-13"
        weeks={53}
        cellSize={10}
        gap={2}
        maxCount={10}
        unit="pull requests"
        label="Pull requests reviewed, last year"
      />
    </div>
  )
}
