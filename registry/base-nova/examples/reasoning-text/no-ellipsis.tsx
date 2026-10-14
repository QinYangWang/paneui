import { ReasoningText } from "@/registry/base-nova/ui/reasoning-text"

export default function ReasoningTextNoEllipsis() {
  return (
    <ReasoningText
      ellipsis={false}
      interval={1600}
      shimmerDuration={1.2}
      phrases={["Step 1 of 3: fetch issues", "Step 2 of 3: group by label", "Step 3 of 3: draft the changelog"]}
    />
  )
}
