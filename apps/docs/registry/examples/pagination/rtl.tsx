"use client"

import * as React from "react"
import { DirectionProvider } from "@base-ui/react/direction-provider"
import { Pagination } from "@paneui/ui/components/pagination"

export default function PaginationRtl() {
  const [page, setPage] = React.useState(4)
  return (
    <DirectionProvider direction="rtl">
      <div dir="rtl">
        <Pagination page={page} pageCount={12} onPageChange={setPage} aria-label="ترقيم الصفحات" />
      </div>
    </DirectionProvider>
  )
}
