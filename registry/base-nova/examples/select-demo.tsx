import { Label } from "@/registry/base-nova/ui/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/registry/base-nova/ui/select"

const models = [
  { value: null, label: "Choose a model" },
  { value: "fast", label: "Fast" },
  { value: "balanced", label: "Balanced" },
  { value: "deep", label: "Deep reasoning" },
  { value: "local", label: "On-device" },
]

export default function SelectDemo() {
  return (
    <div className="flex w-full max-w-56 flex-col gap-2">
      <Label>Model</Label>
      <Select items={models} defaultValue="balanced">
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Cloud</SelectLabel>
            {models.slice(1, 4).map((m) => (
              <SelectItem key={m.value} value={m.value}>
                {m.label}
              </SelectItem>
            ))}
          </SelectGroup>
          <SelectSeparator />
          <SelectItem value="local">On-device</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
