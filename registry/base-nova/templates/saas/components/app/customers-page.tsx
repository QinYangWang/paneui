"use client"

import * as React from "react"

import { CopyIcon, DownloadIcon, EditIcon, MailIcon, PlusIcon, TrashIcon, UsersIcon } from "@/components/icons"
import { Avatar, AvatarFallback } from "@/registry/base-nova/ui/avatar"
import { Badge } from "@/registry/base-nova/ui/badge"
import { Button } from "@/registry/base-nova/ui/button"
import { DataTable, DataTableRowActions, type DataTableColumn, type DataTableFilter } from "@/registry/base-nova/ui/data-table"
import { Drawer, DrawerBody, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from "@/registry/base-nova/ui/drawer"
import { EmptyState, EmptyStateActions, EmptyStateDescription, EmptyStateIcon, EmptyStateTitle } from "@/registry/base-nova/ui/empty-state"
import { MenuItem, MenuSeparator } from "@/registry/base-nova/ui/menu"
import {
  PageHeader,
  PageHeaderActions,
  PageHeaderContent,
  PageHeaderDescription,
  PageHeaderTitle,
} from "@/registry/base-nova/ui/page-header"
import { SegmentedControl, SegmentedControlItem } from "@/registry/base-nova/ui/segmented-control"
import { useToast } from "@/registry/base-nova/ui/toast"

import { customers as seed, invoicesFor, regions, type Customer, type CustomerStatus } from "../../lib/data"
import { initials } from "../providers"

const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })

const statusLabel: Record<CustomerStatus, string> = { active: "Active", trialing: "Trialing", past_due: "Past due", canceled: "Canceled" }
const statusVariant = { active: "success", trialing: "primary", past_due: "warning", canceled: "outline" } as const

function StatusBadge({ status }: { status: CustomerStatus }) {
  return (
    <Badge size="sm" variant={statusVariant[status]}>
      {statusLabel[status]}
    </Badge>
  )
}

const filters: DataTableFilter<Customer>[] = [
  { key: "status", label: "Status", options: (Object.keys(statusLabel) as CustomerStatus[]).map((s) => ({ value: s, label: statusLabel[s] })) },
  { key: "plan", label: "Plan", options: ["Solo", "Team", "Enterprise"].map((p) => ({ value: p, label: p })) },
  { key: "region", label: "Region", options: regions.map((r) => ({ value: r, label: r })) },
]

