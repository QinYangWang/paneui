import { TextShimmer } from "@/registry/base-nova/ui/text-shimmer"

export default function TextShimmerElements() {
  return (
    <div className="flex flex-col items-start gap-2">
      <TextShimmer as="h3" className="text-xl font-semibold tracking-tight">
        Drafting your itinerary
      </TextShimmer>
      <TextShimmer as="p" className="text-sm">
        Reading 14 hotel reviews near Shibuya…
      </TextShimmer>
      <p className="text-sm text-muted-foreground">
        Step 2 of 3: <TextShimmer className="font-medium">comparing prices</TextShimmer>
      </p>
    </div>
  )
}
