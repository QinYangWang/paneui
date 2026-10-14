import { Checkbox } from "@/registry/base-nova/ui/checkbox"
import { Input } from "@/registry/base-nova/ui/input"
import { Label } from "@/registry/base-nova/ui/label"
import { Switch } from "@/registry/base-nova/ui/switch"

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
