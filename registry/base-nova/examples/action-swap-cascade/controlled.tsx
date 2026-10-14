"use client"

import * as React from "react"

import { CheckIcon, LoaderIcon, UploadIcon } from "@/components/icons"
import { ActionSwapCascadeButton } from "@/registry/base-nova/ui/action-swap-cascade"

export default function ActionSwapCascadeControlled() {
  const [state, setState] = React.useState("idle")

  function publish() {
    if (state !== "idle") return
    setState("publishing")
    window.setTimeout(() => setState("published"), 1400)
    window.setTimeout(() => setState("idle"), 3200)
  }

  return (
    <ActionSwapCascadeButton
      cycle={false}
      value={state}
      onClick={publish}
      items={[
        { value: "idle", label: "Publish", icon: <UploadIcon /> },
        { value: "publishing", label: "Publishing", icon: <LoaderIcon className="motion-safe:animate-spin" /> },
        { value: "published", label: "Published", icon: <CheckIcon /> },
      ]}
    />
  )
}
