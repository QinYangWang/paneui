"use client"

import * as React from "react"

import { Button } from "@/registry/base-nova/ui/button"
import { TodoList, type TodoItem, type TodoStatus } from "@/registry/base-nova/ui/todo-list"

const STEPS = [
  { id: "1", title: "Find free weekends in November", meta: "3 found" },
  { id: "2", title: "Compare flights TPE → KIX", meta: "14 fares" },
  { id: "3", title: "Check ryokan availability near Gion", meta: "Sold out" },
  { id: "4", title: "Draft a two-day itinerary", meta: "0.8s" },
]

function statusAt(i: number, tick: number): TodoStatus {
  if (tick > i) return i === 2 ? "failed" : "done"
  if (tick === i) return "in-progress"
  return "pending"
}

export default function TodoListDemo() {
  const [tick, setTick] = React.useState(0)

  React.useEffect(() => {
    if (tick > STEPS.length) return
    const id = window.setTimeout(() => setTick((t) => t + 1), 1300)
    return () => window.clearTimeout(id)
  }, [tick])

  const items: TodoItem[] = STEPS.map((s, i) => {
    const status = statusAt(i, tick)
    return { ...s, status, meta: status === "done" || status === "failed" ? s.meta : undefined }
  })

  return (
    <div className="flex w-full max-w-sm flex-col items-start gap-3">
      <TodoList items={items} title="Kyoto weekend plan" />
      <Button variant="ghost" size="sm" onClick={() => setTick(0)}>
        Replay
      </Button>
    </div>
  )
}
