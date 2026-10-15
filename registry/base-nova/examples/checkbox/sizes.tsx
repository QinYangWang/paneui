import { Checkbox } from "@/registry/base-nova/ui/checkbox"
import { Label } from "@/registry/base-nova/ui/label"

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
