import { Parallax } from "@/registry/base-nova/ui/parallax"
import { SmoothScroll } from "@/registry/base-nova/ui/smooth-scroll"

const LAYERS = [
  { speed: 0.4, label: "0.4 — far" },
  { speed: 0, label: "0 — still" },
  { speed: -0.3, label: "-0.3 — near" },
]

export default function ParallaxSpeeds() {
  return (
    <SmoothScroll className="h-80 w-full max-w-md rounded-2xl bg-muted shadow-well">
      <div className="flex flex-col items-center gap-6 py-40">
        <p className="text-xs text-muted-foreground">Scroll — each card drifts at its own speed</p>
        <div className="grid w-full grid-cols-3 gap-3 px-4">
          {LAYERS.map((l) => (
            <Parallax key={l.label} speed={l.speed}>
              <div className="flex h-28 items-center justify-center rounded-xl bg-card p-3 text-center text-xs font-medium text-foreground shadow-raised tabular-nums">
                {l.label}
              </div>
            </Parallax>
          ))}
        </div>
      </div>
    </SmoothScroll>
  )
}
