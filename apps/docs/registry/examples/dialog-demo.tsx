import { Button } from "@paneui/ui/components/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@paneui/ui/components/dialog"

export default function DialogDemo() {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="secondary" />}>Pause automations</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Pause all automations?</DialogTitle>
          <DialogDescription>Running tasks finish, and nothing new starts until you resume.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose render={<Button variant="secondary" />}>Cancel</DialogClose>
          <DialogClose render={<Button />}>Pause</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
