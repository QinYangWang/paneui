"use client"

import * as React from "react"

import { Pagination, PaginationPageSize, PaginationSummary } from "@paneui/ui/components/pagination"

export default function PaginationDemo() {
  const [page, setPage] = React.useState(4)
  const [size, setSize] = React.useState(20)
  const total = 248
  return (
    <div className="flex w-full max-w-2xl flex-wrap items-center justify-between gap-4">
      <PaginationSummary page={page} pageSize={size} total={total} noun="customers" />
      <div className="flex items-center gap-4">
        <PaginationPageSize
          value={size}
          onValueChange={(s) => {
            setSize(s)
            setPage(1)
          }}
        />
        <Pagination page={page} pageCount={Math.ceil(total / size)} onPageChange={setPage} />
      </div>
    </div>
  )
}
