"use client"

import { UndoIcon } from "@paneui/ui/icons"
import { Button } from "@paneui/ui/components/button"
import {
  SortableStack,
  SortableStackContent,
  SortableStackHandle,
  SortableStackItem,
  useSortableStack,
} from "@paneui/ui/components/sortable-stack"

const steps = [
  { id: "lint", label: "Lint" },
  { id: "test", label: "Unit tests" },
  { id: "build", label: "Build" },
  { id: "deploy", label: "Deploy preview" },
]

function Footer() {
  const { canUndo, undo, ids } = useSortableStack()
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-xs text-muted-foreground tabular-nums">{ids.length} steps</span>
      <Button variant="ghost" size="sm" disabled={!canUndo} onClick={undo}>
        <UndoIcon className="rtl:-scale-x-100" data-icon="inline-start" />
        Revert order
      </Button>
    </div>
  )
}

export default function SortableStackCustomUndo() {
  return (
    <SortableStack
      label="Pipeline steps"
      defaultItems={steps}
      getItemLabel={(s) => s.label}
      showUndo={false}
      footer={<Footer />}
      className="max-w-sm"
    >
      {(items) =>
        items.map((s, i) => (
          <SortableStackItem key={s.id} id={s.id}>
            <SortableStackHandle />
            <SortableStackContent>
              <span className="font-mono text-xs text-muted-foreground tabular-nums">{String(i + 1).padStart(2, "0")}</span>
              <span className="font-medium">{s.label}</span>
            </SortableStackContent>
          </SortableStackItem>
        ))
      }
    </SortableStack>
  )
}
