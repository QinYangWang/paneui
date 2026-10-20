import { DatePicker } from "@paneui/ui/components/date-picker"

export default function DatePickerSizes() {
  return (
    <div className="flex flex-col items-start gap-3">
      <DatePicker size="sm" aria-label="Start date" />
      <DatePicker aria-label="Due date" />
      <DatePicker size="lg" aria-label="Launch date" formatOptions={{ dateStyle: "full" }} />
    </div>
  )
}
