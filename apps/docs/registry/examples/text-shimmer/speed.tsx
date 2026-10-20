import { TextShimmer } from "@paneui/ui/components/text-shimmer"

const SPEEDS = [
  { duration: 1.2, label: "Fast · 1.2s" },
  { duration: 2.2, label: "Default · 2.2s" },
  { duration: 4, label: "Slow · 4s" },
]

export default function TextShimmerSpeed() {
  return (
    <div className="flex flex-col items-start gap-3">
      {SPEEDS.map((s) => (
        <div key={s.duration} className="flex items-center gap-3">
          <span className="w-28 text-xs text-muted-foreground">{s.label}</span>
          <TextShimmer duration={s.duration} className="text-sm font-medium">
            Generating summary…
          </TextShimmer>
        </div>
      ))}
    </div>
  )
}
