import { WorkSummary, WorkSummaryStep } from "@/registry/base-nova/ui/work-summary"

export default function WorkSummaryDemo() {
  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <WorkSummary duration={25} defaultOpen>
        <WorkSummaryStep kind="read" title="Read SidebarThreadRow.tsx" />
        <WorkSummaryStep kind="search" title="Search" detail="setDragImage · 2 matches" />
        <WorkSummaryStep kind="edit" title="Edit SplitPaneLayout.tsx" detail="+190" />
        <WorkSummaryStep kind="execute" title="Run tests" detail="bun run test src/components/chat" />
      </WorkSummary>
      <p className="text-ui-lg text-pretty">The sidebar uses native drag events, while horizontal tabs use a separate reorder handler.</p>
    </div>
  )
}
