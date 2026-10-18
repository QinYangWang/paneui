"use client"

import * as React from "react"

import { Button } from "@/registry/base-nova/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/registry/base-nova/ui/dialog"
import { useIosInputZoomLock } from "@/registry/base-nova/ui/ios-zoom-lock"
import { Textarea } from "@/registry/base-nova/ui/textarea"

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
