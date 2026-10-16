import { DirectionProvider } from "@base-ui/react/direction-provider"
import { Label } from "@/registry/base-nova/ui/label"
import { Switch } from "@/registry/base-nova/ui/switch"

export default function SwitchRtl() {
  return (
    <DirectionProvider direction="rtl">
      <div dir="rtl" className="flex flex-col gap-3">
        <Label className="gap-3">
          <Switch defaultChecked />
          الموافقة التلقائية تحت ٥٠ دولارًا
        </Label>
        <Label className="gap-3">
          <Switch />
          ملخص يومي
        </Label>
      </div>
    </DirectionProvider>
  )
}
