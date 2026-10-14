"use client"

import * as React from "react"

import {
  ArrowDownIcon,
  ArrowUpIcon,
  BellIcon,
  BoltIcon,
  ChartIcon,
  FileIcon,
  MoreHorizontalIcon,
  ServerIcon,
  UsersIcon,
} from "@/components/icons"
import { Badge } from "@/registry/base-nova/ui/badge"
import { Button } from "@/registry/base-nova/ui/button"
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/registry/base-nova/ui/card"
import { CompositionChart } from "@/registry/base-nova/ui/composition-chart"
import { IconChip } from "@/registry/base-nova/ui/icon-chip"
import { Menu, MenuContent, MenuItem, MenuTrigger } from "@/registry/base-nova/ui/menu"
import { NumberTicker } from "@/registry/base-nova/ui/number-ticker"
import { Table, type SortState, type TableColumn } from "@/registry/base-nova/ui/table"
import { Tabs, TabsList, TabsTab } from "@/registry/base-nova/ui/tabs"

import { activity, invoices, revenue, revenueSeries, type Activity, type Invoice, type Kpi } from "./data"
import { Sparkline } from "./sparkline"

/* ───────────────────────── KPI ───────────────────────── */

export function KpiCard({ kpi }: { kpi: Kpi }) {
  const good = kpi.invert ? kpi.delta < 0 : kpi.delta > 0
  const Arrow = kpi.delta >= 0 ? ArrowUpIcon : ArrowDownIcon
  const unit = kpi.format.style === "percent" ? " pts" : "%"
  return (
    <Card size="sm" className="gap-3">
      <CardHeader>
        <CardDescription>{kpi.label}</CardDescription>
        <CardAction>
          <Badge size="sm" variant={good ? "success" : "destructive"}>
            <Arrow />
            {Math.abs(kpi.delta).toFixed(1)}
            {unit}
          </Badge>
        </CardAction>
      </CardHeader>
      <CardContent className="flex items-end justify-between gap-4">
        <div className="flex min-w-0 flex-col gap-1">
          <NumberTicker
            value={kpi.value}
            locale="en-US"
            format={kpi.format}
            className="text-2xl font-semibold tracking-tight tabular-nums"
          />
          <span className="truncate text-xs text-muted-foreground">{kpi.hint}</span>
        </div>
        <Sparkline values={kpi.trend} className={good ? "w-24 text-success" : "w-24 text-destructive"} />
      </CardContent>
    </Card>
  )
}

/* ───────────────────────── Revenue ───────────────────────── */

const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })

export function RevenueCard() {
  const [mode, setMode] = React.useState<"area" | "bar">("area")
  return (
    <Card className="min-w-0">
      <CardHeader>
        <CardTitle className="text-base">Revenue by plan</CardTitle>
        <CardDescription>Share of MRR over the last 12 months</CardDescription>
        <CardAction>
          <Tabs value={mode} onValueChange={(v) => setMode(v as "area" | "bar")}>
            <TabsList aria-label="Chart style">
              <TabsTab value="area">Area</TabsTab>
              <TabsTab value="bar">Bars</TabsTab>
            </TabsList>
          </Tabs>
        </CardAction>
      </CardHeader>
      <CardContent>
        <CompositionChart
          series={revenueSeries}
          data={revenue}
          mode={mode}
          height={248}
          label="Revenue by plan"
          formatValue={(v) => usd.format(v)}
        />
      </CardContent>
    </Card>
  )
}

/* ───────────────────────── Activity ───────────────────────── */

const activityIcon: Record<Activity["kind"], { icon: React.ReactNode; tone: "primary" | "success" | "warning" | "neutral" }> = {
  upgrade: { icon: <ChartIcon />, tone: "success" },
  invoice: { icon: <FileIcon />, tone: "neutral" },
  member: { icon: <UsersIcon />, tone: "primary" },
  alert: { icon: <BellIcon />, tone: "warning" },
  deploy: { icon: <ServerIcon />, tone: "neutral" },
}

