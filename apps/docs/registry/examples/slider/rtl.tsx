"use client"

import { DirectionProvider } from "@base-ui/react/direction-provider"
import { Slider } from "@paneui/ui/components/slider"

export default function SliderRtl() {
  return (
    <DirectionProvider direction="rtl">
      <div dir="rtl" className="flex w-full max-w-xs flex-col gap-8">
        <div className="flex flex-col gap-3">
          <span className="text-sm font-medium">الإبداع</span>
          <Slider defaultValue={30} showValue aria-label="الإبداع" />
        </div>
        <div className="flex flex-col gap-3">
          <span className="text-sm font-medium">مستوى التفكير</span>
          <Slider defaultValue={1} min={0} max={4} step={1} ticks aria-label="مستوى التفكير" />
        </div>
      </div>
    </DirectionProvider>
  )
}
