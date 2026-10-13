"use client"

import * as React from "react"

import { ChartIcon, ChatIcon, ListIcon } from "@/components/icons"
import { ApprovalCard } from "@/registry/base-nova/blocks/approval-card/approval-card"
import { ChatBubble, ChatThread, ChatTyping } from "@/registry/base-nova/blocks/chat/chat"
import { PromptBar } from "@/registry/base-nova/blocks/prompt-bar/prompt-bar"
import { TaskList, TaskRow, type TaskStatus } from "@/registry/base-nova/blocks/task-row/task-row"
import { Button } from "@/registry/base-nova/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/registry/base-nova/ui/dialog"
import { Label } from "@/registry/base-nova/ui/label"
import { Switch } from "@/registry/base-nova/ui/switch"
import { Tabs, TabsList, TabsPanel, TabsTab } from "@/registry/base-nova/ui/tabs"

export function ChatDemo() {
  const [messages, setMessages] = React.useState<{ from: "user" | "assistant"; text: string }[]>([
    { from: "user", text: "How many waffle cones do we have left?" },
    { from: "assistant", text: "About 140, roughly four days at this week's pace. Want me to reorder?" },
  ])
  const [busy, setBusy] = React.useState(false)

  return (
    <div className="flex w-full max-w-xl flex-col gap-4">
      <ChatThread>
        {messages.map((m, i) => (
          <ChatBubble key={i} from={m.from}>
            {m.text}
          </ChatBubble>
        ))}
        {busy && <ChatTyping />}
      </ChatThread>
      <PromptBar
        busy={busy}
        onStop={() => setBusy(false)}
        onSubmit={(text) => {
          setMessages((m) => [...m, { from: "user", text }])
          setBusy(true)
          setTimeout(() => {
            setBusy(false)
            setMessages((m) => [...m, { from: "assistant", text: "On it." }])
          }, 1400)
        }}
      />
    </div>
  )
}

export function TaskDemo() {
  const [tasks, setTasks] = React.useState<{ title: string; detail: string; status: TaskStatus }[]>([
    { title: "Pull last week's sales", detail: "Square · 3 locations", status: "done" },
    { title: "Forecast cone usage", detail: "Based on 8 weeks", status: "running" },
    { title: "Draft restock order", detail: "Cone King", status: "queued" },
    { title: "Sync to accounting", detail: "Token expired", status: "failed" },
  ])
  const next: Record<TaskStatus, TaskStatus> = { queued: "running", running: "done", done: "queued", failed: "running" }
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

export function ControlsDemo() {
  return (
    <div className="flex flex-wrap items-start gap-10">
      <Tabs defaultValue="chat">
        <TabsList>
          <TabsTab value="chat">
            <ChatIcon />
            Chat
          </TabsTab>
          <TabsTab value="tasks">
            <ListIcon />
            Tasks
          </TabsTab>
          <TabsTab value="stats">
            <ChartIcon />
            Stats
          </TabsTab>
        </TabsList>
        <TabsPanel value="chat" className="text-sm text-muted-foreground">Conversations with your agent.</TabsPanel>
        <TabsPanel value="tasks" className="text-sm text-muted-foreground">Everything running in the background.</TabsPanel>
        <TabsPanel value="stats" className="text-sm text-muted-foreground">Usage this week.</TabsPanel>
      </Tabs>

      <div className="flex flex-col gap-3">
        <Label className="gap-3">
          <Switch defaultChecked />
          Auto-approve under $50
        </Label>
        <Label className="gap-3">
          <Switch />
          Daily digest
        </Label>
      </div>

      <Dialog>
        <DialogTrigger render={<Button variant="secondary" />}>Open dialog</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Pause all automations?</DialogTitle>
            <DialogDescription>Running tasks finish, and nothing new starts until you resume.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose render={<Button variant="secondary" />}>Cancel</DialogClose>
            <DialogClose render={<Button />}>Pause</DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export { ApprovalCard }
