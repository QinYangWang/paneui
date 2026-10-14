"use client"

import * as React from "react"

import { ApertureIcon, AsteriskIcon } from "@/components/icons"
import { ThreadList, ThreadListGroup, ThreadListItem } from "@/registry/base-nova/ui/thread-list-item"

export default function ThreadListItemDemo() {
  const [active, setActive] = React.useState("1")
  return (
    <div className="w-72 rounded-2xl bg-shell p-2">
      <ThreadList>
        <ThreadListGroup label="Recent">
          <ThreadListItem title="Fix broken chat dragging behavior" icon={<ApertureIcon />} repo="synara" pr={{ number: 1526, status: "open" }} branch="synara/fix-chat-dragging" active={active === "1"} onClick={() => setActive("1")} />
          <ThreadListItem title="Redesign split chats with close button" icon={<ApertureIcon />} repo="synara" pr={{ number: 1525, status: "draft" }} branch="synara/simplify-split-chats" running active={active === "2"} onClick={() => setActive("2")} />
        </ThreadListGroup>
        <ThreadListGroup label="Yesterday">
          <ThreadListItem title="Configurable expiry with 24h option" icon={<ApertureIcon />} repo="synara" pr={{ number: 1507, status: "merged" }} branch="main" active={active === "3"} onClick={() => setActive("3")} />
          <ThreadListItem title="Check if screenshot behavior is normal" icon={<AsteriskIcon />} repo="synara" branch="main" unread active={active === "4"} onClick={() => setActive("4")} />
        </ThreadListGroup>
      </ThreadList>
    </div>
  )
}
