"use client"

import * as React from "react"

import { Pagination } from "@/registry/base-nova/ui/pagination"

export default function PaginationCompact() {
  const [page, setPage] = React.useState(2)
  return <Pagination compact page={page} pageCount={9} onPageChange={setPage} />
}
