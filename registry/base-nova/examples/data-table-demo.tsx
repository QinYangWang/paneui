"use client"

import * as React from "react"

import { MailIcon, TrashIcon } from "@/components/icons"
import { Badge } from "@/registry/base-nova/ui/badge"
import { Button } from "@/registry/base-nova/ui/button"
import { DataTable, DataTableRowActions, type DataTableColumn } from "@/registry/base-nova/ui/data-table"
import { MenuItem } from "@/registry/base-nova/ui/menu"

type Customer = { id: string; name: string; company: string; plan: string; status: "active" | "trialing" | "past_due"; mrr: number }

const names = ["Ada Okafor", "Ben Lindqvist", "Chloe Moreau", "Diego Santos", "Elif Yilmaz", "Farah Haddad", "Gus Becker", "Hana Sato", "Ivan Petrov", "Jules Laurent", "Kai Nakamura", "Lena Fischer", "Mateo Ruiz", "Nora Kowalski", "Omar Aziz", "Priya Raman", "Quinn Byrne", "Rosa Costa", "Sam Weller", "Tara Iyer", "Uma Park", "Vik Mehta", "Wren Ellis", "Yara Novak"]
const companies = ["Northwind", "Paperplane", "Orbital", "Fathom", "Marlow", "Quill"]
const statuses = ["active", "active", "trialing", "past_due"] as const
const data: Customer[] = names.map((name, i) => ({
  id: `c${i}`,
  name,
  company: companies[i % companies.length],
  plan: i % 5 === 0 ? "Enterprise" : i % 3 === 0 ? "Solo" : "Team",
  status: statuses[i % statuses.length],
  mrr: ((i * 37) % 23) * 29 + 29,
}))

const variant = { active: "success", trialing: "primary", past_due: "warning" } as const
const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })

const columns: DataTableColumn<Customer>[] = [
  { key: "name", header: "Customer", width: 180, grow: true, sortable: true, hideable: false },
  { key: "company", header: "Company", width: 130, sortable: true },
  { key: "plan", header: "Plan", width: 110, sortable: true },
  {
    key: "status",
    header: "Status",
    width: 110,
    sortable: true,
    cell: (r) => (
      <Badge size="sm" variant={variant[r.status]}>
        {r.status.replace("_", " ")}
      </Badge>
    ),
  },
  { key: "mrr", header: "MRR", width: 90, align: "right", sortable: true, cell: (r) => <span className="tabular-nums">{usd.format(r.mrr)}</span> },
  {
    key: "actions",
    header: <span className="sr-only">Actions</span>,
    hideable: false,
    width: 52,
    cell: (r) => (
      <DataTableRowActions label={`Actions for ${r.name}`}>
        <MenuItem>
          <MailIcon />
          Email
        </MenuItem>
        <MenuItem variant="destructive">
          <TrashIcon />
          Remove
        </MenuItem>
      </DataTableRowActions>
    ),
  },
]

export default function DataTableDemo() {
  return (
    <div className="w-full">
      <DataTable
        aria-label="Customers"
        data={data}
        columns={columns}
        getRowId={(r) => r.id}
        filters={[
          { key: "status", label: "Status", options: statuses.filter((s, i, a) => a.indexOf(s) === i).map((s) => ({ value: s, label: s.replace("_", " ") })) },
          { key: "plan", label: "Plan", options: ["Solo", "Team", "Enterprise"].map((p) => ({ value: p, label: p })) },
        ]}
        defaultSort={{ key: "mrr", direction: "desc" }}
        defaultPageSize={5}
        pageSizeOptions={[5, 10, 20]}
        selectable
        noun="customers"
        bulkActions={(rows, clear) => (
          <Button size="sm" variant="secondary" onClick={clear}>
            <MailIcon data-icon="inline-start" />
            Email {rows.length}
          </Button>
        )}
      />
    </div>
  )
}
