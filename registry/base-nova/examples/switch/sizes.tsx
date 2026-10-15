import { Label } from "@/registry/base-nova/ui/label"
import { Switch } from "@/registry/base-nova/ui/switch"

export default function SwitchSizes() {
  return (
    <div className="flex items-center gap-6">
      {(["sm", "default", "lg"] as const).map((size) => (
        <Label key={size}>
          <Switch size={size} defaultChecked />
          {size === "sm" ? "Small" : size === "lg" ? "Large" : "Default"}
        </Label>
      ))}
    </div>
  )
}
