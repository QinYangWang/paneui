"use client"

import * as React from "react"

import { TaskList, TaskRow, type TaskStatus } from "@/registry/base-nova/blocks/task-row/task-row"

const next: Record<TaskStatus, TaskStatus> = { queued: "running", running: "done", done: "queued", failed: "running" }

export default function TaskRowDemo() {
  const [tasks, setTasks] = React.useState<{ title: string; detail: string; status: TaskStatus }[]>([
    { title: "Pull last week's sales", detail: "Square · 3 locations", status: "done" },
    { title: "Forecast cone usage", detail: "Based on 8 weeks", status: "running" },
    { title: "Draft restock order", detail: "Cone King", status: "queued" },
    { title: "Sync to accounting", detail: "Token expired", status: "failed" },
  ])
  return (
    <TaskList className="w-full max-w-xl">
      {tasks.map((t, i) => (
        <TaskRow
          key={t.title}
          {...t}
          onClick={() => setTasks((all) => all.map((x, j) => (j === i ? { ...x, status: next[x.status] } : x)))}
        />
      ))}
    </TaskList>
  )
}
