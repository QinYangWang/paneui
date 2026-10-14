import { VoiceOrb } from "@/registry/base-nova/ui/voice-orb"

const PALETTES = [
  { label: "Ocean", colors: ["#3b82f6", "#a5f3fc", "#312e81"] },
  { label: "Ember", colors: ["#f97316", "#fde68a", "#7c2d12"] },
  { label: "Moss", colors: ["#22c55e", "#d9f99d", "#14532d"] },
  { label: "Orchid", colors: ["#a855f7", "#f5d0fe", "#3b0764"] },
] as const

export default function VoiceOrbColors() {
  return (
    <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
      {PALETTES.map((p) => (
        <div key={p.label} className="flex flex-col items-center gap-2">
          <VoiceOrb state="speaking" level={0.5} colors={p.colors} className="size-24" />
          <span className="text-xs text-muted-foreground">{p.label}</span>
        </div>
      ))}
    </div>
  )
}
