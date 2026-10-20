import { Checkbox } from "@paneui/ui/components/checkbox"
import { Input } from "@paneui/ui/components/input"
import { Label } from "@paneui/ui/components/label"
import { Switch } from "@paneui/ui/components/switch"

export default function LabelDisabled() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-5">
      <Label className="gap-3 font-normal">
        <Checkbox disabled defaultChecked />
        Sync contacts (managed by your admin)
      </Label>
      <div className="flex items-center gap-3">
        <Switch id="label-disabled-switch" disabled />
        <Label htmlFor="label-disabled-switch">Beta features</Label>
      </div>
      <div data-disabled="true" className="group flex flex-col gap-2">
        <Label htmlFor="label-disabled-input">Billing email</Label>
        <Input id="label-disabled-input" disabled defaultValue="billing@example.com" />
      </div>
    </div>
  )
}
