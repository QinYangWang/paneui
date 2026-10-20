"use client"

import * as React from "react"

import { Button } from "@paneui/ui/components/button"
import { type AsyncPage, useAsyncPages } from "@paneui/ui/components/table-async"

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
