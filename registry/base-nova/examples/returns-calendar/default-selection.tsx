"use client"

import { ReturnsCalendar, type ReturnsCalendarYear } from "@/registry/base-nova/ui/returns-calendar"

const data: ReturnsCalendarYear[] = [
  { year: 2024, returns: [0.8, 1.9, -0.6, 2.4, 1.1, -1.3, 0.4, 3.0, 1.7, -0.9, 2.2, 0.6] },
  { year: 2025, returns: [-1.2, 0.5, 2.8, 1.4, -2.6, 0.9, 1.8, 2.1, -0.3, 1.0, 0.7, 1.5] },
  { year: 2026, returns: [2.0, -0.8, 1.2, 0.6, 1.9, -1.1, 0.3, 2.4, 1.6, null, null, null] },
]

export default function ReturnsCalendarDefaultSelection() {
  return (
    <div className="w-full max-w-3xl">
      <ReturnsCalendar
        data={data}
        defaultSelection={{ start: { year: 2025, month: 6 }, end: { year: 2025, month: 11 } }}
        label="Bond fund monthly returns"
      />
    </div>
  )
}
