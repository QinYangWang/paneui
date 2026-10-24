"use client"

import { DirectionProvider } from "@base-ui/react/direction-provider"
import { SegmentedControl, SegmentedControlItem } from "@paneui/ui/components/segmented-control"

export default function Rtl() {
  return <DirectionProvider direction="rtl"><div dir="rtl">
    <SegmentedControl defaultValue="week" aria-label="المدة">
      <SegmentedControlItem value="day">يوم</SegmentedControlItem>
      <SegmentedControlItem value="week">أسبوع</SegmentedControlItem>
      <SegmentedControlItem value="month" disabled>شهر</SegmentedControlItem>
    </SegmentedControl>
  </div></DirectionProvider>
}
