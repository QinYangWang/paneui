import { RangeSliderInline } from "@/registry/base-nova/ui/range-slider-inline"

export default function RangeSliderInlineStops() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <RangeSliderInline label="Snaps to stops" defaultValue={44} snapToStops />
      <RangeSliderInline label="Free" defaultValue={44} />
      <RangeSliderInline label="No stops" defaultValue={44} showStops={false} />
    </div>
  )
}
