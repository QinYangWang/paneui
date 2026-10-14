"use client"

import {
  ReturnsCalendar,
  ReturnsCalendarGrid,
  ReturnsCalendarSummary,
  ReturnsCalendarTooltip,
  type ReturnsCalendarYear,
} from "@/registry/base-nova/ui/returns-calendar"

const data: ReturnsCalendarYear[] = [
  { year: 2025, returns: [3.1, -2.2, -4.8, 1.0, 5.6, 4.1, 2.4, 0.6, 3.3, 1.9, -0.7, 1.2] },
  { year: 2026, returns: [2.6, 0.4, -1.9, 3.8, -2.4, 2.9, 1.5, 1.1, -3.0, null, null, null] },
]

const startingBalance = 10_000

export default function ReturnsCalendarCustomTooltip() {
  return (
    <div className="w-full max-w-4xl">
      <ReturnsCalendar data={data} label="Portfolio monthly returns">
        <ReturnsCalendarGrid>
          <ReturnsCalendarTooltip>
            {(d) => (
              <div className="flex flex-col gap-0.5">
                <span className="font-medium">{d.title}</span>
                <span className="text-muted-foreground tabular-nums">
                  {d.value >= 0 ? "Gained" : "Lost"} ${Math.abs((startingBalance * d.value) / 100).toFixed(0)} on $10,000
                </span>
              </div>
            )}
          </ReturnsCalendarTooltip>
        </ReturnsCalendarGrid>
        <ReturnsCalendarSummary />
      </ReturnsCalendar>
    </div>
  )
}
