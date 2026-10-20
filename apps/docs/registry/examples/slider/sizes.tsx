import { Slider } from "@paneui/ui/components/slider"

export default function SliderSizes() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-6">
      <Slider size="sm" defaultValue={30} aria-label="Small" />
      <Slider defaultValue={50} aria-label="Default" />
      <Slider size="lg" defaultValue={70} aria-label="Large" />
    </div>
  )
}
