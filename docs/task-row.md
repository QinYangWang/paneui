# Task Row

> Shows the progress of one background task.

Page: https://paneui.dev/docs/task-row/

## Installation

```bash
npx shadcn@latest add @paneui/task-row
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/task-row.json
```

Packages: `motion`.

Registry items it builds on: `@paneui/theme`, `@paneui/icons`.

## Usage

```tsx
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
```
