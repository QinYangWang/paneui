"use client"

import { ReturnsCalendar, type ReturnsCalendarYear } from "@/registry/base-nova/ui/returns-calendar"

const data: ReturnsCalendarYear[] = [
  { year: 2022, returns: [-5.3, -3.1, 3.6, -8.8, 0.1, -8.4, 9.1, -4.2, -9.3, 8.0, 5.4, -5.9] },
  { year: 2023, returns: [6.2, -2.6, 3.5, 1.5, 0.3, 6.5, 3.1, -1.8, -4.9, -2.2, 8.9, 4.4] },
  { year: 2024, returns: [1.6, 5.2, 3.1, -4.2, 4.8, 3.5, 1.1, 2.3, 2.0, -1.0, 5.7, -2.5] },
  { year: 2025, returns: [2.7, -1.4, -5.8, -0.8, 6.2, 5.0, 2.2, 1.9, 3.5, 2.3, 0.1, 0.9] },
  { year: 2026, returns: [1.4, -0.4, 2.8, 3.9, -1.7, 2.6, 1.2, 0.8, -2.1, null, null, null] },
]

export default function ReturnsCalendarYearsView() {
  return (
    <div className="w-full max-w-3xl">
      <ReturnsCalendar data={data} defaultView="years" label="Index fund yearly returns" />
    </div>
  )
}
