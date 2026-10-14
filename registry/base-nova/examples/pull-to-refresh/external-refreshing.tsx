"use client"

import * as React from "react"

import { Button } from "@/registry/base-nova/ui/button"
import { PullToRefresh } from "@/registry/base-nova/ui/pull-to-refresh"

const FILES = ["Q3 report.pdf", "Brand guide.fig", "Offsite photos.zip", "Contract — signed.pdf", "Roadmap.key"]

export default function PullToRefreshExternalRefreshing() {
  const [syncing, setSyncing] = React.useState(false)

  const sync = () =>
    new Promise<void>((resolve) => {
      setSyncing(true)
      setTimeout(() => {
        setSyncing(false)
        resolve()
      }, 1600)
    })

  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <Button variant="secondary" onClick={() => void sync()} disabled={syncing} className="self-start">
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
