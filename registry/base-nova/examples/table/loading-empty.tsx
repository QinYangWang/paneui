"use client"

import * as React from "react"

import { Button } from "@/registry/base-nova/ui/button"
import { Table, type TableColumn } from "@/registry/base-nova/ui/table"

type Order = { id: string; item: string; qty: number }

const columns: TableColumn<Order>[] = [
  { key: "id", header: "Order", width: 120 },
  { key: "item", header: "Item", width: 220, grow: true },
  { key: "qty", header: "Qty", width: 80, align: "right" },
]

export default function TableLoadingEmpty() {
  const [state, setState] = React.useState<"loading" | "empty">("loading")
  return (
    <div className="flex w-full max-w-xl flex-col gap-3">
      <div className="flex gap-2">
        <Button size="xs" variant={state === "loading" ? "secondary" : "ghost"} onClick={() => setState("loading")}>
          Loading
        </Button>
        <Button size="xs" variant={state === "empty" ? "secondary" : "ghost"} onClick={() => setState("empty")}>
          Empty
        </Button>
      </div>
      <Table
        aria-label="Orders"
        data={[]}
        columns={columns}
        loading={state === "loading"}
        skeletonRows={4}
        height={240}
        emptyState={
          <div className="flex flex-col items-center gap-1 text-center">
            <p className="text-sm font-medium text-foreground">No orders yet</p>
            <p className="text-xs text-muted-foreground">New orders will show up here.</p>
          </div>
        }
      />
    </div>
  )
}
