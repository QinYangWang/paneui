import { AnimatedNumber } from "@/registry/base-nova/ui/animated-number"

export default function AnimatedNumberFrom() {
  return (
    <div className="flex gap-8">
      <div className="flex flex-col gap-1">
        <AnimatedNumber value={0} from={86} className="text-3xl font-semibold tracking-tight" />
        <span className="text-xs text-muted-foreground">Unread emails</span>
      </div>
      <div className="flex flex-col gap-1">
        <AnimatedNumber value={2026} from={1999} className="text-3xl font-semibold tracking-tight" />
        <span className="text-xs text-muted-foreground">Years of history</span>
      </div>
    </div>
  )
}
