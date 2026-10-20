import { Checkbox } from "@paneui/ui/components/checkbox"
import { Label } from "@paneui/ui/components/label"

export default function CheckboxSizes() {
  return (
    <div className="flex items-center gap-6">
      {(["sm", "default", "lg"] as const).map((size) => (
        <Label key={size}>
          <Checkbox size={size} defaultChecked />
          {size === "sm" ? "Small" : size === "lg" ? "Large" : "Default"}
        </Label>
      ))}
    </div>
  )
}
