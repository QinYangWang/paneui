import { Label } from "@/registry/base-nova/ui/label"
import { Radio, RadioGroup } from "@/registry/base-nova/ui/radio"

export default function RadioHorizontal() {
  return (
    <RadioGroup defaultValue="monthly" aria-label="Billing period" className="flex-row gap-6">
      <Label className="gap-2 font-normal">
        <Radio value="monthly" />
        Monthly
      </Label>
      <Label className="gap-2 font-normal">
        <Radio value="yearly" />
        Yearly
      </Label>
    </RadioGroup>
  )
}
