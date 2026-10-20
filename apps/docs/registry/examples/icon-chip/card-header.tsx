import { CreditCardIcon } from "@paneui/ui/icons"
import { Button } from "@paneui/ui/components/button"
import { Card, CardAction, CardDescription, CardHeader, CardTitle } from "@paneui/ui/components/card"
import { IconChip } from "@paneui/ui/components/icon-chip"

export default function IconChipCardHeader() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <div className="flex items-start gap-3">
          <IconChip tone="primary" size="lg">
            <CreditCardIcon />
          </IconChip>
          <div className="flex flex-col gap-1">
            <CardTitle>Billing</CardTitle>
            <CardDescription>Pro plan, renews Nov 1.</CardDescription>
          </div>
        </div>
        <CardAction>
          <Button variant="secondary" size="sm">
            Manage
          </Button>
        </CardAction>
      </CardHeader>
    </Card>
  )
}
