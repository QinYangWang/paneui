"use client"

import * as React from "react"

import { PullToRefresh, type PullToRefreshStatus } from "@paneui/ui/components/pull-to-refresh"

const TASKS = ["Reply to Mina about the venue", "Book flights for the offsite", "Review Leo's pull request", "Renew domain", "Send invoice #2042"]

export default function PullToRefreshStatusChange() {
  const [status, setStatus] = React.useState<PullToRefreshStatus>("idle")
  return (
    <div className="flex w-full max-w-sm flex-col gap-2">
      <p className="text-xs text-muted-foreground">
        Status: <span className="font-mono text-foreground">{status}</span>
      </p>
      <PullToRefresh
        onRefresh={() => new Promise((r) => setTimeout(r, 1000))}
        onStatusChange={setStatus}
        className="h-64 rounded-2xl bg-card shadow-surface"
      >
        <ul className="divide-y divide-border">
          {TASKS.map((t) => (
            <li key={t} className="px-4 py-3 text-sm text-foreground">
              {t}
            </li>
          ))}
        </ul>
      </PullToRefresh>
    </div>
  )
}
