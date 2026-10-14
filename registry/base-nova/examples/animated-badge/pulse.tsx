import { AnimatedBadge } from "@/registry/base-nova/ui/animated-badge"

export default function AnimatedBadgePulse() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <AnimatedBadge status="loading" pulse>
        Syncing
      </AnimatedBadge>
      <AnimatedBadge status="info" pulse>
        Recording
      </AnimatedBadge>
      <AnimatedBadge status="error" pulse>
        Incident open
      </AnimatedBadge>
    </div>
  )
}
