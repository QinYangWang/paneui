"use client"

import { seededRandom } from "@/registry/base-nova/ui/chart-utils"
import {
  generateHeatCalendarData,
  HeatCalendar,
  HeatCalendarGrid,
  HeatCalendarLegend,
  HeatCalendarSummary,
  HeatCalendarTooltip,
} from "@/registry/base-nova/ui/heat-calendar"

const data = generateHeatCalendarData(seededRandom(88), { endDate: "2026-10-13", days: 200, intensity: 40 })

const longDate = new Intl.DateTimeFormat("en-US", { timeZone: "UTC", weekday: "long", month: "long", day: "numeric" })

export default function HeatCalendarCustomComposition() {
  return (
    <div className="w-full max-w-2xl">
      <HeatCalendar
        data={data}
        endDate="2026-10-13"
        weeks={26}
        color="var(--warning)"
        unit="minutes"
        label="Reading time, last 26 weeks"
      >
        <div className="flex items-center justify-between gap-3">
          <span className="text-sm font-medium">Reading time</span>
          <HeatCalendarLegend />
        </div>
        <HeatCalendarGrid>
          <HeatCalendarTooltip>
            {(day) => (
              <div className="flex flex-col gap-0.5">
                <span className="font-medium">{longDate.format(day.time)}</span>
                <span className="text-muted-foreground">
                  {day.count ? `${day.count} minutes read` : "No reading logged"}
                </span>
              </div>
            )}
          </HeatCalendarTooltip>
        </HeatCalendarGrid>
        <HeatCalendarSummary />
      </HeatCalendar>
    </div>
  )
}
