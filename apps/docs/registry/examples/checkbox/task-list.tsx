"use client"

import * as React from "react"

import { Checkbox } from "@paneui/ui/components/checkbox"
import { Label } from "@paneui/ui/components/label"

const initial = [
  { id: "passport", label: "Renew passport", done: true },
  { id: "insurance", label: "Buy travel insurance", done: false },
  { id: "esim", label: "Set up an eSIM for Japan", done: false },
]

export default function CheckboxTaskList() {
  const [tasks, setTasks] = React.useState(initial)
  const left = tasks.filter((task) => !task.done).length

  return (
    <div className="flex w-full max-w-xs flex-col gap-3">
      <p className="text-xs text-muted-foreground tabular-nums">{left} left before the trip</p>
      {tasks.map((task) => (
        <Label key={task.id} className="gap-3 font-normal">
          <Checkbox
            checked={task.done}
            onCheckedChange={(checked) =>
              setTasks((prev) => prev.map((t) => (t.id === task.id ? { ...t, done: checked } : t)))
            }
          />
          <span className={task.done ? "text-muted-foreground line-through" : undefined}>{task.label}</span>
        </Label>
      ))}
    </div>
  )
}
