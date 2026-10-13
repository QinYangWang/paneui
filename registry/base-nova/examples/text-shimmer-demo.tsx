import { SparklesIcon } from "@/components/icons"
import { TextShimmer } from "@/registry/base-nova/ui/text-shimmer"

export default function TextShimmerDemo() {
  return (
    <div className="flex flex-col items-start gap-3">
      <div className="flex items-center gap-2 rounded-full bg-secondary bg-linear-to-b from-white/6 to-transparent px-3.5 py-1.5 text-sm shadow-raised">
        <SparklesIcon className="size-4 text-primary" />
        <TextShimmer className="font-medium">Checking flight prices…</TextShimmer>
      </div>
      <TextShimmer as="p" duration={3} className="text-2xl font-semibold tracking-tight">
        Thinking it through
      </TextShimmer>
    </div>
  )
}
