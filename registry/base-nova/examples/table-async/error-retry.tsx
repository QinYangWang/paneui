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
