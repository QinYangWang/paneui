import { VoiceOrb, type VoiceOrbState } from "@/registry/base-nova/ui/voice-orb"

const STATES: { state: VoiceOrbState; label: string; level: number }[] = [
  { state: "idle", label: "Idle", level: 0 },
  { state: "listening", label: "Listening", level: 0.3 },
  { state: "thinking", label: "Thinking", level: 0 },
  { state: "speaking", label: "Speaking", level: 0.7 },
]

export default function VoiceOrbStates() {
  return (
    <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
      {STATES.map((s) => (
        <div key={s.state} className="flex flex-col items-center gap-2">
          <VoiceOrb state={s.state} level={s.level} className="size-24" />
          <span className="text-xs text-muted-foreground">{s.label}</span>
        </div>
      ))}
    </div>
  )
}
