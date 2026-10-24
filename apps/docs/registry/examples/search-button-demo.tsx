"use client"

import * as React from "react"
import { SearchButton } from "@paneui/ui/components/search-button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@paneui/ui/components/dialog"
import { Input } from "@paneui/ui/components/input"
import { useT } from "@/lib/site-locale"

export default function SearchButtonDemo() {
  const [open, setOpen] = React.useState(false)
  const t = useT()
  const label = t({ en: "Search documentation", zh: "搜索文档" })
  return <>
    <SearchButton label={label} onClick={() => setOpen(true)} />
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent><DialogHeader><DialogTitle>{label}</DialogTitle></DialogHeader><Input aria-label={label} placeholder={label} /></DialogContent>
    </Dialog>
  </>
}
