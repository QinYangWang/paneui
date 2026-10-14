import {
  DateRangePicker,
  DateRangePickerCalendar,
  DateRangePickerContent,
  DateRangePickerFooter,
  DateRangePickerSummary,
  DateRangePickerTrigger,
} from "@/registry/base-nova/ui/date-range-picker"

export default function DateRangePickerLocale() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <DateRangePicker locale="ja-JP" weekStartsOn={1}>
        <DateRangePickerTrigger placeholder="日付を選択" formatOptions={{ month: "long", day: "numeric" }} />
        <DateRangePickerContent>
          <DateRangePickerCalendar />
          <DateRangePickerFooter>
            <DateRangePickerSummary unit={["泊", "泊"]} />
          </DateRangePickerFooter>
        </DateRangePickerContent>
      </DateRangePicker>
      <DateRangePicker locale="de-DE">
        <DateRangePickerTrigger placeholder="Zeitraum wählen" />
        <DateRangePickerContent>
          <DateRangePickerCalendar />
          <DateRangePickerFooter>
            <DateRangePickerSummary unit={null} />
          </DateRangePickerFooter>
        </DateRangePickerContent>
      </DateRangePicker>
    </div>
  )
}
