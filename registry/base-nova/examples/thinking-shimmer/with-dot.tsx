import { ThinkingShimmer } from "@/registry/base-nova/ui/thinking-shimmer"

export default function ThinkingShimmerWithDot() {
  return (
    <div className="flex flex-col gap-3">
      <ThinkingShimmer dot active={false}>
        Found 3 open pull requests
      </ThinkingShimmer>
      <ThinkingShimmer dot active={false}>
        Read the failing test log
      </ThinkingShimmer>
      <ThinkingShimmer dot>Writing a fix for formatDate…</ThinkingShimmer>
    </div>
  )
}
