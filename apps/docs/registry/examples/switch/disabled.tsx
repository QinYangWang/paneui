import { Label } from "@paneui/ui/components/label"
import { Switch } from "@paneui/ui/components/switch"

export default function SwitchDisabled() {
  return (
    <div className="flex flex-col gap-3">
      <Label className="gap-3">
        <Switch disabled defaultChecked />
        Two-factor sign-in (required by your admin)
      </Label>
      <Label className="gap-3">
        <Switch disabled />
        Beta features (not available on this plan)
      </Label>
    </div>
  )
}
