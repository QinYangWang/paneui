"use client"

import { BarList } from "@paneui/ui/components/bar-list"

const pages = [
  { name: "/pricing", value: 18420 },
  { name: "/", value: 15210 },
  { name: "/docs/quickstart", value: 9840 },
  { name: "/changelog", value: 6120 },
  { name: "/security", value: 2210 },
]

export default function BarListDemo() {
  return (
    <div className="w-full max-w-md">
      <BarList items={pages} labels={["Page", "Visitors"]} formatValue={(v) => v.toLocaleString("en-US")} />
    </div>
  )
}
