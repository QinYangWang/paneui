import { BotIcon, SparklesIcon } from "@/components/icons"
import { AnimatedBadge } from "@/registry/base-nova/ui/animated-badge"

export default function AnimatedBadgeCustomIcon() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <AnimatedBadge status="info" icon={<SparklesIcon />}>
        AI summary
      </AnimatedBadge>
      <AnimatedBadge status="idle" icon={<BotIcon />}>
        Agent idle
      </AnimatedBadge>
      <AnimatedBadge status="success" showIcon={false}>
        Paid
      </AnimatedBadge>
    </div>
  )
}
