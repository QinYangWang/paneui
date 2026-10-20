import { SearchIcon } from "@paneui/ui/icons"
import { EmptyState, EmptyStateDescription, EmptyStateIcon, EmptyStateTitle } from "@paneui/ui/components/empty-state"

export default function EmptyStateVariants() {
  return (
    <div className="grid w-full max-w-2xl grid-cols-1 gap-4 sm:grid-cols-3">
      {(["default", "outline", "muted"] as const).map((v) => (
        <EmptyState key={v} variant={v} size="sm">
          <EmptyStateIcon>
            <SearchIcon />
          </EmptyStateIcon>
          <EmptyStateTitle>No results</EmptyStateTitle>
          <EmptyStateDescription>{v}</EmptyStateDescription>
        </EmptyState>
      ))}
    </div>
  )
}
