"use client"

import * as React from "react"

import { SegmentedControl, SegmentedControlItem } from "@paneui/ui/components/segmented-control"
import { ShaderBackground, type ShaderVariant } from "@paneui/ui/components/shader-background"

const VARIANTS: { value: ShaderVariant; label: string }[] = [
  { value: "mesh-gradient", label: "Mesh" },
  { value: "grain-gradient", label: "Grain" },
  { value: "warp", label: "Warp" },
  { value: "waves", label: "Waves" },
  { value: "dot-orbit", label: "Orbit" },
]

export default function ShaderBackgroundDemo() {
  const [variant, setVariant] = React.useState<ShaderVariant>("mesh-gradient")
  return (
    <div className="flex w-full max-w-lg flex-col gap-3">
      <ShaderBackground
        variant={variant}
        className="flex h-64 flex-col justify-end rounded-3xl p-6 shadow-surface"
      >
        <div className="max-w-xs rounded-2xl bg-card/80 p-4 shadow-raised backdrop-blur-md">
          <p className="text-sm font-semibold">Your week, handled</p>
          <p className="mt-1 text-sm text-muted-foreground">Colours come from your theme tokens, so it follows light and dark.</p>
        </div>
      </ShaderBackground>
      <SegmentedControl
        size="sm"
        aria-label="Shader variant"
        value={variant}
        onValueChange={(v) => setVariant(v as ShaderVariant)}
        className="self-center"
      >
        {VARIANTS.map((v) => (
          <SegmentedControlItem key={v.value} value={v.value}>
            {v.label}
          </SegmentedControlItem>
        ))}
      </SegmentedControl>
    </div>
  )
}
