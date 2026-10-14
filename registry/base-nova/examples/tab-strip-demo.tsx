"use client"

import * as React from "react"

import { ApertureIcon, AsteriskIcon, PlusIcon } from "@/components/icons"
import { Button } from "@/registry/base-nova/ui/button"
import { TabStrip, TabStripItem } from "@/registry/base-nova/ui/tab-strip"

const INITIAL = [
  { id: "a", title: "Fix broken chat dragging", provider: "codex" },
  { id: "b", title: "Redesign split chats", provider: "codex" },
  { id: "c", title: "Hide empty threads", provider: "claude" },
]

export default function TabStripDemo() {
  const [tabs, setTabs] = React.useState(INITIAL)
  const [active, setActive] = React.useState("a")
  const close = (id: string) => {
    const rest = tabs.filter((t) => t.id !== id)
    setTabs(rest)
    if (active === id && rest[0]) setActive(rest[0].id)
  }
  return (
    <div className="w-full max-w-xl rounded-2xl bg-shell p-1.5">
      <TabStrip
        value={active}
        onValueChange={setActive}
        order={tabs.map((t) => t.id)}
        onReorder={(order) => setTabs(order.map((id) => tabs.find((t) => t.id === id)!))}
        onClose={close}
        aria-label="Open threads"
        actions={
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="New tab"
            onClick={() => {
              const id = `t${Date.now()}`
              setTabs([...tabs, { id, title: "New thread", provider: "claude" }])
              setActive(id)
            }}
          >
            <PlusIcon />
          </Button>
        }
      >
        {tabs.map((t) => (
          <TabStripItem key={t.id} value={t.id} icon={t.provider === "codex" ? <ApertureIcon /> : <AsteriskIcon />} className="w-40">
            {t.title}
          </TabStripItem>
        ))}
      </TabStrip>
    </div>
  )
}
