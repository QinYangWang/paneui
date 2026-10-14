"use client"

import * as React from "react"

import { AspectRatio, AspectRatioImage } from "@/registry/base-nova/ui/aspect-ratio"
import { Button } from "@/registry/base-nova/ui/button"

// A self-contained 1600×900 landscape so the docs work offline.
const LANDSCAPE = `data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900">
    <defs><linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="oklch(0.62 0.12 258)"/><stop offset="1" stop-color="oklch(0.86 0.06 60)"/></linearGradient></defs>
    <rect width="1600" height="900" fill="url(#sky)"/>
    <circle cx="1120" cy="380" r="110" fill="oklch(0.95 0.05 80)"/>
    <path d="M0 640 L360 420 L620 600 L900 360 L1240 620 L1600 460 L1600 900 L0 900 Z" fill="oklch(0.42 0.06 258)"/>
    <path d="M0 760 L420 600 L820 740 L1200 620 L1600 760 L1600 900 L0 900 Z" fill="oklch(0.3 0.04 258)"/>
  </svg>`
)}`

const ratios = [
  { label: "16:9", value: 16 / 9 },
  { label: "1:1", value: 1 },
  { label: "4:5", value: 4 / 5 },
]

export default function AspectRatioWithImage() {
  const [ratio, setRatio] = React.useState(ratios[0])

  return (
    <div className="flex w-full max-w-72 flex-col items-center gap-4">
      <div className="flex h-80 w-full items-center justify-center">
        <div className="w-full max-w-(--frame-w)" style={{ "--frame-w": `min(100%, ${18 * ratio.value}rem)` } as React.CSSProperties}>
          <AspectRatio ratio={ratio.value}>
            <AspectRatioImage src={LANDSCAPE} width={1600} height={900} alt="Mountains at sunset" />
          </AspectRatio>
        </div>
      </div>
      <div className="flex gap-2">
        {ratios.map((r) => (
          <Button
            key={r.label}
            size="sm"
            variant={r.label === ratio.label ? "default" : "secondary"}
            aria-pressed={r.label === ratio.label}
            onClick={() => setRatio(r)}
          >
            {r.label}
          </Button>
        ))}
      </div>
    </div>
  )
}
