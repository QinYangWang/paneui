import { ScrollProgress } from "@paneui/ui/components/scroll-progress"
import { SmoothScroll } from "@paneui/ui/components/smooth-scroll"

const PARAGRAPHS = [
  "The best week is the one you barely have to think about. Appointments land where they fit, the fridge refills itself, and the small admin that usually eats an evening is simply done.",
  "Start with the fixed points: work, sleep, the people you see every week. Everything else bends around them, not the other way round.",
  "Then batch the errands. One trip, one list, one window for deliveries. Fewer context switches means more of the day is actually yours.",
  "Leave one evening empty on purpose. An unplanned night is not a gap in the schedule — it is the point of having one.",
  "Finally, review on Sunday. Ten minutes to look ahead beats an hour of untangling on Wednesday.",
]

export default function ScrollProgressDemo() {
  return (
    <SmoothScroll className="h-80 w-full max-w-md rounded-2xl bg-card shadow-surface">
      <ScrollProgress position="sticky" label="Article progress" />
      <div className="pointer-events-none sticky top-3 z-10 flex justify-end px-3">
        <ScrollProgress variant="ring" size={44} showValue className="pointer-events-auto" />
      </div>
      <article className="-mt-11 flex flex-col gap-4 px-6 pt-4 pb-8">
        <h3 className="text-balance pr-14 text-lg font-semibold">A calmer week, in five steps</h3>
        {PARAGRAPHS.map((p) => (
          <p key={p.slice(0, 16)} className="text-sm leading-relaxed text-muted-foreground">
            {p}
          </p>
        ))}
      </article>
    </SmoothScroll>
  )
}