/** `/dashboard/customers`: searchable, filterable, paginated table with a detail drawer. */
export function CustomersPage() {
  const toast = useToast()
  const [rows, setRows] = React.useState<Customer[]>(seed)
  const [view, setView] = React.useState<"all" | "paying">("all")
  const [open, setOpen] = React.useState<Customer | null>(null)

  const data = React.useMemo(() => (view === "paying" ? rows.filter((r) => r.mrr > 0) : rows), [rows, view])
  const remove = (ids: string[]) => {
    setRows((r) => r.filter((c) => !ids.includes(c.id)))
    toast.add({ title: ids.length === 1 ? "Customer removed" : `${ids.length} customers removed`, type: "success" })
  }

  const columns = React.useMemo<DataTableColumn<Customer>[]>(
    () => [
      {
        key: "name",
        header: "Customer",
        width: 260,
        grow: true,
        sortable: true,
        hideable: false,
        cell: (r) => (
          <span className="flex min-w-0 items-center gap-2.5">
            <Avatar size="sm">
              <AvatarFallback>{initials(r.name)}</AvatarFallback>
            </Avatar>
            <span className="flex min-w-0 flex-col leading-tight">
              <span className="truncate font-medium">{r.name}</span>
              <span className="truncate text-xs text-muted-foreground">{r.email}</span>
            </span>
          </span>
        ),
      },
      { key: "company", header: "Company", width: 150, sortable: true },
      { key: "plan", header: "Plan", width: 110, sortable: true },
      { key: "status", header: "Status", width: 110, sortable: true, cell: (r) => <StatusBadge status={r.status} /> },
      { key: "seats", header: "Seats", width: 90, align: "right", sortable: true, cell: (r) => <span className="tabular-nums">{r.seats}</span> },
      { key: "mrr", header: "MRR", width: 100, align: "right", sortable: true, cell: (r) => <span className="font-medium tabular-nums">{usd.format(r.mrr)}</span> },
      { key: "region", header: "Region", width: 140, sortable: true },
      {
        key: "joined",
        header: "Joined",
        width: 120,
        sortable: true,
        sortValue: (r) => r.joinedAt,
        cell: (r) => <span className="text-muted-foreground tabular-nums">{r.joined}</span>,
      },
      {
        key: "actions",
        header: <span className="sr-only">Actions</span>,
        label: "Actions",
        hideable: false,
        width: 56,
        align: "right",
        cell: (r) => (
          <DataTableRowActions label={`Actions for ${r.name}`}>
            <MenuItem onClick={() => setOpen(r)}>
              <EditIcon />
              Open details
            </MenuItem>
            <MenuItem
              onClick={() => {
                void navigator.clipboard?.writeText(r.email)
                toast.add({ title: "Email copied", description: r.email })
              }}
            >
              <CopyIcon />
              Copy email
            </MenuItem>
            <MenuItem onClick={() => toast.add({ title: `Email drafted to ${r.name}` })}>
              <MailIcon />
              Send email
            </MenuItem>
            <MenuSeparator />
            <MenuItem onClick={() => remove([r.id])} variant="destructive">
              <TrashIcon />
              Remove
            </MenuItem>
          </DataTableRowActions>
        ),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps -- remove/toast are stable enough for menu handlers
    [toast]
  )

  return (
    <>
      <PageHeader>
        <PageHeaderContent>
          <PageHeaderTitle>Customers</PageHeaderTitle>
          <PageHeaderDescription>Every workspace owner, their plan and what they pay.</PageHeaderDescription>
        </PageHeaderContent>
        <PageHeaderActions>
          <SegmentedControl value={view} onValueChange={(v) => setView(v as "all" | "paying")} aria-label="Customers to show">
            <SegmentedControlItem value="all">All</SegmentedControlItem>
            <SegmentedControlItem value="paying">Paying</SegmentedControlItem>
          </SegmentedControl>
          <Button size="sm" onClick={() => toast.add({ title: "Add customer", description: "Wire this to your create flow." })}>
            <PlusIcon data-icon="inline-start" />
            Add customer
          </Button>
        </PageHeaderActions>
      </PageHeader>

      <DataTable
        aria-label="Customers"
        data={data}
        columns={columns}
        getRowId={(r) => r.id}
        filters={filters}
        searchPlaceholder="Search customers…"
        searchText={(r) => `${r.name} ${r.email} ${r.company}`}
        defaultSort={{ key: "mrr", direction: "desc" }}
        defaultHiddenColumns={["region"]}
        selectable
        noun="customers"
        onRowClick={({ row }) => setOpen(row)}
        toolbar={
          <Button variant="outline" size="sm" onClick={() => toast.add({ title: "Export started", description: `${data.length} customers to CSV.`, type: "success" })}>
            <DownloadIcon data-icon="inline-start" />
            Export
          </Button>
        }
        bulkActions={(selected, clear) => (
          <>
            <Button variant="secondary" size="sm" onClick={() => toast.add({ title: `Emailing ${selected.length} customers` })}>
              <MailIcon data-icon="inline-start" />
              Email
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => {
                remove(selected.map((s) => s.id))
                clear()
              }}
            >
              <TrashIcon data-icon="inline-start" />
              Remove
            </Button>
          </>
        )}
        emptyState={
          <EmptyState>
            <EmptyStateIcon>
              <UsersIcon />
            </EmptyStateIcon>
            <EmptyStateTitle>No customers yet</EmptyStateTitle>
            <EmptyStateDescription>Customers appear here when someone creates a workspace.</EmptyStateDescription>
            <EmptyStateActions>
              <Button size="sm" onClick={() => setRows(seed)}>
                Restore demo data
              </Button>
            </EmptyStateActions>
          </EmptyState>
        }
      />

      <CustomerDrawer customer={open} onOpenChange={(o) => !o && setOpen(null)} onRemove={(c) => (remove([c.id]), setOpen(null))} />
    </>
  )
}

function CustomerDrawer({
  customer,
  onOpenChange,
  onRemove,
}: {
  customer: Customer | null
  onOpenChange: (open: boolean) => void
  onRemove: (c: Customer) => void
}) {
  // keep the last customer while the drawer animates out
  const [shown, setShown] = React.useState<Customer | null>(customer)
  React.useEffect(() => {
    if (customer) setShown(customer)
  }, [customer])
  const c = customer ?? shown
  return (
    <Drawer side="right" open={!!customer} onOpenChange={onOpenChange}>
      <DrawerContent className="w-md">
        {c && (
          <>
            <DrawerHeader>
              <div className="flex items-center gap-3">
                <Avatar size="lg">
                  <AvatarFallback>{initials(c.name)}</AvatarFallback>
                </Avatar>
                <div className="flex min-w-0 flex-col">
                  <DrawerTitle>{c.name}</DrawerTitle>
                  <DrawerDescription>{c.email}</DrawerDescription>
                </div>
              </div>
            </DrawerHeader>
            <DrawerBody className="flex flex-col gap-6">
              <dl className="grid grid-cols-2 gap-x-4 gap-y-3 rounded-xl bg-muted p-4 text-sm">
                {[
                  ["Company", c.company],
                  ["Plan", c.plan],
                  ["Status", <StatusBadge key="s" status={c.status} />],
                  ["Seats", c.seats],
                  ["MRR", usd.format(c.mrr)],
                  ["Region", c.region],
                  ["Joined", c.joined],
                  ["Last active", c.lastActive],
                ].map(([k, v]) => (
                  <div key={String(k)} className="flex flex-col gap-0.5">
                    <dt className="text-xs text-muted-foreground">{k}</dt>
                    <dd className="font-medium tabular-nums">{v}</dd>
                  </div>
                ))}
              </dl>
              <section className="flex flex-col gap-2">
                <h3 className="text-sm font-semibold">Invoices</h3>
                <ul className="flex flex-col divide-y divide-border rounded-xl bg-card text-sm shadow-raised">
                  {invoicesFor(c).map((inv) => (
                    <li key={inv.id} className="flex items-center gap-3 px-4 py-2.5">
                      <div className="flex min-w-0 flex-1 flex-col">
                        <span className="font-mono text-xs">{inv.id}</span>
                        <span className="text-xs text-muted-foreground">
                          {inv.date} · {inv.description}
                        </span>
                      </div>
                      <Badge size="sm" variant={inv.status === "Paid" ? "success" : inv.status === "Open" ? "warning" : "outline"}>
                        {inv.status}
                      </Badge>
                      <span className="w-16 text-right font-medium tabular-nums">{usd.format(inv.amount)}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </DrawerBody>
            <DrawerFooter className="flex gap-2">
              <Button variant="destructive" onClick={() => onRemove(c)}>
                <TrashIcon data-icon="inline-start" />
                Remove
              </Button>
              <Button variant="secondary" className="ml-auto" onClick={() => onOpenChange(false)}>
                Close
              </Button>
              <Button>
                <MailIcon data-icon="inline-start" />
                Email
              </Button>
            </DrawerFooter>
          </>
        )}
      </DrawerContent>
    </Drawer>
  )
}
