import { SegmentedControl, SegmentedControlItem } from "@/registry/base-nova/ui/segmented-control"

export default function SegmentedControlSizes() {
  return (
    <div className="flex flex-col items-center gap-4">
      <SegmentedControl defaultValue="30d" aria-label="Range">
        <SegmentedControlItem value="7d">7d</SegmentedControlItem>
        <SegmentedControlItem value="30d">30d</SegmentedControlItem>
        <SegmentedControlItem value="90d">90d</SegmentedControlItem>
      </SegmentedControl>
      <SegmentedControl size="sm" defaultValue="area" aria-label="Chart type">
        <SegmentedControlItem value="area">Area</SegmentedControlItem>
        <SegmentedControlItem value="bar">Bars</SegmentedControlItem>
        <SegmentedControlItem value="line">Line</SegmentedControlItem>
      </SegmentedControl>
    </div>
  )
}
