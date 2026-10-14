"use client"

import * as React from "react"

import { type LightboxItem, MorphingLightbox } from "@/registry/base-nova/ui/morphing-lightbox"

/** Offline placeholder: a soft two-stop gradient as an SVG data URL. */
function placeholder(hue: number) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600"><defs><linearGradient id="g" x2="1" y2="1"><stop offset="0" stop-color="oklch(0.82 0.07 ${hue})"/><stop offset="1" stop-color="oklch(0.5 0.12 ${hue + 50})"/></linearGradient></defs><rect width="100%" height="100%" fill="url(#g)"/></svg>`
  return `data:image/svg+xml,${encodeURIComponent(svg)}`
}

const ROOMS: LightboxItem[] = [
  { alt: "Living room", caption: "Living room — south-facing, 24 m².", hue: 40 },
  { alt: "Kitchen", caption: "Kitchen — new appliances, gas hob.", hue: 160 },
  { alt: "Bedroom", caption: "Bedroom — fits a king bed and a desk.", hue: 260 },
].map(({ hue, ...rest }) => ({ ...rest, src: placeholder(hue), width: 800, height: 600 }))

export default function MorphingLightboxIndexChange() {
  const [viewing, setViewing] = React.useState<number | null>(null)
  return (
    <div className="flex w-full max-w-lg flex-col gap-3">
      <MorphingLightbox items={ROOMS} onIndexChange={setViewing} />
      <p className="text-xs text-muted-foreground">
        {viewing === null ? "Closed" : `Viewing ${ROOMS[viewing].alt}`}
      </p>
    </div>
  )
}
