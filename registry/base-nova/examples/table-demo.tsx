"use client"

import * as React from "react"

import { Badge } from "@/registry/base-nova/ui/badge"
import { Button } from "@/registry/base-nova/ui/button"
import { Table, type SortState, type TableColumn } from "@/registry/base-nova/ui/table"

type Payment = {
  id: string
  customer: string
  email: string
  status: "Paid" | "Pending" | "Refunded" | "Failed"
  amount: number
  region: string
  date: number
}

/** Small seeded PRNG so the 10k rows are identical on server and client. */
function mulberry32(seed: number) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const FIRST = ["Ava", "Kenji", "Lena", "Mateo", "Priya", "Noah", "Yuki", "Omar", "Chloe", "Ravi", "Sofia", "Wei", "Elif", "Jonas", "Amara", "Leo"]
const LAST = ["Chen", "Okafor", "Silva", "Tanaka", "Novak", "Haddad", "Larsen", "Moreau", "Kim", "Patel", "Rossi", "Weber", "Lin", "Costa"]
const REGIONS = ["Tokyo", "Singapore", "Frankfurt", "São Paulo", "Toronto", "Sydney", "London", "Nairobi"]
const STATUSES: Payment["status"][] = ["Paid", "Paid", "Paid", "Pending", "Refunded", "Failed"]
const BASE_DAY = Date.UTC(2026, 9, 13)

function makePayments(count: number): Payment[] {
  const rand = mulberry32(2026)
  const pick = <V,>(list: readonly V[]) => list[Math.floor(rand() * list.length)]
  return Array.from({ length: count }, (_, i) => {
    const first = pick(FIRST)
    const last = pick(LAST)
    return {
      id: `PAY-${String(i + 1).padStart(5, "0")}`,
      customer: `${first} ${last}`,
      email: `${first}.${last}${Math.floor(rand() * 90 + 10)}@mail.com`.toLowerCase(),
      status: pick(STATUSES),
      amount: Math.round((rand() ** 2 * 4800 + 12) * 100) / 100,
      region: pick(REGIONS),
      date: BASE_DAY - Math.floor(rand() * 365) * 86_400_000,
    }
  })
}

const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" })
const day = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" })
const statusVariant = { Paid: "success", Pending: "warning", Refunded: "outline", Failed: "destructive" } as const

const columns: TableColumn<Payment>[] = [
  { key: "id", header: "Payment", width: 120, sortable: true, cell: (r) => <span className="font-mono text-xs text-muted-foreground">{r.id}</span> },
  { key: "customer", header: "Customer", width: 170, sortable: true, cell: (r) => <span className="font-medium">{r.customer}</span> },
  { key: "email", header: "Email", width: 230, grow: true, sortable: true, cell: (r) => <span className="text-muted-foreground">{r.email}</span> },
  {
    key: "status",
    header: "Status",
    width: 120,
    sortable: true,
    cell: (r) => (
      <Badge size="sm" variant={statusVariant[r.status]}>
        {r.status}
      </Badge>
    ),
  },
  { key: "region", header: "Region", width: 130, sortable: true },
  { key: "amount", header: "Amount", width: 120, align: "right", sortable: true, cell: (r) => money.format(r.amount) },
  { key: "date", header: "Date", width: 130, align: "right", sortable: true, cell: (r) => <span className="text-muted-foreground">{day.format(r.date)}</span> },
]

export default function TableDemo() {
  const data = React.useMemo(() => makePayments(10_000), [])
  const [selected, setSelected] = React.useState<string[]>([])
  const [sort, setSort] = React.useState<SortState>({ key: "date", direction: "desc" })

  const total = React.useMemo(() => {
    if (!selected.length) return 0
    const ids = new Set(selected)
    return data.reduce((sum, p) => (ids.has(p.id) ? sum + p.amount : sum), 0)
  }, [data, selected])

  return (
    <div className="flex w-full max-w-4xl flex-col gap-3">
      <div className="flex h-8 items-center justify-between gap-3 px-1 text-sm">
        <p className="text-muted-foreground">
          {selected.length ? (
            <>
              <span className="font-medium text-foreground tabular-nums">{selected.length.toLocaleString("en-US")}</span> selected ·{" "}
              <span className="tabular-nums">{money.format(total)}</span>
            </>
          ) : (
            <>
              <span className="font-medium text-foreground tabular-nums">10,000</span> payments · drag headers to reorder, edges to resize
            </>
          )}
        </p>
        {selected.length ? (
          <Button size="xs" variant="secondary" onClick={() => setSelected([])}>
            Clear
          </Button>
        ) : null}
      </div>
      <Table
        aria-label="Payments"
        data={data}
        columns={columns}
        getRowId={(row) => row.id}
        selectable
        selectedRowIds={selected}
        onSelectionChange={setSelected}
        sort={sort}
        onSortChange={setSort}
        resizable
        reorderable
        height={420}
      />
    </div>
  )
}
