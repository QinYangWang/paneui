"use client"

import * as React from "react"

import { Button } from "@paneui/ui/components/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@paneui/ui/components/dialog"
import { useIosInputZoomLock } from "@paneui/ui/components/ios-zoom-lock"
import { Textarea } from "@paneui/ui/components/textarea"

export default function IosZoomLockScoped() {
  const [open, setOpen] = React.useState(false)
  useIosInputZoomLock({ enabled: open })
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button variant="secondary" />}>Reply</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reply</DialogTitle>
        </DialogHeader>
        <Textarea aria-label="Message" placeholder="Write a reply" />
        <DialogFooter>
          <DialogClose render={<Button variant="secondary" />}>Cancel</DialogClose>
          <DialogClose render={<Button />}>Send</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
