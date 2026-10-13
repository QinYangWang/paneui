"use client"

import * as React from "react"

import { PullToRefresh } from "@/registry/base-nova/ui/pull-to-refresh"

const SENDERS = ["Mina Park", "Leo Chen", "Ava Ruiz", "Sam Okafor", "Noor Haddad", "Kai Tanaka"]
const SUBJECTS = [
  "Design review moved to 3pm",
  "Invoice #2041 is ready",
  "Re: Launch checklist",
  "Your build passed",
  "Lunch on Friday?",
  "Q4 roadmap draft",
]

type Mail = { id: number; from: string; subject: string; time: string }

function seed(): Mail[] {
  return Array.from({ length: 8 }, (_, i) => ({
    id: i,
    from: SENDERS[i % SENDERS.length],
    subject: SUBJECTS[(i * 2) % SUBJECTS.length],
    time: `${9 + (i % 8)}:${i % 2 ? "15" : "40"}`,
  }))
}

export default function PullToRefreshDemo() {
  const [mail, setMail] = React.useState<Mail[]>(seed)

  const refresh = async () => {
    await new Promise((r) => setTimeout(r, 1400))
    setMail((list) => {
      const id = list.length ? Math.max(...list.map((m) => m.id)) + 1 : 0
      return [
        { id, from: SENDERS[id % SENDERS.length], subject: SUBJECTS[id % SUBJECTS.length], time: "now" },
        ...list,
      ]
    })
  }

  return (
    <PullToRefresh
      onRefresh={refresh}
      className="h-80 w-full max-w-sm rounded-2xl bg-card shadow-surface"
    >
      <ul className="divide-y divide-border">
        {mail.map((m) => (
          <li key={m.id} className="flex items-start justify-between gap-3 px-4 py-3">
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-foreground">{m.from}</p>
              <p className="truncate text-sm text-muted-foreground">{m.subject}</p>
            </div>
            <span className="shrink-0 text-xs text-muted-foreground tabular-nums">{m.time}</span>
          </li>
        ))}
      </ul>
    </PullToRefresh>
  )
}
