import { Slider } from "@/registry/base-nova/ui/slider"

const bands = [
  { label: "Bass", value: 70 },
  { label: "Mid", value: 45 },
  { label: "Treble", value: 60 },
]

export default function SliderVertical() {
  return (
    <div className="flex h-48 items-stretch justify-center gap-8">
      {bands.map((band) => (
        <div key={band.label} className="flex flex-col items-center gap-2">
          <div className="min-h-0 flex-1">
            <Slider orientation="vertical" defaultValue={band.value} aria-label={band.label} />
          </div>
          <span className="text-xs text-muted-foreground">{band.label}</span>
        </div>
      ))}
    </div>
  )
}
