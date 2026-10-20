"use client"

import * as React from "react"

import { Pagination } from "@paneui/ui/components/pagination"

export default function PaginationCompact() {
  const [page, setPage] = React.useState(2)
  return <Pagination compact page={page} pageCount={9} onPageChange={setPage} />
}
