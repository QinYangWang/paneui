"use client"

import * as React from "react"

import { AgentCodeBlock } from "@/registry/base-nova/ui/agent-code-block"
import { Button } from "@/registry/base-nova/ui/button"

const CODE = `import { createClient } from "@/lib/supabase"

export async function getUpcomingTrips(userId: string) {
  const db = createClient()
  const { data, error } = await db
    .from("trips")
    .select("id, city, starts_at")
    .eq("user_id", userId)
    .gte("starts_at", new Date().toISOString())
    .order("starts_at")

  if (error) throw error
  return data
}
`

export default function AgentCodeBlockDemo() {
  const [code, setCode] = React.useState(CODE)
  const [streaming, setStreaming] = React.useState(false)
  const timer = React.useRef<number | undefined>(undefined)

  React.useEffect(() => () => window.clearInterval(timer.current), [])

  const replay = () => {
    window.clearInterval(timer.current)
    let i = 0
    setCode("")
    setStreaming(true)
    timer.current = window.setInterval(() => {
      i = Math.min(CODE.length, i + 3 + Math.floor(Math.random() * 6))
      setCode(CODE.slice(0, i))
      if (i >= CODE.length) {
        window.clearInterval(timer.current)
        setStreaming(false)
      }
    }, 30)
  }

  return (
    <div className="flex w-full max-w-xl flex-col gap-3">
      <AgentCodeBlock
        filename="lib/trips.ts"
        code={code}
        streaming={streaming}
        highlightLines={[[5, 10]]}
        maxHeight={300}
      />
      <Button size="sm" variant="secondary" className="self-end" onClick={replay} disabled={streaming}>
        {streaming ? "Writing…" : "Replay stream"}
      </Button>
    </div>
  )
}
