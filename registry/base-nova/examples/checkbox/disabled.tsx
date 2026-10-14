import { Checkbox } from "@/registry/base-nova/ui/checkbox"
import { Label } from "@/registry/base-nova/ui/label"

export default function CheckboxDisabled() {
  return (
    <div className="flex flex-col gap-3">
      <Label className="gap-3 font-normal">
        <Checkbox disabled />
        Unchecked
      </Label>
      <Label className="gap-3 font-normal">
        <Checkbox disabled defaultChecked />
        Checked
      </Label>
      <Label className="gap-3 font-normal">
        <Checkbox disabled indeterminate />
        Indeterminate
      </Label>
    </div>
  )
}
