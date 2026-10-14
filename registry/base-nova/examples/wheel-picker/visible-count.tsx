import { WheelPicker } from "@/registry/base-nova/ui/wheel-picker"

const years = Array.from({ length: 40 }, (_, i) => String(2026 - i))

export default function WheelPickerVisibleCount() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-6">
      <div className="flex w-28 flex-col items-center gap-2">
        <WheelPicker aria-label="Birth year, compact" options={years} defaultValue="1999" visibleCount={3} className="w-full" />
        <span className="font-mono text-xs text-muted-foreground">visibleCount={3}</span>
      </div>
      <div className="flex w-28 flex-col items-center gap-2">
        <WheelPicker aria-label="Birth year, tall" options={years} defaultValue="1999" visibleCount={7} itemHeight={44} className="w-full" />
        <span className="font-mono text-xs text-muted-foreground">7 rows · 44px</span>
      </div>
    </div>
  )
}
