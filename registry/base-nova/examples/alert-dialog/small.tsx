import { LogOutIcon } from "@/components/icons"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/registry/base-nova/ui/alert-dialog"
import { Button } from "@/registry/base-nova/ui/button"
import { IconChip } from "@/registry/base-nova/ui/icon-chip"

export default function AlertDialogSmall() {
  return (
    <AlertDialog>
      <AlertDialogTrigger render={<Button variant="secondary" />}>Sign out</AlertDialogTrigger>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia>
            <IconChip size="lg">
              <LogOutIcon className="rtl:-scale-x-100" />
            </IconChip>
          </AlertDialogMedia>
          <AlertDialogTitle>Sign out of all devices?</AlertDialogTitle>
          <AlertDialogDescription>You’ll need your password to sign back in.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Sign out</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
