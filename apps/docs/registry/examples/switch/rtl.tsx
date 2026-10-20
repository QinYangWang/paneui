import { DirectionProvider } from "@base-ui/react/direction-provider"
import { Label } from "@paneui/ui/components/label"
import { Switch } from "@paneui/ui/components/switch"

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
