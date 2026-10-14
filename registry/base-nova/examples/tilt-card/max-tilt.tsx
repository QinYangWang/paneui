import { TiltCard } from "@/registry/base-nova/ui/tilt-card"

const levels = [
  { max: 4, label: "Subtle", note: "max={4}" },
  { max: 10, label: "Default", note: "max={10}" },
  { max: 20, label: "Playful", note: "max={20}" },
]

export default function TiltCardMaxTilt() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      {levels.map((l) => (
        <TiltCard key={l.max} max={l.max} className="flex w-40 flex-col gap-1 p-5">
          <p className="text-base font-semibold tracking-tight">{l.label}</p>
          <p className="font-mono text-xs text-muted-foreground">{l.note}</p>
        </TiltCard>
      ))}
    </div>
  )
}
