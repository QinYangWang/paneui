import { PullToRefresh } from "@paneui/ui/components/pull-to-refresh"

const ITEMS = ["Archived — March", "Archived — February", "Archived — January", "Archived — December", "Archived — November"]

export default function PullToRefreshDisabled() {
  return (
    <PullToRefresh
      onRefresh={() => undefined}
      disabled
      className="h-56 w-full max-w-sm rounded-2xl bg-card shadow-surface"
    >
      <p className="px-4 pt-3 text-xs text-muted-foreground">Archives don’t change, so pulling just scrolls.</p>
      <ul className="divide-y divide-border">
        {ITEMS.map((t) => (
          <li key={t} className="px-4 py-3 text-sm text-foreground">
            {t}
          </li>
        ))}
      </ul>
    </PullToRefresh>
  )
}
