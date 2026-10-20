# Table Async

> Loads table rows page by page as the reader scrolls.

Page: https://paneui.dev/docs/table-async/

## Installation

```bash
npx shadcn@latest add @paneui/table-async
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/table-async.json
```

Packages: `@tanstack/react-virtual`, `motion`, `@base-ui/react`.

Registry items it builds on: `@paneui/theme`, `@paneui/icons`, `@paneui/table`, `@paneui/button`.

## Usage

```tsx
import { AsyncTable } from "@/components/ui/table-async"
```

```tsx
<AsyncTable
  aria-label="Events"
  columns={columns}
  loadPage={async (page, signal) => {
    const res = await fetch(`/api/events?page=${page}`, { signal })
    return res.json() // { rows, hasMore }
  }}
/>
```

## Examples

### Error and Retry

Use when the source can fail mid-list; page 3 fails once here, so scroll down.

```tsx
"use client"

import * as React from "react"

import type { TableColumn } from "@/registry/base-nova/ui/table"
import { AsyncTable, type AsyncPage } from "@/registry/base-nova/ui/table-async"

type Ticket = { id: string; subject: string; opened: string }

const SUBJECTS = ["Can't reset password", "Refund for order", "Invoice address wrong", "App crashes on launch", "Change plan", "Export my data"]

const columns: TableColumn<Ticket>[] = [
  { key: "id", header: "Ticket", width: 110, cell: (r) => <span className="font-mono text-xs text-muted-foreground">{r.id}</span> },
  { key: "subject", header: "Subject", width: 240, grow: true },
  { key: "opened", header: "Opened", width: 110, align: "right" },
]

export default function TableAsyncErrorRetry() {
  // Page 2 fails the first time it is requested, so the retry band shows.
  const failed = React.useRef(false)
  const loadPage = React.useCallback(async (page: number): Promise<AsyncPage<Ticket>> => {
    await new Promise((r) => setTimeout(r, 700))
    if (page === 2 && !failed.current) {
      failed.current = true
      throw new Error("Network error")
    }
    return {
      rows: Array.from({ length: 15 }, (_, i) => {
        const n = page * 15 + i
        return { id: `T-${1000 + n}`, subject: SUBJECTS[n % SUBJECTS.length], opened: `${(n % 23) + 1}h ago` }
      }),
      hasMore: page < 3,
    }
  }, [])

  return (
    <div className="w-full max-w-2xl">
      <AsyncTable aria-label="Support tickets" columns={columns} loadPage={loadPage} getRowId={(r) => r.id} rowHeight={40} height={300} />
    </div>
  )
}
```

### Reset Key and End Message

```tsx
"use client"

import * as React from "react"

import { Button } from "@/registry/base-nova/ui/button"
import type { TableColumn } from "@/registry/base-nova/ui/table"
import { AsyncTable, type AsyncPage } from "@/registry/base-nova/ui/table-async"

type Listing = { id: string; title: string; city: string; price: number }

const CITIES = ["All", "Lisbon", "Kyoto", "Oslo"] as const
const TITLES = ["Sunny studio", "Loft by the river", "Quiet garden flat", "Top-floor one-bed", "Townhouse room"]
const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })

const columns: TableColumn<Listing>[] = [
  { key: "title", header: "Listing", width: 220, grow: true },
  { key: "city", header: "City", width: 110 },
  { key: "price", header: "Per night", width: 110, align: "right", sortable: true, cell: (r) => <span className="tabular-nums">{usd.format(r.price)}</span> },
]

export default function TableAsyncResetKey() {
  const [city, setCity] = React.useState<(typeof CITIES)[number]>("All")

  const loadPage = React.useCallback(
    async (page: number, signal: AbortSignal): Promise<AsyncPage<Listing>> => {
      await new Promise<void>((resolve, reject) => {
        const t = setTimeout(resolve, 600)
        signal.addEventListener("abort", () => {
          clearTimeout(t)
          reject(new DOMException("Aborted", "AbortError"))
        })
      })
      const pool = city === "All" ? CITIES.slice(1) : [city]
      return {
        rows: Array.from({ length: 20 }, (_, i) => {
          const n = page * 20 + i
          return { id: `${city}-${n}`, title: TITLES[n % TITLES.length], city: pool[n % pool.length], price: 60 + ((n * 37) % 180) }
        }),
        hasMore: page < 2,
      }
    },
    [city]
  )

  return (
    <div className="flex w-full max-w-2xl flex-col gap-3">
      <div className="flex gap-1">
        {CITIES.map((c) => (
          <Button key={c} size="xs" variant={c === city ? "secondary" : "ghost"} onClick={() => setCity(c)}>
            {c}
          </Button>
        ))}
      </div>
      <AsyncTable
        aria-label="Listings"
        columns={columns}
        loadPage={loadPage}
        resetKey={city}
        getRowId={(r) => r.id}
        endMessage={(count) => (
          <div className="flex h-full items-center justify-center text-xs text-muted-foreground tabular-nums">
            {count} stays in {city === "All" ? "all cities" : city}
          </div>
        )}
        height={300}
      />
    </div>
  )
}
```

