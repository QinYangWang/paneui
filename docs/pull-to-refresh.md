# Pull to Refresh

> Refreshes a scrolling list when the user pulls it down.

Page: https://paneui.dev/docs/pull-to-refresh/

## Installation

```bash
npx shadcn@latest add @paneui/pull-to-refresh
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/pull-to-refresh.json
```

Packages: `motion`, `@base-ui/react`.

Registry items it builds on: `@paneui/theme`, `@paneui/icons`, `@paneui/loader`, `@paneui/scroll-area`.

## Usage

```tsx
import { PullToRefresh } from "@/components/ui/pull-to-refresh"
```

```tsx
<PullToRefresh onRefresh={() => fetchInbox()} className="h-80">
  <InboxList />
</PullToRefresh>
```

## Examples

### Labels and Distances

Use to match your app's wording or change how far the pull must go.

```tsx
"use client"

import * as React from "react"

import { PullToRefresh } from "@/registry/base-nova/ui/pull-to-refresh"

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
```

### External Refreshing

Use when a refresh can also start elsewhere, like a Sync button, and should hold the spinner open.

```tsx
"use client"

import * as React from "react"

import { Button } from "@/registry/base-nova/ui/button"
import { PullToRefresh } from "@/registry/base-nova/ui/pull-to-refresh"

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
```

### Status Changes

Use to drive your own indicator from the gesture.

```tsx
"use client"

import * as React from "react"

import { PullToRefresh, type PullToRefreshStatus } from "@/registry/base-nova/ui/pull-to-refresh"

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
```

### Disabled

```tsx
import { PullToRefresh } from "@/registry/base-nova/ui/pull-to-refresh"

const ITEMS = ["Archived — March", "Archived — February", "Archived — January", "Archived — December", "Archived — November"]

export default function PullToRefreshDisabled() {
  return (
    <PullToRefresh
      onRefresh={() => undefined}
      disabled
      className="h-56 w-full max-w-sm rounded-2xl bg-card shadow-surface"
    >
      <p className="px-4 pt-3 text-xs text-muted-foreground">Archives don’t change, so pulling just scrolls.</p>
      <ul className="divide-y divide-border">
        {ITEMS.map((t) => (
          <li key={t} className="px-4 py-3 text-sm text-foreground">
            {t}
          </li>
        ))}
      </ul>
    </PullToRefresh>
  )
}
```

## Scrollbars

Scrolls in a [Scroll Area](https://paneui.dev/docs/scroll-area), so its scrollbar stays inside the rounded frame and holds still while the content is pulled. The pull never changes the scroll range.

## Motion

Content springs back once `onRefresh` resolves. With reduced motion it jumps into place and the arrow doesn't rotate.

## Accessibility

The root sets `aria-busy` while refreshing and a polite live region announces `refreshingLabel`. Pull is a touch, pen and mouse gesture only, so give keyboard users another way to refresh.

## API Reference

### PullToRefresh

Scroll container that arms a refresh when pulled down from the top. Give it a height. Also accepts every prop of `div`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` (required) | `ReactNode` | — | The scrolling content. |
| `onRefresh` (required) | `() => void \| Promise<void>` | — | Runs when the pull is released past `threshold`. Return a promise to keep the spinner until it settles, or return nothing and set `refreshing` instead. |
| `refreshing` | `boolean` | — | Hold the refreshing state for a refresh managed outside the gesture. The content stays open until both this and any `onRefresh` promise are done. |
| `disabled` | `boolean` | `false` | Turn the pull gesture off. |
| `threshold` | `number` | `64` | Resisted pull distance (px) that arms the refresh. |
| `maxPull` | `number` | `120` | Ceiling of the resisted pull (px). |
| `holdDistance` | `number` | `56` | Content offset (px) while refreshing. |
| `pullingLabel` | `ReactNode` | `"Pull to refresh"` | Shown while pulling, before the threshold. |
| `releaseLabel` | `ReactNode` | `"Release to refresh"` | Shown once the pull is armed. |
| `refreshingLabel` | `ReactNode` | `"Refreshing…"` | Shown and announced while refreshing. |
| `onStatusChange` | `(status: "idle" \| "pulling" \| "ready" \| "refreshing") => void` | — | Called whenever the gesture status changes. |
| `contentClassName` | `string` | — | Classes for the content that moves with the pull. |

| Data attribute | Description |
| --- | --- |
| `data-status` | `idle`, `pulling`, `ready` or `refreshing` on the root. |
