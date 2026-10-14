import { RangeSliderRuler } from "@/registry/base-nova/ui/range-slider-ruler"

export default function RangeSliderRulerDisabled() {
  return (
    <div className="w-full max-w-sm">
      <RangeSliderRuler label="Dose (set by your clinician)" unit="mg" min={0} max={50} step={2.5} majorEvery={4} defaultValue={15} disabled />
    </div>
  )
}
