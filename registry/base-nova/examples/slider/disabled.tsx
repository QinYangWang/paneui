import { Slider } from "@/registry/base-nova/ui/slider"

export default function SliderDisabled() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-3">
      <span className="text-sm font-medium">Storage limit (set by admin)</span>
      <Slider defaultValue={30} disabled aria-label="Storage limit" />
    </div>
  )
}
