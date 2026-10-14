"use client"

import { seededRandom } from "@/registry/base-nova/ui/chart-utils"
import { StatusBar, type StatusBarDatum, type StatusBarStatus } from "@/registry/base-nova/ui/status-bar"

const statuses: Record<string, StatusBarStatus> = {
  passed: { label: "Passed", color: "var(--success)", weight: 1 },
  failed: { label: "Failed", color: "var(--destructive)", weight: 0 },
  cancelled: { label: "Cancelled", color: "var(--muted-foreground)", weight: null },
}

function builds(): StatusBarDatum[] {
  const r = seededRandom(21)
  return Array.from({ length: 40 }, (_, i) => {
    const x = r()
    const status = x > 0.9 ? "failed" : x > 0.84 ? "cancelled" : "passed"
    const minutes = Math.round(4 + r() * 6)
    return {
      id: `build-${1460 + i}`,
      label: `Build #${1460 + i}`,
      status,
      description: status === "passed" ? `Finished in ${minutes} min` : status === "failed" ? "Unit tests failed" : "Superseded by a newer push",
    }
  })
}

const data = builds()

export default function StatusBarCustomStatuses() {
  return (
    <div className="w-full max-w-xl">
      <StatusBar
        title="main"
        label="CI runs on main"
        data={data}
        statuses={statuses}
        startLabel="40 builds ago"
        endLabel="Latest"
      />
    </div>
  )
}
