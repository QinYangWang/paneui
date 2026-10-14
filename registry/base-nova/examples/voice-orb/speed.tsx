import { VoiceOrb } from "@/registry/base-nova/ui/voice-orb"

export default function VoiceOrbSpeed() {
  return (
    <div className="flex items-end gap-6">
      {[0, 0.5, 1, 2].map((speed) => (
        <div key={speed} className="flex flex-col items-center gap-2">
          <VoiceOrb state="thinking" speed={speed} className="size-20" />
          <span className="text-xs text-muted-foreground tabular-nums">speed {speed}</span>
        </div>
      ))}
    </div>
  )
}
