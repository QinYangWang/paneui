"use client"

import { useT } from "@/lib/site-locale"

import * as React from "react"

import { Badge } from "@paneui/ui/components/badge"
import { SegmentedControl, SegmentedControlItem } from "@paneui/ui/components/segmented-control"

export default function SegmentedControlDemo() {
  const t = useT()
  const [cycle, setCycle] = React.useState("yearly")
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-3">
        <SegmentedControl value={cycle} onValueChange={setCycle} aria-label={t({ en: "Billing cycle", zh: "计费周期" })}>
          <SegmentedControlItem value="monthly">{t({ en: "Monthly", zh: "月付" })}</SegmentedControlItem>
          <SegmentedControlItem value="yearly">{t({ en: "Yearly", zh: "年付" })}</SegmentedControlItem>
        </SegmentedControl>
        <Badge size="sm" variant="success">
          {t({ en: "Save 17%", zh: "节省 17%" })}
        </Badge>
      </div>
      <p className="text-sm text-muted-foreground tabular-nums">{cycle === "yearly" ? "$24" : "$29"} {t({ en: "per seat / month", zh: "每席位 / 月" })}</p>
    </div>
  )
}
