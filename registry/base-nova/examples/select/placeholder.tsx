import { Label } from "@/registry/base-nova/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/registry/base-nova/ui/select"

const timezones = [
  { value: null, label: "Select a timezone" },
  { value: "asia-taipei", label: "Taipei (GMT+8)" },
  { value: "asia-tokyo", label: "Tokyo (GMT+9)" },
  { value: "europe-london", label: "London (GMT+1)" },
  { value: "america-new-york", label: "New York (GMT−4)" },
]

export default function SelectPlaceholder() {
  return (
    <div className="flex w-full max-w-64 flex-col gap-2">
      <Label>Timezone</Label>
      <Select items={timezones}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {timezones.slice(1).map((tz) => (
            <SelectItem key={tz.value} value={tz.value}>
              {tz.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
