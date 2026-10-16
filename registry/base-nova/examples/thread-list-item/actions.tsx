"use client"

import * as React from "react"

import { ChatIcon, FolderIcon, MoreHorizontalIcon } from "@/components/icons"
import { Button } from "@/registry/base-nova/ui/button"
import { Menu, MenuContent, MenuItem, MenuTrigger } from "@/registry/base-nova/ui/menu"
import { ThreadList, ThreadListGroup, ThreadListItem } from "@/registry/base-nova/ui/thread-list-item"

const THREADS = [
  { id: "1", title: "Direct messages", description: "Every platform's private chats", meta: "2m", icon: <ChatIcon /> },
  { id: "2", title: "Launch plan", description: "Ship the beta to the first hundred users", meta: "3h", icon: <FolderIcon /> },
  { id: "3", title: "Weekly review", description: "Notes from Friday", meta: "Mon", icon: <FolderIcon /> },
]

export default function ThreadListItemActions() {
  const [active, setActive] = React.useState("1")
  return (
    <div className="w-72 frame-3xl frame-p-2 bg-shell">
      <ThreadList>
        <ThreadListGroup label="Chats">
          {THREADS.map((t) => (
            <ThreadListItem
              key={t.id}
              title={t.title}
              description={t.description}
              meta={t.meta}
              icon={t.icon}
              active={active === t.id}
              onClick={() => setActive(t.id)}
              actions={
                <Menu>
                  <MenuTrigger render={<Button variant="ghost" size="icon-xs" aria-label={`More for ${t.title}`} />}>
                    <MoreHorizontalIcon />
                  </MenuTrigger>
                  <MenuContent align="end">
                    <MenuItem>Rename</MenuItem>
                    <MenuItem>Pin</MenuItem>
                    <MenuItem variant="destructive">Delete</MenuItem>
                  </MenuContent>
                </Menu>
              }
            />
          ))}
        </ThreadListGroup>
      </ThreadList>
    </div>
  )
}