export function ActivityCard() {
  return (
    <Card className="min-w-0">
      <CardHeader>
        <CardTitle className="text-base">Activity</CardTitle>
        <CardDescription>Across all workspaces</CardDescription>
        <CardAction>
          <Button variant="ghost" size="xs">
            View all
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <ol className="flex flex-col">
          {activity.map((a, i) => {
            const { icon, tone } = activityIcon[a.kind]
            return (
              <li key={a.id} className="relative flex gap-3 pb-4 last:pb-0">
                {i < activity.length - 1 && <span aria-hidden className="absolute top-8 bottom-1 left-3 w-px bg-border" />}
                <IconChip size="sm" tone={tone}>
                  {icon}
                </IconChip>
                <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="truncate text-sm font-medium">{a.title}</span>
                    <span className="shrink-0 text-xs text-muted-foreground tabular-nums">{a.time}</span>
                  </div>
                  <span className="truncate text-xs text-muted-foreground">{a.detail}</span>
                </div>
              </li>
            )
          })}
        </ol>
      </CardContent>
    </Card>
  )
}

/* ───────────────────────── Invoices ───────────────────────── */

const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })
const statusVariant = { Paid: "success", Pending: "warning", Overdue: "destructive", Refunded: "outline" } as const

const columns: TableColumn<Invoice>[] = [
  {
    key: "workspace",
    header: "Workspace",
    width: 220,
    grow: true,
    sortable: true,
    cell: (r) => (
      <span className="flex min-w-0 flex-col leading-tight">
        <span className="truncate font-medium">{r.workspace}</span>
        <span className="truncate text-xs text-muted-foreground">{r.owner}</span>
      </span>
    ),
  },
  { key: "id", header: "Invoice", width: 110, sortable: true, cell: (r) => <span className="font-mono text-xs text-muted-foreground">{r.id}</span> },
  { key: "plan", header: "Plan", width: 110, sortable: true },
  { key: "seats", header: "Seats", width: 96, align: "right", sortable: true, cell: (r) => <span className="tabular-nums">{r.seats}</span> },
  {
    key: "status",
    header: "Status",
    width: 110,
    sortable: true,
    cell: (r) => (
      <Badge size="sm" variant={statusVariant[r.status]}>
        {r.status}
      </Badge>
    ),
  },
  { key: "amount", header: "Amount", width: 110, align: "right", sortable: true, cell: (r) => <span className="font-medium tabular-nums">{money.format(r.amount)}</span> },
  { key: "issued", header: "Issued", width: 90, align: "right", cell: (r) => <span className="text-muted-foreground">{r.issued}</span> },
  {
    key: "actions",
    header: <span className="sr-only">Actions</span>,
    width: 56,
    align: "right",
    resizable: false,
    cell: (r) => (
      <Menu>
        <MenuTrigger render={<Button variant="ghost" size="icon-xs" aria-label={`Actions for ${r.id}`} />}>
          <MoreHorizontalIcon />
        </MenuTrigger>
        <MenuContent align="end" className="w-44">
          <MenuItem>
            <FileIcon />
            Open invoice
          </MenuItem>
          <MenuItem>
            <BoltIcon />
            Retry charge
          </MenuItem>
          <MenuItem>
            <UsersIcon />
            View workspace
          </MenuItem>
        </MenuContent>
      </Menu>
    ),
  },
]

export function InvoicesCard() {
  const [sort, setSort] = React.useState<SortState>({ key: "id", direction: "desc" })
  const [filter, setFilter] = React.useState<"all" | "open">("all")
  const rows = React.useMemo(
    () => (filter === "open" ? invoices.filter((i) => i.status === "Pending" || i.status === "Overdue") : invoices),
    [filter]
  )
  return (
    <section aria-labelledby="invoices-title" className="flex min-w-0 flex-col gap-3">
      <div className="flex flex-wrap items-end justify-between gap-3 px-1">
        <div className="flex flex-col gap-1">
          <h2 id="invoices-title" className="text-base font-semibold tracking-tight">
            Recent invoices
          </h2>
          <p className="text-sm text-muted-foreground">
            {rows.length} invoices · {money.format(rows.reduce((s, r) => s + r.amount, 0))} billed
          </p>
        </div>
        <Tabs value={filter} onValueChange={(v) => setFilter(v as "all" | "open")}>
          <TabsList aria-label="Filter invoices">
            <TabsTab value="all">All</TabsTab>
            <TabsTab value="open">Open</TabsTab>
          </TabsList>
        </Tabs>
      </div>
      <Table
        aria-label="Recent invoices"
        data={rows}
        columns={columns}
        getRowId={(r) => r.id}
        sort={sort}
        onSortChange={setSort}
        rowHeight={52}
        height={rows.length * 52 + 40}
        animateLayout
      />
    </section>
  )
}
