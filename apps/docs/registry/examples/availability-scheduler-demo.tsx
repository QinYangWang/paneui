"use client"

import * as React from "react"

import {
  AvailabilityScheduler,
  type WeekAvailability,
} from "@paneui/ui/blocks/availability-scheduler/availability-scheduler"

const initial: WeekAvailability = {
  mon: { enabled: true, ranges: [{ id: "mon-1", start: "09:00", end: "12:00" }, { id: "mon-2", start: "13:00", end: "17:30" }] },
  tue: { enabled: true, ranges: [{ id: "tue-1", start: "09:00", end: "17:00" }] },
  wed: { enabled: true, ranges: [{ id: "wed-1", start: "10:00", end: "16:00" }] },
  thu: { enabled: true, ranges: [{ id: "thu-1", start: "09:00", end: "17:00" }] },
  fri: { enabled: true, ranges: [{ id: "fri-1", start: "09:00", end: "13:00" }] },
  sat: { enabled: false, ranges: [] },
  sun: { enabled: false, ranges: [] },
}

export default function AvailabilitySchedulerDemo() {
  const [week, setWeek] = React.useState(initial)
  const hours = Object.values(week).reduce(
    (sum, d) =>
      sum +
      (d.enabled
        ? d.ranges.reduce((s, r) => {
            const [sh, sm] = r.start.split(":").map(Number)
            const [eh, em] = r.end.split(":").map(Number)
            return s + (eh * 60 + em - sh * 60 - sm) / 60
          }, 0)
        : 0),
    0
  )
  return (
    <div className="flex w-full max-w-xl flex-col gap-3">
      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5 px-1">
        <p className="text-sm font-medium">Office hours</p>
        <p className="text-xs text-muted-foreground tabular-nums">{hours.toFixed(1)} h / week · Asia/Taipei</p>
      </div>
      <AvailabilityScheduler value={week} onValueChange={setWeek} />
    </div>
  )
}
