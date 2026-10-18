"use client"

import * as React from "react"

import { BellIcon, ChartIcon, DownloadIcon, FileIcon, PlusIcon, ServerIcon, UsersIcon } from "@/components/icons"
import { Badge } from "@/registry/base-nova/ui/badge"
import { Button } from "@/registry/base-nova/ui/button"
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/registry/base-nova/ui/card"
import { IconChip } from "@/registry/base-nova/ui/icon-chip"
import { NumberTicker } from "@/registry/base-nova/ui/number-ticker"
import {
  PageHeader,
  PageHeaderActions,
  PageHeaderContent,
  PageHeaderDescription,
  PageHeaderTitle,
} from "@/registry/base-nova/ui/page-header"
import { SegmentedControl, SegmentedControlItem } from "@/registry/base-nova/ui/segmented-control"
import {
  StatCard,
  StatCardDelta,
  StatCardFooter,
  StatCardHeader,
  StatCardHint,
  StatCardLabel,
  StatCardSparkline,
  StatCardValue,
} from "@/registry/base-nova/ui/stat-card"
import { useToast } from "@/registry/base-nova/ui/toast"
import { TrendChart } from "@/registry/base-nova/ui/trend-chart"
import { UsageMeter } from "@/registry/base-nova/ui/usage-meter"

import { useSession } from "../../lib/auth"
import { activity, billing, customers, kpis, revenue, revenueSeries, usageDaily, usageSeries, type Activity } from "../../lib/data"
import { AppLink, routes } from "../../lib/routes"

const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })
const num = new Intl.NumberFormat("en-US")

/** `/dashboard` */
export function OverviewPage() {
  const { user } = useSession()
  const toast = useToast()
  const [chart, setChart] = React.useState<"area" | "bar">("area")
  const last30 = usageDaily.slice(-30)

  return (
    <>
      <PageHeader>
        <PageHeaderContent>
          <PageHeaderTitle>Good morning{user ? `, ${user.name.split(" ")[0]}` : ""}</PageHeaderTitle>
          <PageHeaderDescription>Revenue, usage and activity across 1,584 workspaces.</PageHeaderDescription>
        </PageHeaderContent>
        <PageHeaderActions>
          <Button variant="secondary" size="sm" onClick={() => toast.add({ title: "Export started", description: "We'll email you the CSV.", type: "success" })}>
            <DownloadIcon data-icon="inline-start" />
            Export
          </Button>
          <Button size="sm" nativeButton={false} render={<AppLink href={routes.customers} />}>
            <PlusIcon data-icon="inline-start" />
            Add customer
          </Button>
        </PageHeaderActions>
      </PageHeader>

      <section aria-label="Key metrics" className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((k) => (
          <StatCard key={k.id}>
            <StatCardHeader>
              <StatCardLabel>{k.label}</StatCardLabel>
              <StatCardDelta value={k.delta} invert={k.invert} unit={k.format.style === "percent" ? " pts" : "%"} />
            </StatCardHeader>
            <StatCardValue>
              <NumberTicker value={k.value} locale="en-US" format={k.format} />
            </StatCardValue>
            <StatCardFooter>
              <StatCardHint>{k.hint}</StatCardHint>
              <StatCardSparkline values={k.trend} label={`${k.label} trend`} />
            </StatCardFooter>
          </StatCard>
        ))}
      </section>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <Card className="min-w-0 xl:col-span-2">
          <CardHeader>
            <CardTitle>Revenue</CardTitle>
            <CardDescription>MRR by plan, last 12 months</CardDescription>
            <CardAction>
              <SegmentedControl size="sm" value={chart} onValueChange={(v) => setChart(v as "area" | "bar")} aria-label="Chart type">
                <SegmentedControlItem value="area">Area</SegmentedControlItem>
                <SegmentedControlItem value="bar">Bars</SegmentedControlItem>
              </SegmentedControl>
            </CardAction>
          </CardHeader>
          <CardContent>
            <TrendChart series={revenueSeries} data={revenue} variant={chart} stacked height={260} formatValue={(v) => usd.format(v)} label="Revenue by plan" />
          </CardContent>
        </Card>
        <ActivityCard />
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <Card className="min-w-0 xl:col-span-2">
          <CardHeader>
            <CardTitle>Agent runs</CardTitle>
            <CardDescription>Last 30 days, by kind</CardDescription>
            <CardAction>
              <Button variant="ghost" size="xs" nativeButton={false} render={<AppLink href={routes.analytics} />}>
                Open analytics
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <TrendChart series={usageSeries} data={last30} variant="bar" stacked height={220} formatValue={(v) => num.format(v)} label="Agent runs by kind" />
          </CardContent>
        </Card>
        <Card className="min-w-0">
          <CardHeader>
            <CardTitle>Plan usage</CardTitle>
            <CardDescription>
              {billing.plan} · renews {billing.renews}
            </CardDescription>
            <CardAction>
              <Button variant="ghost" size="xs" nativeButton={false} render={<AppLink href={routes.settingsBilling} />}>
                Manage
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent className="flex flex-col gap-5">
            {billing.usage.map((u) => (
              <UsageMeter key={u.id} label={u.label} value={u.value} max={u.max} unit={u.unit} description={u.description} />
            ))}
          </CardContent>
        </Card>
      </div>

      <TopCustomers />
    </>
  )
}

const activityIcon: Record<Activity["kind"], { icon: React.ReactNode; tone: "primary" | "success" | "warning" | "neutral" }> = {
  upgrade: { icon: <ChartIcon />, tone: "success" },
  invoice: { icon: <FileIcon />, tone: "neutral" },
  member: { icon: <UsersIcon />, tone: "primary" },
  alert: { icon: <BellIcon />, tone: "warning" },
  deploy: { icon: <ServerIcon />, tone: "neutral" },
}

function ActivityCard() {
  return (
    <Card className="min-w-0">
      <CardHeader>
        <CardTitle>Recent activity</CardTitle>
        <CardDescription>Across all workspaces</CardDescription>
      </CardHeader>
      <CardContent>
        <ol className="flex flex-col">
          {activity.map((a, i) => {
            const { icon, tone } = activityIcon[a.kind]
            return (
              <li key={a.id} className="relative flex gap-3 pb-4 last:pb-0">
                {i < activity.length - 1 && <span aria-hidden className="absolute top-7 bottom-1 left-3 w-px bg-border" />}
                <IconChip size="sm" tone={tone}>
                  {icon}
                </IconChip>
                <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="truncate font-medium">{a.title}</span>
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

function TopCustomers() {
  const top = [...customers].sort((a, b) => b.mrr - a.mrr).slice(0, 5)
  return (
    <Card className="min-w-0">
      <CardHeader>
        <CardTitle>Top customers</CardTitle>
        <CardDescription>By monthly recurring revenue</CardDescription>
        <CardAction>
          <Button variant="ghost" size="xs" nativeButton={false} render={<AppLink href={routes.customers} />}>
            View all
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <ul className="flex flex-col divide-y divide-border">
          {top.map((c) => (
            <li key={c.id} className="flex items-center gap-3 py-2.5 first:pt-0 last:pb-0">
              <div className="flex min-w-0 flex-1 flex-col">
                <span className="truncate font-medium">{c.company}</span>
                <span className="truncate text-xs text-muted-foreground">
                  {c.name} · {c.seats} seats
                </span>
              </div>
              <Badge size="sm" variant={c.plan === "Enterprise" ? "primary" : "outline"}>
                {c.plan}
              </Badge>
              <span className="w-20 text-end font-medium tabular-nums">{usd.format(c.mrr)}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
