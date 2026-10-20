import { ScrollReveal } from "@paneui/ui/components/scroll-reveal"
import { SmoothScroll } from "@paneui/ui/components/smooth-scroll"

const PLANS = [
  { name: "Solo", price: "Free", note: "One person, the essentials." },
  { name: "Household", price: "$8/mo", note: "Up to five people, shared lists." },
  { name: "Family office", price: "$40/mo", note: "Assistants, approvals and audit log." },
]

export default function ScrollRevealStagger() {
  return (
    <SmoothScroll className="h-80 w-full max-w-md rounded-2xl bg-muted shadow-well">
      <div className="grid grid-cols-3 gap-3 px-4 pt-80 pb-10">
        {PLANS.map((p, i) => (
          <ScrollReveal key={p.name} delay={i * 0.1} distance={12} blur={4} amount="all">
            <div className="flex h-full flex-col gap-1 rounded-xl bg-card p-3 shadow-raised">
              <p className="text-sm font-medium text-foreground">{p.name}</p>
              <p className="text-base font-semibold tabular-nums">{p.price}</p>
              <p className="text-xs text-pretty text-muted-foreground">{p.note}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </SmoothScroll>
  )
}
