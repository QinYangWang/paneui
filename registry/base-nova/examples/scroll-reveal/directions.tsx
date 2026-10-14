import { ScrollReveal } from "@/registry/base-nova/ui/scroll-reveal"
import { SmoothScroll } from "@/registry/base-nova/ui/smooth-scroll"

const FROM = ["bottom", "top", "left", "right"] as const

export default function ScrollRevealDirections() {
  return (
    <SmoothScroll className="h-80 w-full max-w-md rounded-2xl bg-muted shadow-well">
      <div className="flex flex-col gap-4 px-4 pt-72 pb-10">
        {FROM.map((from) => (
          <ScrollReveal key={from} from={from} distance={40} once={false}>
            <div className="rounded-xl bg-card p-4 text-sm font-medium text-foreground shadow-raised">
              from=&quot;{from}&quot;
            </div>
          </ScrollReveal>
        ))}
      </div>
    </SmoothScroll>
  )
}
