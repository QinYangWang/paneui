"use client"

import * as React from "react"

import { AspectRatio } from "@/registry/base-nova/ui/aspect-ratio"
import { Button } from "@/registry/base-nova/ui/button"

export default function AspectRatioNotAnimated() {
  const [wide, setWide] = React.useState(true)

  return (
    <div className="flex w-full max-w-sm flex-col items-center gap-4">
      <AspectRatio ratio={wide ? 21 / 9 : 16 / 9} animated={false} contentClassName="flex items-center justify-center">
        <div className="absolute inset-0 bg-linear-to-br from-primary/40 to-success/30" />
        <span className="relative text-sm font-medium tabular-nums">{wide ? "21:9" : "16:9"}</span>
      </AspectRatio>
      <Button variant="secondary" size="sm" onClick={() => setWide((w) => !w)}>
        Switch to {wide ? "16:9" : "21:9"}
      </Button>
    </div>
  )
}
