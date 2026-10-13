import { BellIcon, CalendarIcon, CartIcon, HeartIcon, MailIcon, StarIcon } from "@/components/icons"
import { ScrollReveal } from "@/registry/base-nova/ui/scroll-reveal"
import { SmoothScroll } from "@/registry/base-nova/ui/smooth-scroll"

const UPDATES = [
  { icon: CalendarIcon, title: "Dinner booked", body: "Friday, 7:30pm, table for four." },
  { icon: MailIcon, title: "Reply drafted", body: "Your note to the landlord is ready to review." },
  { icon: CartIcon, title: "Groceries on the way", body: "Arriving between 6 and 7pm." },
  { icon: HeartIcon, title: "Flowers sent", body: "Delivered to Mum with your card message." },
  { icon: BellIcon, title: "Renewal flagged", body: "Your streaming plan renews in three days." },
  { icon: StarIcon, title: "Weekend kept free", body: "No plans on Saturday, as asked." },
]

export default function ScrollRevealDemo() {
  return (
    <SmoothScroll className="h-80 w-full max-w-md rounded-2xl bg-muted shadow-well">
      <div className="flex flex-col gap-3 px-4 pt-6 pb-10">
        <p className="pb-40 text-center text-xs text-muted-foreground">Scroll down — cards reveal every time they enter</p>
        {UPDATES.map(({ icon: Icon, title, body }, i) => (
          <ScrollReveal key={title} once={false} from={i % 2 ? "right" : "left"} amount={0.6}>
            <div className="flex items-center gap-3 rounded-2xl bg-card bg-linear-to-b from-white/6 to-transparent p-4 shadow-raised">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted shadow-well">
                <Icon className="size-4 text-primary" />
              </span>
              <div>
                <p className="text-sm font-medium">{title}</p>
                <p className="text-sm text-muted-foreground">{body}</p>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </SmoothScroll>
  )
}
