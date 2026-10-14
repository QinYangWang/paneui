"use client"

import * as React from "react"

import { Button } from "@/registry/base-nova/ui/button"
import {
  BottomSheet,
  BottomSheetBody,
  BottomSheetContent,
  BottomSheetFooter,
  BottomSheetHeader,
  BottomSheetTitle,
} from "@/registry/base-nova/ui/bottom-sheet"

export default function BottomSheetWithoutHandle() {
  const [open, setOpen] = React.useState(false)

  return (
    <>
      <Button variant="secondary" onClick={() => setOpen(true)}>
        Filters
      </Button>
      <BottomSheet open={open} onOpenChange={setOpen} snapPoints={[0.5]}>
        <BottomSheetContent showHandle={false}>
          <BottomSheetHeader className="pt-6">
            <BottomSheetTitle>Filters</BottomSheetTitle>
          </BottomSheetHeader>
          <BottomSheetBody className="text-muted-foreground">
            No grip here: the header is still a drag zone, and Esc or the backdrop closes the sheet.
          </BottomSheetBody>
          <BottomSheetFooter>
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Reset
            </Button>
            <Button onClick={() => setOpen(false)}>Show 24 results</Button>
          </BottomSheetFooter>
        </BottomSheetContent>
      </BottomSheet>
    </>
  )
}
