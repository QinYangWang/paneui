"use client"

import * as React from "react"

import { Table, type TableColumn } from "@/registry/base-nova/ui/table"

type Member = { id: string; name: string; role: string; lastActive: string; suspended?: boolean }

const members: Member[] = [
  { id: "m1", name: "Mina Park", role: "Owner", lastActive: "Just now" },
  { id: "m2", name: "Leo Chen", role: "Admin", lastActive: "2h ago" },
  { id: "m3", name: "Ava Ruiz", role: "Editor", lastActive: "Yesterday" },
  { id: "m4", name: "Sam Okafor", role: "Viewer", lastActive: "3 weeks ago", suspended: true },
  { id: "m5", name: "Noor Haddad", role: "Editor", lastActive: "Oct 2" },
  { id: "m6", name: "Kai Tanaka", role: "Viewer", lastActive: "Sep 28" },
]

const columns: TableColumn<Member>[] = [
  {
    key: "name",
    header: "Name",
    width: 180,
    grow: true,
    sortable: true,
    cell: (r) => (r.suspended ? `${r.name} · suspended` : r.name),
  },
  { key: "role", header: "Role", width: 110, sortable: true },
  { key: "lastActive", header: "Last active", width: 130, align: "right" },
]

export default function TableRowClick() {
  const [open, setOpen] = React.useState<Member | null>(null)
  return (
    <div className="flex w-full max-w-xl flex-col gap-3">
      <Table
        aria-label="Members"
        data={members}
        columns={columns}
        getRowId={(r) => r.id}
        rowHeight={36}
        headerHeight={36}
        height={260}
        defaultSort={{ key: "name", direction: "asc" }}
        onRowClick={({ row }) => setOpen(row)}
        rowClassName={({ row }) => (row.suspended ? "text-muted-foreground" : undefined)}
      />
      <p className="px-1 text-xs text-muted-foreground">
        {open ? (
          <>
            Opened <span className="font-medium text-foreground">{open.name}</span>
            {open.suspended ? " (suspended)" : ""}
          </>
        ) : (
          "Click a row to open the member."
        )}
      </p>
    </div>
  )
}
