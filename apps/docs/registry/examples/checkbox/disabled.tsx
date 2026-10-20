import { Checkbox } from "@paneui/ui/components/checkbox"
import { Label } from "@paneui/ui/components/label"

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
