"use client"

import * as React from "react"

import { PullToRefresh } from "@paneui/ui/components/pull-to-refresh"

const SCORES = [
  { home: "Lakers", away: "Celtics", score: "102 – 98" },
  { home: "Warriors", away: "Suns", score: "88 – 91" },
  { home: "Bucks", away: "Heat", score: "110 – 104" },
  { home: "Nuggets", away: "Mavericks", score: "95 – 95" },
  { home: "Knicks", away: "Nets", score: "79 – 84" },
]

export default function PullToRefreshCustomLabels() {
  const [checked, setChecked] = React.useState("9:41")
  return (
    <PullToRefresh
      onRefresh={async () => {
        await new Promise((r) => setTimeout(r, 1200))
        setChecked(new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }))
      }}
      threshold={48}
      maxPull={96}
      holdDistance={48}
      pullingLabel="Pull for live scores"
      releaseLabel="Let go to update"
      refreshingLabel="Fetching scores…"
      className="h-72 w-full max-w-sm rounded-2xl bg-card shadow-surface"
    >
      <p className="px-4 pt-3 text-xs text-muted-foreground tabular-nums">Last checked {checked}</p>
      <ul className="divide-y divide-border">
        {SCORES.map((g) => (
          <li key={g.home} className="flex items-center justify-between px-4 py-3 text-sm">
            <span className="text-foreground">
              {g.home} <span className="text-muted-foreground">vs</span> {g.away}
            </span>
            <span className="font-medium text-foreground tabular-nums">{g.score}</span>
          </li>
        ))}
      </ul>
    </PullToRefresh>
  )
}
