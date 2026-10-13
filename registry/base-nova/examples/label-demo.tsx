import { Label } from "@/registry/base-nova/ui/label"
import { Switch } from "@/registry/base-nova/ui/switch"

export default function LabelDemo() {
  return (
    <Label className="gap-3">
      <Switch defaultChecked />
      Notify me when tasks finish
    </Label>
  )
}
