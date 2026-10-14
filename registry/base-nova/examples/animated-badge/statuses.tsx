import { AnimatedBadge } from "@/registry/base-nova/ui/animated-badge"

export default function AnimatedBadgeStatuses() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <AnimatedBadge status="idle">Queued</AnimatedBadge>
      <AnimatedBadge status="loading">Building</AnimatedBadge>
      <AnimatedBadge status="success">Deployed</AnimatedBadge>
      <AnimatedBadge status="warning">Slow response</AnimatedBadge>
      <AnimatedBadge status="error">Build failed</AnimatedBadge>
      <AnimatedBadge status="info">New version</AnimatedBadge>
    </div>
  )
}
