"use client"

import { useMotionValue } from "motion/react"

import { VoiceOrb } from "@/registry/base-nova/ui/voice-orb"

export default function VoiceOrbLevel() {
  const level = useMotionValue(0.4)
  return (
    <div className="flex flex-col items-center gap-4">
      <VoiceOrb state="speaking" level={level} className="size-36" />
      <label className="flex w-full max-w-xs flex-col gap-1.5 text-sm text-muted-foreground">
        Audio level
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          defaultValue={0.4}
          onChange={(e) => level.set(Number(e.currentTarget.value))}
          className="w-full accent-primary"
        />
      </label>
    </div>
  )
}
