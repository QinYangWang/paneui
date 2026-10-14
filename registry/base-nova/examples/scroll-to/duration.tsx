import { ScrollTo } from "@/registry/base-nova/ui/scroll-to"
import { SmoothScroll } from "@/registry/base-nova/ui/smooth-scroll"

const DAYS = Array.from({ length: 31 }, (_, i) => i + 1)

export default function ScrollToDuration() {
  return (
    <SmoothScroll className="h-72 w-full max-w-md rounded-2xl bg-muted shadow-well">
      <div className="sticky top-0 z-10 flex gap-2 bg-muted p-3">
        <ScrollTo to="#scroll-to-duration-day-31" size="sm">
          Default ease
        </ScrollTo>
        <ScrollTo to="#scroll-to-duration-day-31" duration={2} size="sm">
          2 s glide
        </ScrollTo>
        <ScrollTo to={0} duration={0.4} size="sm" variant="ghost">
          Back to the 1st
        </ScrollTo>
      </div>
      <ol className="flex flex-col gap-2 px-3 pb-3">
        {DAYS.map((d) => (
          <li
            key={d}
            id={`scroll-to-duration-day-${d}`}
            className="rounded-lg bg-card px-3 py-2 text-sm text-foreground shadow-raised tabular-nums"
          >
            October {d}
          </li>
        ))}
      </ol>
    </SmoothScroll>
  )
}
