"use client"

import * as React from "react"
import { DirectionProvider } from "@base-ui/react/direction-provider"
import { Calendar } from "@/registry/base-nova/ui/calendar"
import { Card } from "@/registry/base-nova/ui/card"

export default function CalendarRtl() {
  const [date, setDate] = React.useState<Date | null>(() => new Date())
  return (
    <DirectionProvider direction="rtl">
      <div dir="rtl">
        <Card className="w-fit p-3">
          <Calendar value={date} onValueChange={setDate} locale="ar" />
        </Card>
      </div>
    </DirectionProvider>
  )
}
