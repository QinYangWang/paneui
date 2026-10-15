import { Label } from "@/registry/base-nova/ui/label"
import { Radio, RadioGroup } from "@/registry/base-nova/ui/radio"

export default function RadioSizes() {
  return (
    <div className="flex items-start gap-10">
      {(["sm", "default", "lg"] as const).map((size) => (
        <RadioGroup key={size} size={size} defaultValue="weekly" aria-label={`Digest (${size})`}>
          <Label>
            <Radio value="daily" />
            Daily
          </Label>
          <Label>
            <Radio value="weekly" />
            Weekly
          </Label>
        </RadioGroup>
      ))}
    </div>
  )
}
