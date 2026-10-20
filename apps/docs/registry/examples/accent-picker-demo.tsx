import { Button } from "@paneui/ui/components/button"
import { AccentPicker } from "@paneui/ui/components/accent-picker"
import { Switch } from "@paneui/ui/components/switch"

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
