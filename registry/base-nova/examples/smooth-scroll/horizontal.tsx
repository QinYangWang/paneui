import { SmoothScroll } from "@/registry/base-nova/ui/smooth-scroll"

const STOPS = [
  { city: "Lisbon", days: "3 nights" },
  { city: "Porto", days: "2 nights" },
  { city: "Madrid", days: "4 nights" },
  { city: "Barcelona", days: "3 nights" },
  { city: "Valencia", days: "2 nights" },
  { city: "Seville", days: "3 nights" },
]

export default function SmoothScrollHorizontal() {
  return (
    <SmoothScroll
      orientation="horizontal"
      className="w-full max-w-md rounded-2xl bg-muted shadow-well"
      contentClassName="gap-3 p-4"
    >
      {STOPS.map((s) => (
        <div key={s.city} className="flex w-40 shrink-0 flex-col gap-1 rounded-xl bg-card p-4 shadow-raised">
          <p className="text-sm font-medium text-foreground">{s.city}</p>
          <p className="text-xs text-muted-foreground">{s.days}</p>
        </div>
      ))}
    </SmoothScroll>
  )
}
