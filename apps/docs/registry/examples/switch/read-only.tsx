import { Label } from "@paneui/ui/components/label"
import { Switch } from "@paneui/ui/components/switch"

export default function SwitchReadOnly() {
  return (
    <Label className="gap-3">
      <Switch readOnly defaultChecked />
      Backups are on for every workspace
    </Label>
  )
}
