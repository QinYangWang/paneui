"use client"

import * as React from "react"

import { Calendar } from "@paneui/ui/components/calendar"
import { Card } from "@paneui/ui/components/card"

export default function CalendarDemo() {
  const [date, setDate] = React.useState<Date | null>(() => new Date())
  return (
    <Card className="w-fit p-3">
      <Calendar value={date} onValueChange={setDate} />
    </Card>
  )
}
