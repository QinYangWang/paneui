"use client"

import { StatusBar, type StatusBarDatum } from "@paneui/ui/components/status-bar"

const incidents: Record<number, { status: string; description: string }> = {
  3: { status: "maintenance", description: "Certificate rotation" },
  14: { status: "degraded", description: "Queue backlog, jobs delayed up to 6 min" },
  15: { status: "outage", description: "Webhook delivery failed for 22 min" },
  16: { status: "degraded", description: "Retrying failed deliveries" },
}

const data: StatusBarDatum[] = Array.from({ length: 24 }, (_, hour) => ({
  id: `h${hour}`,
  label: `${String(hour).padStart(2, "0")}:00–${String(hour + 1).padStart(2, "0")}:00`,
  status: incidents[hour]?.status ?? "operational",
  description: incidents[hour]?.description ?? "All checks passing",
}))

export default function StatusBarHourly() {
  return (
    <div className="w-full max-w-xl">
      <StatusBar
        title="Webhooks"
        label="Webhooks status, last 24 hours"
        data={data}
        height={48}
        gap={6}
        startLabel="00:00"
        endLabel="Now"
      />
    </div>
  )
}
