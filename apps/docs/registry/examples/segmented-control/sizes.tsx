import { SegmentedControl, SegmentedControlItem } from "@paneui/ui/components/segmented-control"

export default function SegmentedControlSizes() {
  return (
    <div className="flex flex-col items-center gap-4">
      {(["xs", "sm", "default", "lg"] as const).map((size) => (
        <SegmentedControl key={size} size={size} defaultValue="30d" aria-label={`Range (${size})`}>
          <SegmentedControlItem value="7d">7d</SegmentedControlItem>
          <SegmentedControlItem value="30d">30d</SegmentedControlItem>
          <SegmentedControlItem value="90d">90d</SegmentedControlItem>
        </SegmentedControl>
      ))}
    </div>
  )
}
