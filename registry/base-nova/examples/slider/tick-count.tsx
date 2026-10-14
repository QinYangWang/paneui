import { Slider } from "@/registry/base-nova/ui/slider"

export default function SliderTickCount() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-3">
      <span className="text-sm font-medium">Tip</span>
      <Slider
        defaultValue={15}
        min={0}
        max={25}
        step={5}
        ticks={6}
        showValue
        format={{ style: "unit", unit: "percent" }}
        aria-label="Tip"
      />
      <div className="flex justify-between text-xs text-muted-foreground tabular-nums">
        <span>0%</span>
        <span>25%</span>
      </div>
    </div>
  )
}
