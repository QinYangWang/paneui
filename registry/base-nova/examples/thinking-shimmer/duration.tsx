import { ThinkingShimmer } from "@/registry/base-nova/ui/thinking-shimmer"

export default function ThinkingShimmerDuration() {
  return (
    <div className="flex flex-col gap-3">
      <ThinkingShimmer duration={1}>Quick lookup…</ThinkingShimmer>
      <ThinkingShimmer>Comparing hotel prices…</ThinkingShimmer>
      <ThinkingShimmer duration={4}>Running the full test suite…</ThinkingShimmer>
    </div>
  )
}
