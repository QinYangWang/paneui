import { InboxIcon, PlusIcon } from "@/components/icons"
import { Button } from "@/registry/base-nova/ui/button"
import {
  EmptyState,
  EmptyStateActions,
  EmptyStateDescription,
  EmptyStateIcon,
  EmptyStateTitle,
} from "@/registry/base-nova/ui/empty-state"

export default function EmptyStateDemo() {
  return (
    <EmptyState variant="outline" className="max-w-md">
      <EmptyStateIcon>
        <InboxIcon />
      </EmptyStateIcon>
      <EmptyStateTitle>No invoices yet</EmptyStateTitle>
      <EmptyStateDescription>Invoices appear here after the first successful charge.</EmptyStateDescription>
      <EmptyStateActions>
        <Button size="sm">
          <PlusIcon data-icon="inline-start" />
          Create invoice
        </Button>
        <Button size="sm" variant="ghost">
          Learn more
        </Button>
      </EmptyStateActions>
    </EmptyState>
  )
}
