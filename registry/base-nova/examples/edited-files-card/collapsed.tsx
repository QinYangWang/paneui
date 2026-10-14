import { EditedFilesCard } from "@/registry/base-nova/ui/edited-files-card"

export default function EditedFilesCardCollapsed() {
  return (
    <div className="w-full max-w-lg">
      <EditedFilesCard
        defaultOpen={false}
        onReview={() => undefined}
        files={[
          { path: "app/page.tsx", additions: 42, deletions: 7 },
          { path: "app/layout.tsx", additions: 3, deletions: 1 },
        ]}
      />
    </div>
  )
}
