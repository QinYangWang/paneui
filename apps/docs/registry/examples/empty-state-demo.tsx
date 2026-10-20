import { InboxIcon, PlusIcon } from "@paneui/ui/icons"
import { Button } from "@paneui/ui/components/button"
import {
  EmptyState,
  EmptyStateActions,
  EmptyStateDescription,
  EmptyStateIcon,
  EmptyStateTitle,
} from "@paneui/ui/components/empty-state"

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
