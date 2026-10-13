"use client"

import * as React from "react"

import { Button } from "@/registry/base-nova/ui/button"
import { ShaderBackground, type ShaderVariant } from "@/registry/base-nova/ui/shader-background"

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
      <div role="group" aria-label="Shader variant" className="flex flex-wrap gap-1.5 self-center rounded-full bg-muted p-1 shadow-well">
        {VARIANTS.map((v) => (
          <Button
            key={v.value}
            size="xs"
            variant={variant === v.value ? "secondary" : "ghost"}
            aria-pressed={variant === v.value}
            onClick={() => setVariant(v.value)}
          >
            {v.label}
          </Button>
        ))}
      </div>
    </div>
  )
}
