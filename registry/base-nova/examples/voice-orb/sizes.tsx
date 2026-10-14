import { VoiceOrb } from "@/registry/base-nova/ui/voice-orb"

export default function VoiceOrbSizes() {
  return (
    <div className="flex items-center gap-6">
      <VoiceOrb size={40} state="listening" level={0.3} aria-label="Mini voice button" />
      <VoiceOrb size={72} state="listening" level={0.3} />
      <VoiceOrb className="size-32" state="listening" level={0.3} />
    </div>
  )
}
