"use client"

import { ArrowUpIcon } from "@/components/icons"
import { Button } from "@/registry/base-nova/ui/button"
import {
  SortableStack,
  SortableStackContent,
  SortableStackHandle,
  SortableStackItem,
  useSortableStack,
} from "@/registry/base-nova/ui/sortable-stack"

const tracks = [
  { id: "t1", title: "Midnight Drive", artist: "Neon Coast" },
  { id: "t2", title: "Paper Planes", artist: "Lumen" },
  { id: "t3", title: "Slow Tide", artist: "Harbor Lights" },
  { id: "t4", title: "Afterglow", artist: "Vela" },
]

function MoveToTop({ id, label }: { id: string; label: string }) {
  const { ids, moveItem } = useSortableStack()
  return (
    <Button
      variant="ghost"
      size="icon-sm"
      aria-label={`Play ${label} next`}
      disabled={ids[0] === id}
      onClick={() => moveItem(id, "first")}
    >
      <ArrowUpIcon />
    </Button>
  )
}

export default function SortableStackMoveToTop() {
  return (
    <SortableStack label="Up next" defaultItems={tracks} getItemLabel={(t) => t.title} className="max-w-sm">
      {(items) =>
        items.map((t) => (
          <SortableStackItem key={t.id} id={t.id}>
            <SortableStackHandle />
            <SortableStackContent>
              <span className="flex min-w-0 flex-col">
                <span className="truncate font-medium">{t.title}</span>
                <span className="truncate text-xs text-muted-foreground">{t.artist}</span>
              </span>
            </SortableStackContent>
            <MoveToTop id={t.id} label={t.title} />
          </SortableStackItem>
        ))
      }
    </SortableStack>
  )
}
