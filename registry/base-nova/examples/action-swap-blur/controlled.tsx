"use client"

import * as React from "react"

import { CheckIcon, LoaderIcon, UploadIcon } from "@/components/icons"
import { ActionSwapBlurButton } from "@/registry/base-nova/ui/action-swap-blur"

export default function ActionSwapBlurControlled() {
  const [status, setStatus] = React.useState("idle")
  const timers = React.useRef<number[]>([])
  React.useEffect(() => () => timers.current.forEach(clearTimeout), [])
  return (
    <ActionSwapBlurButton
      cycle={false}
      value={status}
      disabled={status === "uploading"}
      onClick={() => {
        if (status !== "idle") return
        setStatus("uploading")
        timers.current.push(
          window.setTimeout(() => setStatus("done"), 1500),
          window.setTimeout(() => setStatus("idle"), 3200)
        )
      }}
      items={[
        { value: "idle", label: "Upload photos", icon: <UploadIcon /> },
        { value: "uploading", label: "Uploading", icon: <LoaderIcon className="animate-spin motion-reduce:animate-none" /> },
        { value: "done", label: "12 photos uploaded", icon: <CheckIcon /> },
      ]}
    />
  )
}
