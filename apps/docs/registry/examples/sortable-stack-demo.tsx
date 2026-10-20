"use client"

import {
  SortableStack,
  SortableStackContent,
  SortableStackHandle,
  SortableStackItem,
} from "@paneui/ui/components/sortable-stack"

const priorities = [
  { id: "launch", title: "Ship pricing page", meta: "Due Fri" },
  { id: "bugs", title: "Triage checkout bugs", meta: "4 open" },
  { id: "hiring", title: "Review design candidates", meta: "3 portfolios" },
  { id: "docs", title: "Update API docs", meta: "v2.3" },
  { id: "retro", title: "Write sprint retro", meta: "15 min" },
]

export default function SortableStackDemo() {
  return (
    <SortableStack
      label="This week's priorities"
      defaultItems={priorities}
      getItemLabel={(item) => item.title}
      className="max-w-sm"
    >
      {(items) =>
        items.map((item, index) => (
          <SortableStackItem key={item.id} id={item.id}>
            <SortableStackHandle />
            <SortableStackContent>
              <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-semibold text-muted-foreground tabular-nums shadow-well">
                {index + 1}
              </span>
              <span className="truncate font-medium">{item.title}</span>
              <span className="ml-auto shrink-0 text-xs text-muted-foreground">{item.meta}</span>
            </SortableStackContent>
          </SortableStackItem>
        ))
      }
    </SortableStack>
  )
}
