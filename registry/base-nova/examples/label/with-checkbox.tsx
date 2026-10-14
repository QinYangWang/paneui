import { Checkbox } from "@/registry/base-nova/ui/checkbox"
import { Label } from "@/registry/base-nova/ui/label"

export default function LabelWithCheckbox() {
  return (
    <div className="flex flex-col gap-3">
      <Label className="gap-3">
        <Checkbox defaultChecked />
        Remember this device
      </Label>
      <Label className="gap-3 font-normal">
        <Checkbox />
        Email me product updates
      </Label>
    </div>
  )
}
