"use client"

import { Table, type TableColumn } from "@paneui/ui/components/table"

type Invoice = { id: string; client: string; issued: string; total: number; paid: boolean }

const invoices: Invoice[] = [
  { id: "INV-2041", client: "Northwind Studio", issued: "Oct 1", total: 4200, paid: true },
  { id: "INV-2042", client: "Lumen Health", issued: "Oct 3", total: 1850, paid: false },
  { id: "INV-2043", client: "Harbor & Pine", issued: "Oct 6", total: 920, paid: true },
  { id: "INV-2044", client: "Atlas Robotics", issued: "Oct 9", total: 12600, paid: false },
  { id: "INV-2045", client: "Copperleaf Café", issued: "Oct 12", total: 340, paid: true },
]

const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })

const columns: TableColumn<Invoice>[] = [
  { key: "id", header: "Invoice", width: 120 },
  { key: "client", header: "Client", width: 200, grow: true },
  { key: "issued", header: "Issued", width: 100 },
  { key: "status", header: "Status", width: 100, accessor: (r) => (r.paid ? "Paid" : "Open") },
  { key: "total", header: "Total", width: 110, align: "right", cell: (r) => <span className="tabular-nums">{usd.format(r.total)}</span> },
]

export default function TableBasic() {
  return (
    <div className="w-full max-w-2xl">
      <Table aria-label="Invoices" data={invoices} columns={columns} getRowId={(r) => r.id} height={264} />
    </div>
  )
}
