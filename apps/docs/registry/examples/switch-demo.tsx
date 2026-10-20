import { Label } from "@paneui/ui/components/label"
import { Switch } from "@paneui/ui/components/switch"

export default function SwitchDemo() {
  return (
    <div className="flex flex-col gap-3">
      <Label className="gap-3">
        <Switch defaultChecked />
        Auto-approve under $50
      </Label>
      <Label className="gap-3">
        <Switch />
        Daily digest
      </Label>
      <Label className="gap-3">
        <Switch disabled />
        Disabled
      </Label>
    </div>
  )
}
