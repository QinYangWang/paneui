"use client"

import * as React from "react"

import { Pagination } from "@paneui/ui/components/pagination"

export default function PaginationSizes() {
  const [page, setPage] = React.useState(4)
  return (
    <div className="flex flex-col items-center gap-3">
      {(["sm", "default", "lg"] as const).map((size) => (
        <Pagination key={size} size={size} page={page} pageCount={12} onPageChange={setPage} />
      ))}
    </div>
  )
}
