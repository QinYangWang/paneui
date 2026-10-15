import { OverflowHintText } from "@/registry/base-nova/ui/overflow-hint"

const summary =
  "Moved the session store to a single reducer, split the transport into its own module and added retries with backoff for dropped connections. The old event names still work for one release."

export default function OverflowHintLines() {
  return (
    <div className="flex w-72 flex-col gap-1 rounded-xl bg-card p-3 shadow-raised">
      <p className="text-ui font-medium">Refactor session store</p>
      <div className="text-ui text-muted-foreground">
        <OverflowHintText lines={2}>{summary}</OverflowHintText>
      </div>
    </div>
  )
}
