"use client"

import * as React from "react"

import { Calendar, type DateRange } from "@paneui/ui/components/calendar"
import { Card } from "@paneui/ui/components/card"

export default function CalendarRange() {
  const [range, setRange] = React.useState<DateRange>(() => {
    const from = new Date()
    return { from, to: new Date(from.getFullYear(), from.getMonth(), from.getDate() + 5) }
  })
  return (
    <Card className="w-fit p-3">
      <Calendar mode="range" numberOfMonths={2} value={range} onValueChange={setRange} />
    </Card>
  )
}
