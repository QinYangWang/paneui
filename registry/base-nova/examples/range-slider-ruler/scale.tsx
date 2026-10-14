import { RangeSliderRuler } from "@/registry/base-nova/ui/range-slider-ruler"

export default function RangeSliderRulerScale() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-8">
      <RangeSliderRuler label="Dense: gap 6, label every 10" unit="cm" min={100} max={220} gap={6} majorEvery={10} defaultValue={172} />
      <RangeSliderRuler label="Roomy: gap 24, label every 2" unit="cups" min={0} max={12} gap={24} majorEvery={2} defaultValue={4} />
    </div>
  )
}
