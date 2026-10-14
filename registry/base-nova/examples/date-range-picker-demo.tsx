"use client"

import * as React from "react"

import {
  addDays,
  DateRangePicker,
  DateRangePickerCalendar,
  DateRangePickerClear,
  DateRangePickerContent,
  DateRangePickerFooter,
  DateRangePickerPreset,
  DateRangePickerPresets,
  DateRangePickerSummary,
  DateRangePickerTrigger,
  startOfDay,
  type DateRange,
} from "@/registry/base-nova/ui/date-range-picker"

function nextWeekend() {
  const today = startOfDay(new Date())
  const friday = addDays(today, (5 - today.getDay() + 7) % 7 || 7)
  return { from: friday, to: addDays(friday, 2) }
}

export default function DateRangePickerDemo() {
  const [range, setRange] = React.useState<DateRange>({})
  const today = startOfDay(new Date())

  return (
    <DateRangePicker value={range} onValueChange={setRange} numberOfMonths={2} min={today}>
      <DateRangePickerTrigger placeholder="Check-in – Check-out" />
      <DateRangePickerContent>
        <div className="flex gap-3">
          <div className="hidden border-r border-border pr-3 sm:block">
            <DateRangePickerPresets>
              <DateRangePickerPreset range={nextWeekend}>This weekend</DateRangePickerPreset>
              <DateRangePickerPreset range={() => ({ from: today, to: addDays(today, 7) })}>Next 7 nights</DateRangePickerPreset>
              <DateRangePickerPreset range={() => ({ from: addDays(today, 14), to: addDays(today, 28) })}>
                Two weeks, later
              </DateRangePickerPreset>
            </DateRangePickerPresets>
          </div>
          <DateRangePickerCalendar />
        </div>
        <DateRangePickerFooter>
          <DateRangePickerSummary />
          <DateRangePickerClear />
        </DateRangePickerFooter>
      </DateRangePickerContent>
    </DateRangePicker>
  )
}
