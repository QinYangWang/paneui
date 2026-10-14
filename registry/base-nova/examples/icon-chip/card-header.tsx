import { CreditCardIcon } from "@/components/icons"
import { Button } from "@/registry/base-nova/ui/button"
import { Card, CardAction, CardDescription, CardHeader, CardTitle } from "@/registry/base-nova/ui/card"
import { IconChip } from "@/registry/base-nova/ui/icon-chip"

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
