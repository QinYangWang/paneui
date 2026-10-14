"use client"

import * as React from "react"

import { Button } from "@/registry/base-nova/ui/button"
import { Table, type TableColumn, type TableHandle } from "@/registry/base-nova/ui/table"

type Reading = { id: string; minute: number; temp: number }

const readings: Reading[] = Array.from({ length: 1440 }, (_, i) => ({
  id: `r${i}`,
  minute: i,
  temp: Math.round((19 + 3 * Math.sin((i / 1440) * Math.PI * 2 - 1.8)) * 10) / 10,
}))

const time = (m: number) => `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`

const columns: TableColumn<Reading>[] = [
  { key: "minute", header: "Time", width: 120, cell: (r) => <span className="font-mono text-xs">{time(r.minute)}</span> },
  { key: "temp", header: "Temperature", width: 160, grow: true, align: "right", cell: (r) => <span className="tabular-nums">{r.temp.toFixed(1)} °C</span> },
]

export default function TableScrollToIndex() {
  const table = React.useRef<TableHandle>(null)
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <div className="flex flex-wrap gap-2">
        <Button size="xs" variant="secondary" onClick={() => table.current?.scrollToIndex(720, { align: "center", behavior: "smooth" })}>
          Jump to noon
        </Button>
        <Button size="xs" variant="secondary" onClick={() => table.current?.scrollToIndex(1439, { align: "end" })}>
          Last reading
        </Button>
        <Button size="xs" variant="ghost" onClick={() => table.current?.scrollToTop("smooth")}>
          Top
        </Button>
      </div>
      <Table ref={table} aria-label="Thermostat log" data={readings} columns={columns} getRowId={(r) => r.id} rowHeight={36} height={280} />
    </div>
  )
}
