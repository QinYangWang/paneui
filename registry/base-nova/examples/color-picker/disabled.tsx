import { ColorPicker, ColorPickerContent, ColorPickerArea, ColorPickerTrigger } from "@/registry/base-nova/ui/color-picker"

export default function ColorPickerDisabled() {
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-muted-foreground">Locked by theme</span>
      <ColorPicker defaultValue="#475569" disabled>
        <ColorPickerTrigger />
        <ColorPickerContent>
          <ColorPickerArea />
        </ColorPickerContent>
      </ColorPicker>
    </div>
  )
}
