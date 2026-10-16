import { TextShimmer } from "@/registry/base-nova/ui/text-shimmer"

const SPREADS = [6, 14, 28]

export default function TextShimmerSpread() {
  return (
    <div className="flex flex-col items-start gap-3">
      {SPREADS.map((spread) => (
        <div key={spread} className="flex items-center gap-3">
          <span className="w-20 text-xs text-muted-foreground tabular-nums">spread {spread}</span>
          <TextShimmer spread={spread} className="text-lg font-semibold">
            Searching the web
          </TextShimmer>
        </div>
      ))}
    </div>
  )
}
