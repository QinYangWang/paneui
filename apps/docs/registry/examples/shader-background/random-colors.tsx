"use client"

import * as React from "react"

import { Button } from "@paneui/ui/components/button"
import { ShaderBackground } from "@paneui/ui/components/shader-background"
import { RefreshIcon } from "@paneui/ui/icons"

export default function ShaderBackgroundRandomColors() {
  const [seed, setSeed] = React.useState("launch")
  return (
    <ShaderBackground colors="random" seed={seed} className="flex h-56 w-full max-w-lg items-end rounded-3xl p-6 shadow-surface">
      <Button variant="glass" size="sm" onClick={() => setSeed(Math.random().toString(36).slice(2))}>
        <RefreshIcon />
        Shuffle
      </Button>
    </ShaderBackground>
  )
}
