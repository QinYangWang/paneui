import { ScrollProgress } from "@paneui/ui/components/scroll-progress"
import { SmoothScroll } from "@paneui/ui/components/smooth-scroll"

const STEPS = [
  "Preheat the oven to 220°C and line a tray with baking paper.",
  "Toss the squash in olive oil, salt and chilli flakes.",
  "Roast for 25 minutes, turning once halfway.",
  "Meanwhile, toast the pumpkin seeds in a dry pan.",
  "Whisk tahini, lemon and a splash of warm water until smooth.",
  "Plate the squash, drizzle the sauce and scatter the seeds.",
]

export default function ScrollProgressBottomBar() {
  return (
    <SmoothScroll className="h-72 w-full max-w-md rounded-2xl bg-card shadow-surface">
      <ol className="flex list-decimal flex-col gap-4 py-6 pr-6 pl-10 text-sm leading-relaxed text-muted-foreground">
        {STEPS.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ol>
      <ScrollProgress position="sticky" side="bottom" thickness={4} spring={false} label="Recipe progress" />
    </SmoothScroll>
  )
}
