"use client"

import * as React from "react"

import { Button } from "@paneui/ui/components/button"
import { CoverArt } from "@paneui/ui/components/cover-art"
import { RefreshIcon } from "@paneui/ui/icons"

export default function CoverArtShader() {
  const [seed, setSeed] = React.useState("summer-reading")
  return (
    <div className="flex w-full max-w-2xl flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="overflow-hidden rounded-xl shadow-raised">
          <CoverArt variant="shader" palette="random" seed={seed} aria-label="Random palette" className="aspect-video" />
        </div>
        <div className="overflow-hidden rounded-xl shadow-raised">
          <CoverArt variant="shader" shader="grain-gradient" palette={["#ff8a3d", "#ffd36e", "#8fd3ff"]} aria-label="Custom palette" className="aspect-video" />
        </div>
      </div>
      <Button variant="outline" size="sm" className="self-start" onClick={() => setSeed(Math.random().toString(36).slice(2))}>
        <RefreshIcon />
        Shuffle
      </Button>
    </div>
  )
}
