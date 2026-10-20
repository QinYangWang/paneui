"use client"

import * as React from "react"

import { Button } from "@paneui/ui/components/button"
import { TodoList, type TodoItem } from "@paneui/ui/components/todo-list"

const STEPS = ["Check passport expiry", "Book airport transfer", "Download boarding passes"]

export default function TodoListCollapseOnComplete() {
  const [done, setDone] = React.useState(1)
  const [open, setOpen] = React.useState(true)
  const items: TodoItem[] = STEPS.map((title, i) => ({
    id: String(i),
    title,
    status: i < done ? "done" : i === done ? "in-progress" : "pending",
  }))
  const complete = done >= STEPS.length

  return (
    <div className="flex w-full max-w-sm flex-col items-start gap-3">
      <TodoList items={items} title="Before you fly" collapseOnComplete open={open} onOpenChange={setOpen} />
      <Button
        size="sm"
        variant="secondary"
        onClick={() => {
          if (complete) {
            setDone(0)
            setOpen(true)
          } else setDone((d) => d + 1)
        }}
      >
        {complete ? "Restart" : "Complete step"}
      </Button>
    </div>
  )
}
