import { RangeSliderBubble } from "@/registry/base-nova/ui/range-slider-bubble"

export default function RangeSliderBubbleDisabled() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-1">
      <div className="flex justify-between text-sm">
        <span className="font-medium text-foreground">Seats</span>
        <span className="text-muted-foreground">Locked by your admin</span>
      </div>
      <RangeSliderBubble label="Seats" min={1} max={50} defaultValue={12} disabled />
    </div>
  )
}
