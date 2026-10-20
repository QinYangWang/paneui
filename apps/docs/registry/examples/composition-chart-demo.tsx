"use client"

import * as React from "react"

import { seededRandom } from "@paneui/ui/components/chart-utils"
import { CompositionChart } from "@paneui/ui/components/composition-chart"
import { Tabs, TabsList, TabsTab } from "@paneui/ui/components/tabs"

const series = [
  { id: "organic", label: "Organic" },
  { id: "paid", label: "Paid" },
  { id: "referral", label: "Referral" },
  { id: "social", label: "Social" },
  { id: "email", label: "Email" },
]

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

const data = (() => {
  const r = seededRandom(27)
  return months.map((label, i) => ({
    label,
    values: {
      organic: Math.round(4200 + i * 180 + r() * 900),
      paid: Math.round(3100 - i * 90 + r() * 800),
      referral: Math.round(1200 + r() * 600),
      social: Math.round(700 + i * 120 + r() * 500),
      email: Math.round(600 + r() * 400),
    },
  }))
})()

export default function CompositionChartDemo() {
  const [mode, setMode] = React.useState<"bar" | "area">("bar")
  return (
    <div className="w-full max-w-2xl space-y-3">
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-sm font-medium">Traffic mix</div>
          <div className="text-xs text-muted-foreground">Share of sessions by channel · 2026</div>
        </div>
        <Tabs value={mode} onValueChange={(v) => setMode(v as "bar" | "area")}>
          <TabsList>
            <TabsTab value="bar">Bars</TabsTab>
            <TabsTab value="area">Area</TabsTab>
          </TabsList>
        </Tabs>
      </div>
      <CompositionChart series={series} data={data} mode={mode} label="Traffic mix by channel" />
    </div>
  )
}
