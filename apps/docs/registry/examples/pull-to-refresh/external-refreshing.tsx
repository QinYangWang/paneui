"use client"

import * as React from "react"

import { Button } from "@paneui/ui/components/button"
import { PullToRefresh } from "@paneui/ui/components/pull-to-refresh"

const FILES = ["Q3 report.pdf", "Brand guide.fig", "Offsite photos.zip", "Contract — signed.pdf", "Roadmap.key"]

export default function PullToRefreshExternalRefreshing() {
  const [syncing, setSyncing] = React.useState(false)

  // Fire-and-forget: the pull and the button both just start the sync, and
  // `refreshing` alone holds the spinner until it ends.
  const sync = () => {
    setSyncing(true)
    setTimeout(() => setSyncing(false), 1600)
  }

  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <Button variant="secondary" onClick={sync} disabled={syncing} className="self-start">
        {syncing ? "Syncing…" : "Sync now"}
      </Button>
      <PullToRefresh
        onRefresh={sync}
        refreshing={syncing}
        refreshingLabel="Syncing files…"
        className="h-64 rounded-2xl bg-card shadow-surface"
      >
        <ul className="divide-y divide-border">
          {FILES.map((f) => (
            <li key={f} className="px-4 py-3 text-sm text-foreground">
              {f}
            </li>
          ))}
        </ul>
      </PullToRefresh>
    </div>
  )
}