### useAsyncPages

Use for paged lists that are not a table.

```tsx
"use client"

import * as React from "react"

import { Button } from "@/registry/base-nova/ui/button"
import { type AsyncPage, useAsyncPages } from "@/registry/base-nova/ui/table-async"

const NAMES = ["Ava", "Kenji", "Lena", "Mateo", "Priya", "Noah", "Yuki", "Omar", "Chloe", "Ravi", "Sofia", "Wei"]

async function loadPage(page: number): Promise<AsyncPage<string>> {
  await new Promise((r) => setTimeout(r, 500))
  return { rows: NAMES.slice(page * 4, page * 4 + 4), hasMore: page < 2 }
}

export default function TableAsyncUseAsyncPages() {
  const { rows, status, pages, loadMore, reload } = useAsyncPages(loadPage)
  return (
    <div className="flex w-full max-w-xs flex-col gap-3 rounded-xl bg-card p-4 shadow-raised">
      <ul className="flex flex-col gap-1 text-sm">
        {rows.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
      <p className="text-xs text-muted-foreground tabular-nums">
        {pages} pages · {status}
      </p>
      <div className="flex gap-2">
        <Button size="sm" variant="secondary" onClick={loadMore} disabled={status !== "idle"}>
          {status === "loading" ? "Loading…" : "Load more"}
        </Button>
        <Button size="sm" variant="ghost" onClick={reload}>
          Reload
        </Button>
      </div>
    </div>
  )
}
```

## Errors

When `loadPage` rejects, a retry band replaces the footer, or a “Try again” empty state shows if nothing has loaded yet.

## Accessibility

The table sets `aria-busy` while a page loads; the loading band is a `status` and the error bands are `alert`s.

## Related

Built on [Table](https://paneui.dev/docs/table). See also [Table Editable](https://paneui.dev/docs/table-editable).

## API Reference

### AsyncTable

Table that loads page by page as the list nears its end. Takes every `Table` prop except `data`, `loading`, `onEndReached` and `footer`. Also accepts every prop of [Table](/docs/table).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `loadPage` (required) | `(page: number, signal: AbortSignal) => Promise<AsyncPage<T>>` | — | Fetch one page; reject to show the retry footer. Honour `signal` to cancel. |
| `resetKey` | `unknown` | — | Change to drop loaded pages, abort the in-flight request and start again from the top (e.g. a new filter). |
| `endMessage` | `ReactNode \| ((count: number) => ReactNode)` | — | Replaces the end-of-list note shown once every page is in. Pass `null` to hide. |
| `onStatusChange` | `(status: "loading" \| "idle" \| "error" \| "done", rowCount: number) => void` | — | Called when the load status or row count changes. |

### AsyncPage

What `loadPage` resolves to.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `rows` (required) | `readonly T[]` | — | The page's rows. |
| `hasMore` (required) | `boolean` | — | `false` once the last page has arrived. |

### useAsyncPages

`useAsyncPages(loadPage, resetKey?)` fetches page 0 on mount and on `resetKey` change, then one page per `loadMore`. Returns:

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `rows` | `T[]` | — | Everything loaded so far. |
| `status` | `"loading" \| "idle" \| "error" \| "done"` | — | Current state. |
| `error` | `unknown` | — | The last rejection. |
| `pages` | `number` | — | Number of pages received. |
| `loadMore` | `() => void` | — | Fetch the next page (ignored unless `idle`). |
| `retry` | `() => void` | — | Re-request the page that failed. |
| `reload` | `() => void` | — | Start again from page 0. |
