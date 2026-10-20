import { LogOutIcon } from "@paneui/ui/icons"
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
} from "@paneui/ui/components/alert-dialog"
import { Button } from "@paneui/ui/components/button"
import { IconChip } from "@paneui/ui/components/icon-chip"

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
