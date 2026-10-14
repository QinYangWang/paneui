import { Label } from "@/registry/base-nova/ui/label"
import { Switch } from "@/registry/base-nova/ui/switch"

export default function SwitchReadOnly() {
  return (
    <Label className="gap-3">
      <Switch readOnly defaultChecked />
      Backups are on for every workspace
    </Label>
  )
}
