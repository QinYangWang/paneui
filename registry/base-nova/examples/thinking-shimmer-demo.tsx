import { ThinkingShimmer } from "@/registry/base-nova/ui/thinking-shimmer"

export default function ThinkingShimmerDemo() {
  return (
    <div className="flex flex-col gap-3">
      <ThinkingShimmer />
      <ThinkingShimmer dot>Searching flights to Osaka…</ThinkingShimmer>
      <ThinkingShimmer dot active={false}>
        Checked 14 fares
      </ThinkingShimmer>
    </div>
  )
}
