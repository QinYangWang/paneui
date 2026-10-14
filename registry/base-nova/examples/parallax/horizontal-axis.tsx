import { Parallax } from "@/registry/base-nova/ui/parallax"
import { SmoothScroll } from "@/registry/base-nova/ui/smooth-scroll"

const QUOTES = [
  "Booked the table before I'd finished asking.",
  "My Sundays are mine again.",
  "It remembered my seat preference on the second trip.",
]

export default function ParallaxHorizontalAxis() {
  return (
    <SmoothScroll className="h-80 w-full max-w-md rounded-2xl bg-muted shadow-well">
      <div className="flex flex-col gap-10 overflow-hidden py-40">
        {QUOTES.map((q, i) => (
          <Parallax key={q} axis="x" speed={i % 2 ? -0.3 : 0.3} className="px-6">
            <p className="text-lg font-semibold tracking-tight text-balance text-foreground">“{q}”</p>
          </Parallax>
        ))}
      </div>
    </SmoothScroll>
  )
}
