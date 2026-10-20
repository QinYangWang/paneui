import {
  DateRangePicker,
  DateRangePickerCalendar,
  DateRangePickerClear,
  DateRangePickerFooter,
  DateRangePickerSummary,
} from "@paneui/ui/components/date-range-picker"

export default function DateRangePickerInline() {
  return (
    <div className="rounded-2xl bg-card p-3 shadow-raised">
      <DateRangePicker>
        <DateRangePickerCalendar />
        <DateRangePickerFooter>
          <DateRangePickerSummary unit={["day", "days"]} />
          <DateRangePickerClear />
        </DateRangePickerFooter>
      </DateRangePicker>
    </div>
  )
}
