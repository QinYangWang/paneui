import { RangeSliderWave } from "@/registry/base-nova/ui/range-slider-wave"

export default function RangeSliderWaveBars() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-5">
      <RangeSliderWave label="Treble · 14 bars, tight crest" bars={14} spread={1.2} defaultValue={40} />
      <RangeSliderWave label="Reverb · 40 bars, wide crest" bars={40} spread={5} defaultValue={65} />
    </div>
  )
}
