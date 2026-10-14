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

const sections = [
  ["Your content", "You keep ownership of everything you upload. We only process it to run the service you asked for."],
  ["Acceptable use", "Don’t use the workspace to send spam, scrape other services or host malware. We may suspend accounts that do."],
  ["Billing", "Plans renew monthly. You can cancel any time from Settings → Billing; access continues until the period ends."],
  ["Data retention", "Deleted projects stay in the trash for 30 days, then they’re removed from our servers and backups."],
  ["Third-party services", "Integrations you connect follow their own terms. Disconnecting one stops any further data sharing."],
  ["Changes to these terms", "We’ll email you at least 14 days before a change takes effect, with a summary of what’s different."],
  ["Contact", "Questions about these terms go to legal@example.com. We answer within two business days."],
]

export default function DialogLongContent() {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="secondary" />}>Review terms</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Terms of service</DialogTitle>
          <DialogDescription>Updated October 2026. Scroll to read every section before you accept.</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 text-sm">
          {sections.map(([title, body]) => (
            <section key={title} className="flex flex-col gap-1">
              <h3 className="font-medium">{title}</h3>
              <p className="text-pretty text-muted-foreground">{body}</p>
            </section>
          ))}
        </div>
        <DialogFooter>
          <DialogClose render={<Button variant="secondary" />}>Decline</DialogClose>
          <DialogClose render={<Button />}>Accept</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
