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
