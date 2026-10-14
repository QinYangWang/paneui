import { RangeSliderRuler } from "@/registry/base-nova/ui/range-slider-ruler"

export default function RangeSliderRulerUncontrolled() {
  return (
    <div className="w-full max-w-sm">
      <RangeSliderRuler label="Daily step goal" min={2000} max={20000} step={500} majorEvery={4} defaultValue={8000} />
    </div>
  )
}
