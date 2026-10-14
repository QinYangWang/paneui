"use client"

import * as React from "react"

import { Button } from "@/registry/base-nova/ui/button"
import {
  addDays,
  DateRangePicker,
  DateRangePickerCalendar,
  DateRangePickerContent,
  DateRangePickerFooter,
  DateRangePickerSummary,
  DateRangePickerTrigger,
  startOfDay,
  type DateRange,
} from "@/registry/base-nova/ui/date-range-picker"

const today = startOfDay(new Date())

export default function DateRangePickerControlled() {
  const [range, setRange] = React.useState<DateRange>({ from: addDays(today, -6), to: today })
  const [open, setOpen] = React.useState(false)

  return (
    <DateRangePicker
      value={range}
      onValueChange={setRange}
      open={open}
      onOpenChange={setOpen}
      max={today}
      min={addDays(today, -90)}
    >
      <DateRangePickerTrigger formatOptions={{ month: "short", day: "numeric" }} />
      <DateRangePickerContent>
        <DateRangePickerCalendar />
        <DateRangePickerFooter>
          <DateRangePickerSummary unit={["day", "days"]} />
          <Button size="sm" disabled={!range.to} onClick={() => setOpen(false)}>
            Apply
          </Button>
        </DateRangePickerFooter>
      </DateRangePickerContent>
    </DateRangePicker>
  )
}
