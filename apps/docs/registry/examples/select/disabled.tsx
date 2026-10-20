import { Label } from "@paneui/ui/components/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@paneui/ui/components/select"

const plans = [
  { value: "starter", label: "Starter" },
  { value: "pro", label: "Pro" },
  { value: "business", label: "Business" },
]

const regions = [
  { value: "apac", label: "Asia Pacific" },
  { value: "eu", label: "Europe" },
  { value: "us", label: "United States" },
]

export default function SelectDisabled() {
  return (
    <div className="flex w-full max-w-64 flex-col gap-6">
      <div className="flex flex-col gap-2">
        <Label>Plan</Label>
        <Select items={plans} defaultValue="pro">
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="starter">Starter</SelectItem>
            <SelectItem value="pro">Pro</SelectItem>
            <SelectItem value="business" disabled>
              Business (contact sales)
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-2">
        <Label>Billing region</Label>
        <Select items={regions} defaultValue="apac" disabled>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {regions.map((r) => (
              <SelectItem key={r.value} value={r.value}>
                {r.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
