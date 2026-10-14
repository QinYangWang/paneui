import { SmoothScroll } from "@/registry/base-nova/ui/smooth-scroll"

const LINES = [
  "Wake at 6:30, no phone until coffee.",
  "Twenty minutes of stretching.",
  "Inbox to zero before 9.",
  "Deep work block until lunch.",
  "Walk after lunch, no podcasts.",
  "Meetings only in the afternoon.",
  "Write tomorrow's top three before logging off.",
  "Dinner with the screens away.",
]

function List() {
  return (
    <ul className="flex flex-col gap-2 p-2">
      {LINES.map((l) => (
        <li key={l} className="rounded-lg bg-card px-3 py-2 text-sm text-foreground shadow-raised">
          {l}
        </li>
      ))}
    </ul>
  )
}

export default function SmoothScrollEasing() {
  return (
    <div className="grid w-full max-w-lg gap-4 sm:grid-cols-2">
      <div className="flex flex-col gap-2">
        <p className="text-xs font-medium text-muted-foreground">lerp 0.04 — heavy</p>
        <SmoothScroll lerp={0.04} className="h-56 rounded-2xl bg-muted shadow-well">
          <List />
        </SmoothScroll>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-xs font-medium text-muted-foreground">duration 0.6s — fixed</p>
        <SmoothScroll duration={0.6} wheelMultiplier={1.4} className="h-56 rounded-2xl bg-muted shadow-well">
          <List />
        </SmoothScroll>
      </div>
    </div>
  )
}
