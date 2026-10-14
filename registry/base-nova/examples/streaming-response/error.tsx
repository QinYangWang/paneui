"use client"

import * as React from "react"

import { StreamingResponse, type StreamingResponseStatus } from "@/registry/base-nova/ui/streaming-response"

const FULL = "Your three biggest expenses this month were rent (¥120,000), groceries (¥42,300) and the flight to Sapporo (¥28,900)."

export default function StreamingResponseError() {
  const [status, setStatus] = React.useState<StreamingResponseStatus>("error")
  const timer = React.useRef<number | undefined>(undefined)
  React.useEffect(() => () => window.clearTimeout(timer.current), [])

  const retry = () => {
    setStatus("streaming")
    timer.current = window.setTimeout(() => setStatus("complete"), 1200)
  }

  return (
    <StreamingResponse
      text={status === "error" ? "Your three biggest expenses this month were rent" : status === "streaming" ? "Your three biggest" : FULL}
      status={status}
      errorMessage="Lost connection to your bank. Nothing was changed."
      onRetry={retry}
      className="max-w-lg"
    />
  )
}
