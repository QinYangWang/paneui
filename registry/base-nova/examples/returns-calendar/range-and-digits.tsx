"use client"

import { ReturnsCalendar, type ReturnsCalendarYear } from "@/registry/base-nova/ui/returns-calendar"

const data: ReturnsCalendarYear[] = [
  { year: 2025, returns: [0.42, 0.38, 0.41, 0.35, 0.44, 0.4, 0.39, 0.43, 0.37, 0.41, 0.36, 0.45] },
  { year: 2026, returns: [0.4, 0.37, 0.42, 0.39, 0.33, 0.36, 0.38, 0.41, 0.35, null, null, null] },
]

export default function ReturnsCalendarRangeAndDigits() {
  return (
    <div className="w-full max-w-3xl">
      <ReturnsCalendar data={data} range={2} digits={2} label="Money market fund monthly yield" />
    </div>
  )
}
