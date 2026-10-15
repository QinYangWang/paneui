import { Field, FieldLabel } from "@/registry/base-nova/ui/field"
import { Input } from "@/registry/base-nova/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/registry/base-nova/ui/select"

const regions = [
  { value: "hkg", label: "Hong Kong" },
  { value: "sin", label: "Singapore" },
  { value: "nrt", label: "Tokyo" },
]

export default function FieldSizes() {
  return (
    <div className="flex w-full max-w-md flex-col gap-5">
      {(["sm", "default", "lg"] as const).map((size) => (
        <div key={size} className="grid grid-cols-2 gap-3">
          <Field size={size}>
            <FieldLabel>Project</FieldLabel>
            <Input defaultValue="Atlas" />
          </Field>
          <Field size={size}>
            <FieldLabel>Region</FieldLabel>
            <Select items={regions} defaultValue="hkg">
              <SelectTrigger className="min-w-0">
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
          </Field>
        </div>
      ))}
    </div>
  )
}
