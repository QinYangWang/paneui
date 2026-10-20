"use client"

import * as React from "react"

import {
  SortableStack,
  SortableStackContent,
  SortableStackHandle,
  SortableStackItem,
} from "@paneui/ui/components/sortable-stack"

const initial = [
  { id: "email", label: "Email" },
  { id: "push", label: "Push notification" },
  { id: "sms", label: "SMS" },
  { id: "slack", label: "Slack" },
]

export default function SortableStackControlled() {
  const [channels, setChannels] = React.useState(initial)

  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <SortableStack
        label="Notification fallback order"
        items={channels}
        onItemsChange={setChannels}
        getItemLabel={(c) => c.label}
      >
        {(items) =>
          items.map((c) => (
            <SortableStackItem key={c.id} id={c.id}>
              <SortableStackHandle />
              <SortableStackContent>
                <span className="font-medium">{c.label}</span>
              </SortableStackContent>
            </SortableStackItem>
          ))
        }
      </SortableStack>
      <p className="text-xs text-pretty text-muted-foreground">Tries {channels.map((c) => c.label).join(" → ")}</p>
    </div>
  )
}
