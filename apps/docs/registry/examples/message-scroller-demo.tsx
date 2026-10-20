"use client"

import * as React from "react"

import { Button } from "@paneui/ui/components/button"
import { Message, MessageBubble, MessageContent } from "@paneui/ui/components/message"
import { MessageScroller } from "@paneui/ui/components/message-scroller"

type Turn = { id: number; from: "user" | "assistant"; text: string }

const REPLY =
  "Here's the plan for Saturday. Leave at 8:30 to beat the bridge traffic and you'll reach the trailhead by 9:45. " +
  "The loop is 11 km with about 600 m of climbing, so budget four hours with a lunch stop at the ridge. " +
  "Rain is unlikely before 3 pm, but pack a shell — the forecast drops to 9°C at the summit. " +
  "Parking fills by 10 on weekends, so the overflow lot on Miller Road is your backup. " +
  "I've added the drive to your calendar and shared the route with Sam."

const SEED: Turn[] = [
  { id: 1, from: "user", text: "Can you plan a hike for this weekend?" },
  { id: 2, from: "assistant", text: "Sure — any distance in mind, and who's coming?" },
  { id: 3, from: "user", text: "Around 10 km, just me and Sam." },
  { id: 4, from: "assistant", text: "Got it. Saturday looks dry; I'll pull a couple of loops near the coast." },
  { id: 5, from: "user", text: "Saturday works. What's the plan?" },
]

export default function MessageScrollerDemo() {
  const [turns, setTurns] = React.useState<Turn[]>(SEED)
  const [streaming, setStreaming] = React.useState(false)
  const timer = React.useRef<number | undefined>(undefined)

  React.useEffect(() => () => window.clearInterval(timer.current), [])

  const stream = () => {
    if (streaming) return
    const id = Date.now()
    const words = REPLY.split(" ")
    let i = 0
    setStreaming(true)
    setTurns((t) => [...t, { id, from: "assistant", text: "" }])
    timer.current = window.setInterval(() => {
      i += 1
      setTurns((t) => t.map((m) => (m.id === id ? { ...m, text: words.slice(0, i).join(" ") } : m)))
      if (i >= words.length) {
        window.clearInterval(timer.current)
        setStreaming(false)
      }
    }, 70)
  }

  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <MessageScroller className="h-80 rounded-2xl bg-card shadow-surface" contentClassName="gap-3">
        {turns.map((m) => (
          <Message key={m.id} from={m.from} animateIn={m.id > 5}>
            <MessageContent>
              <MessageBubble tone={m.from === "user" ? "primary" : "default"}>{m.text || "…"}</MessageBubble>
            </MessageContent>
          </Message>
        ))}
      </MessageScroller>
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs text-muted-foreground">Scroll up mid-stream to release, then jump back.</p>
        <Button size="sm" onClick={stream} disabled={streaming}>
          {streaming ? "Streaming…" : "Stream a reply"}
        </Button>
      </div>
    </div>
  )
}
