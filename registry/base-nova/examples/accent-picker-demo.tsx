import { Button } from "@/registry/base-nova/ui/button"
import { AccentPicker } from "@/registry/base-nova/ui/accent-picker"
import { Switch } from "@/registry/base-nova/ui/switch"

export default function AccentPickerDemo() {
  return (
    <div className="flex flex-col items-center gap-6">
      <AccentPicker showLabels />
      <div className="flex items-center gap-3">
        <Switch defaultChecked aria-label="Preview" />
        <Button size="sm">Primary</Button>
      </div>
    </div>
  )
}
