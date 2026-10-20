import { CalendarIcon, CartIcon, GlobeIcon, HeartIcon, MailIcon, StarIcon } from "@paneui/ui/icons"
import { Marquee } from "@paneui/ui/components/marquee"

const ITEMS = [
  { icon: CalendarIcon, label: "Dinner booked for Friday" },
  { icon: MailIcon, label: "Replied to the landlord" },
  { icon: CartIcon, label: "Groceries arrive at 6pm" },
  { icon: GlobeIcon, label: "Flight to Tokyo held" },
  { icon: HeartIcon, label: "Flowers sent to Mum" },
  { icon: StarIcon, label: "Renewal cancelled" },
]

export default function MarqueeDemo() {
  return (
    <div className="flex w-full max-w-xl flex-col gap-3">
      {(["left", "right"] as const).map((direction) => (
        <Marquee key={direction} direction={direction} duration={28} gap="0.75rem">
          {ITEMS.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-2 rounded-full bg-secondary px-3.5 py-1.5 text-sm whitespace-nowrap shadow-raised"
            >
              <Icon className="size-4 text-muted-foreground" />
              {label}
            </div>
          ))}
        </Marquee>
      ))}
    </div>
  )
}
