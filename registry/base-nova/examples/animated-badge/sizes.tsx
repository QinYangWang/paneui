import { AnimatedBadge } from "@/registry/base-nova/ui/animated-badge"

export default function AnimatedBadgeSizes() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <AnimatedBadge size="sm" status="success">
        Verified
      </AnimatedBadge>
      <AnimatedBadge status="success">Verified</AnimatedBadge>
      <AnimatedBadge size="lg" status="success">
        Verified
      </AnimatedBadge>
    </div>
  )
}
