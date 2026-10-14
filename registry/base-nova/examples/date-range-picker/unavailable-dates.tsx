"use client"

import {
  addDays,
  DateRangePicker,
  DateRangePickerCalendar,
  DateRangePickerContent,
  DateRangePickerFooter,
  DateRangePickerSummary,
  DateRangePickerTrigger,
  startOfDay,
} from "@/registry/base-nova/ui/date-range-picker"

const today = startOfDay(new Date())
// Pretend these nights are already booked.
const booked = new Set([3, 4, 10, 17, 18].map((n) => addDays(today, n).toDateString()))

export default function DateRangePickerUnavailableDates() {
  return (
    <DateRangePicker min={today} isDateDisabled={(d) => booked.has(d.toDateString())} closeOnComplete>
      <DateRangePickerTrigger placeholder="Choose your stay" />
      <DateRangePickerContent>
        <DateRangePickerCalendar />
        <DateRangePickerFooter>
          <DateRangePickerSummary />
        </DateRangePickerFooter>
      </DateRangePickerContent>
    </DateRangePicker>
  )
}
