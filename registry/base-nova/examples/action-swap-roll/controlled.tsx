"use client"

import * as React from "react"

import { CheckIcon, LoaderIcon, SendIcon } from "@/components/icons"
import { ActionSwapRollButton } from "@/registry/base-nova/ui/action-swap-roll"

export default function ActionSwapRollControlled() {
  const [status, setStatus] = React.useState("draft")
  const timers = React.useRef<number[]>([])
  React.useEffect(() => () => timers.current.forEach(clearTimeout), [])
  return (
    <ActionSwapRollButton
      cycle={false}
      value={status}
      disabled={status === "sending"}
      onClick={() => {
        if (status !== "draft") return
        setStatus("sending")
        timers.current.push(
          window.setTimeout(() => setStatus("sent"), 1400),
          window.setTimeout(() => setStatus("draft"), 3000)
        )
      }}
      items={[
        { value: "draft", label: "Send reply", icon: <SendIcon className="rtl:-scale-x-100" /> },
        { value: "sending", label: "Sending", icon: <LoaderIcon className="animate-spin motion-reduce:animate-none" /> },
        { value: "sent", label: "Reply sent", icon: <CheckIcon /> },
      ]}
    />
  )
}
