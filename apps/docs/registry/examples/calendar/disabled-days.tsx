import { Calendar } from "@paneui/ui/components/calendar"
import { Card } from "@paneui/ui/components/card"

const weekend = (d: Date) => d.getDay() === 0 || d.getDay() === 6

export default function CalendarDisabledDays() {
  return (
    <Card className="w-fit p-3">
      <Calendar min={new Date()} disabled={weekend} weekStartsOn={1} />
    </Card>
  )
}
