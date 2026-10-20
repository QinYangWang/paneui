import { Label } from "@paneui/ui/components/label"
import { Switch } from "@paneui/ui/components/switch"

export default function LabelDemo() {
  return (
    <Label className="gap-3">
      <Switch defaultChecked />
      Notify me when tasks finish
    </Label>
  )
}
