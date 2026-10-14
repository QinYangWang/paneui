"use client"

import { Button } from "@/registry/base-nova/ui/button"
import { SmoothScroll, useSmoothScroll } from "@/registry/base-nova/ui/smooth-scroll"

const SECTIONS = [
  { id: "overview", title: "Overview", body: "A four-day offsite in Kyoto for the product team, 12 people in total." },
  { id: "travel", title: "Travel", body: "Flights land at KIX on Tuesday morning; the train to Kyoto takes 75 minutes." },
  { id: "stay", title: "Stay", body: "Two machiya townhouses in Higashiyama, a ten-minute walk apart." },
  { id: "agenda", title: "Agenda", body: "Mornings for planning, afternoons free, one shared dinner each night." },
]

function Nav() {
  const { scrollTo } = useSmoothScroll()
  return (
    <div className="sticky top-0 z-10 flex gap-1 bg-muted p-2">
      {SECTIONS.map((s) => (
        <Button key={s.id} size="sm" variant="ghost" onClick={() => scrollTo(`#ss-${s.id}`, { offset: -48 })}>
          {s.title}
        </Button>
      ))}
    </div>
  )
}

export default function SmoothScrollScrollToSection() {
  return (
    <SmoothScroll className="h-72 w-full max-w-md rounded-2xl bg-muted shadow-well" contentClassName="pb-40">
      <Nav />
      <div className="flex flex-col gap-3 px-3">
        {SECTIONS.map((s) => (
          <section key={s.id} id={`ss-${s.id}`} className="rounded-xl bg-card p-4 shadow-raised">
            <h3 className="text-sm font-semibold tracking-tight text-foreground">{s.title}</h3>
            <p className="mt-1 text-sm text-pretty text-muted-foreground">{s.body}</p>
          </section>
        ))}
      </div>
    </SmoothScroll>
  )
}
