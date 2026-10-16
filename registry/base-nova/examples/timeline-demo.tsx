"use client"

import { TrashIcon } from "@/components/icons"
import { Button } from "@/registry/base-nova/ui/button"
import { Timeline, TimelineDescription, TimelineItem, TimelineTitle } from "@/registry/base-nova/ui/timeline"

const TASKS = [
  { time: "08:00", title: "Morning brief", description: "Weather, calendar and headlines" },
  { time: "12:30", title: "Inbox digest", description: "Unread mail since the morning", tone: "primary" as const },
  { time: "18:00", title: "Price check", description: "Flights to Tokyo under ¥3,000" },
  { time: "22:00", title: "Daily log", description: "What got done today" },
]

export default function TimelineDemo() {
  return (
    <Timeline className="w-full max-w-md">
      {TASKS.map((t) => (
        <TimelineItem
          key={t.time}
          time={t.time}
          tone={t.tone}
          action={
            <Button variant="ghost" size="icon-xs" aria-label={`Delete ${t.title}`}>
              <TrashIcon />
            </Button>
          }
        >
          <TimelineTitle>{t.title}</TimelineTitle>
          <TimelineDescription>{t.description}</TimelineDescription>
        </TimelineItem>
      ))}
    </Timeline>
  )
}
