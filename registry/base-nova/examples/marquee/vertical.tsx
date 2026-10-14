import { Marquee } from "@/registry/base-nova/ui/marquee"

const QUOTES = [
  { name: "Mei", text: "It booked the dentist before I remembered to." },
  { name: "Daniel", text: "Our team offsite planned in one afternoon." },
  { name: "Aiko", text: "I finally cancelled three subscriptions I forgot about." },
  { name: "Lucas", text: "Flight delayed? It had a new connection waiting." },
]

export default function MarqueeVertical() {
  return (
    <div className="grid h-72 w-full max-w-lg grid-cols-2 gap-3">
      {(["up", "down"] as const).map((direction) => (
        <Marquee key={direction} direction={direction} duration={22} gap="0.75rem">
          {QUOTES.map((q) => (
            <figure key={q.name} className="flex flex-col gap-2 rounded-xl bg-card p-4 text-sm shadow-raised">
              <blockquote className="text-pretty">“{q.text}”</blockquote>
              <figcaption className="text-xs text-muted-foreground">{q.name}</figcaption>
            </figure>
          ))}
        </Marquee>
      ))}
    </div>
  )
}
