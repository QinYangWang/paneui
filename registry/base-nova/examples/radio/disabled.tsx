import { Label } from "@/registry/base-nova/ui/label"
import { Radio, RadioGroup } from "@/registry/base-nova/ui/radio"

export default function RadioDisabled() {
  return (
    <RadioGroup defaultValue="card" disabled aria-label="Payment method">
      <Label className="gap-3 font-normal">
        <Radio value="card" />
        Card ending 4242
      </Label>
      <Label className="gap-3 font-normal">
        <Radio value="invoice" />
        Invoice
      </Label>
    </RadioGroup>
  )
}
