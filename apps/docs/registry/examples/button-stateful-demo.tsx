"use client"

import * as React from "react"

import { SendIcon } from "@paneui/ui/icons"
import { StatefulButton, type ButtonState } from "@paneui/ui/components/button-stateful"

function useFakeRequest(outcome: "success" | "error") {
  const [state, setState] = React.useState<ButtonState>("idle")
  const timers = React.useRef<number[]>([])
  React.useEffect(() => () => timers.current.forEach(clearTimeout), [])
  const run = () => {
    if (state !== "idle") return
    setState("loading")
    timers.current.push(
      window.setTimeout(() => setState(outcome), 1400),
      window.setTimeout(() => setState("idle"), 3200)
    )
  }
  return [state, run] as const
}

export default function ButtonStatefulDemo() {
  const [sendState, send] = useFakeRequest("success")
  const [syncState, sync] = useFakeRequest("error")
  return (
    <div className="flex flex-wrap items-center gap-3">
      <StatefulButton
        state={sendState}
        onClick={send}
        loadingText="Sending"
        successText="Invite sent"
        icon={<SendIcon className="rtl:-scale-x-100" />}
      >
        Send invite
      </StatefulButton>
      <StatefulButton
        state={syncState}
        onClick={sync}
        variant="secondary"
        loadingText="Syncing calendar"
        errorText="Couldn't reach Google"
      >
        Sync now
      </StatefulButton>
    </div>
  )
}
