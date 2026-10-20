"use client"

import * as React from "react"

import { Button } from "@paneui/ui/components/button"
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@paneui/ui/components/drawer"

export default function DrawerControlled() {
  const [open, setOpen] = React.useState(false)
  const [archived, setArchived] = React.useState(0)

  return (
    <div className="flex flex-col items-center gap-2">
      <Button variant="secondary" onClick={() => setOpen(true)}>
        Review 3 old threads
      </Button>
      <p className="text-xs text-muted-foreground tabular-nums">{archived} archived</p>
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Archive old threads?</DrawerTitle>
            <DrawerDescription>3 threads have had no replies for 30 days.</DrawerDescription>
          </DrawerHeader>
          <DrawerBody className="text-muted-foreground">
            Archived threads stay searchable and come back when someone replies.
          </DrawerBody>
          <DrawerFooter>
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Not now
            </Button>
            <Button
              onClick={() => {
                setArchived((n) => n + 3)
                setOpen(false)
              }}
            >
              Archive
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  )
}
