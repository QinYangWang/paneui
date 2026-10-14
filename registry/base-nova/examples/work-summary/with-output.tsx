import { WorkSummary, WorkSummaryStep } from "@/registry/base-nova/ui/work-summary"

export default function WorkSummaryWithOutput() {
  return (
    <div className="w-full max-w-md">
      <WorkSummary duration={394} defaultOpen>
        <WorkSummaryStep kind="think" title="Make both panes follow the pointer and persist once" />
        <WorkSummaryStep kind="execute" title="Run bun lint" status="failed">
          <pre className="rounded-lg bg-code px-2.5 py-1.5 font-mono text-ui-xs text-muted-foreground shadow-well">src/a.ts:12 unused import</pre>
        </WorkSummaryStep>
        <WorkSummaryStep kind="fetch" title="Fetch the API reference" detail="docs.example.com" />
      </WorkSummary>
    </div>
  )
}
