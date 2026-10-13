"use client"

import * as React from "react"
import { animate, useMotionValue } from "motion/react"

import { Button } from "@/registry/base-nova/ui/button"
import { VoiceOrb, type VoiceOrbState } from "@/registry/base-nova/ui/voice-orb"

const STATES: { value: VoiceOrbState; label: string }[] = [
  { value: "idle", label: "Idle" },
  { value: "listening", label: "Listening" },
  { value: "thinking", label: "Thinking" },
  { value: "speaking", label: "Speaking" },
]

const CAPTIONS: Record<VoiceOrbState, string> = {
  idle: "Tap to talk",
  listening: "Listening…",
  thinking: "Checking your calendar…",
  speaking: "You're free after 4 pm on Thursday.",
}

export default function VoiceOrbDemo() {
  const [state, setState] = React.useState<VoiceOrbState>("speaking")
  const level = useMotionValue(0)

  // Simulated voice: syllable-ish bursts while listening or speaking.
  React.useEffect(() => {
    if (state !== "listening" && state !== "speaking") {
      level.set(0)
      return
    }
    let stop = false
    let controls: ReturnType<typeof animate> | undefined
    const next = () => {
      if (stop) return
      const peak = state === "speaking" ? 0.35 + Math.random() * 0.65 : Math.random() * 0.5
      controls = animate(level, peak, { duration: 0.08 + Math.random() * 0.18, ease: "easeOut" })
      controls.then(() => {
        if (stop) return
        controls = animate(level, Math.random() * 0.15, { duration: 0.12 + Math.random() * 0.25 })
        controls.then(next)
      })
    }
    next()
    return () => {
      stop = true
      controls?.stop()
    }
  }, [state, level])

  return (
    <div className="flex flex-col items-center gap-5">
      <VoiceOrb state={state} level={level} className="size-44" />
      <p className="h-5 text-sm text-muted-foreground" aria-live="polite">
        {CAPTIONS[state]}
      </p>
      <div className="flex flex-wrap justify-center gap-1.5">
        {STATES.map((s) => (
          <Button
            key={s.value}
            size="sm"
            variant={state === s.value ? "default" : "secondary"}
            aria-pressed={state === s.value}
            onClick={() => setState(s.value)}
          >
            {s.label}
          </Button>
        ))}
      </div>
    </div>
  )
}
