import { Button } from "@/registry/base-nova/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/registry/base-nova/ui/dialog"

export default function DialogNoCloseButton() {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="secondary" />}>Review terms</DialogTrigger>
      <DialogContent showClose={false}>
        <DialogHeader>
          <DialogTitle>Updated terms of service</DialogTitle>
          <DialogDescription>
            We changed how long we keep deleted files: they now stay in the trash for 30 days instead of 7.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose render={<Button />}>Got it</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
