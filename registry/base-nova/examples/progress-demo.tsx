"use client"

import * as React from "react"

import { Progress, ProgressLabel, ProgressValue } from "@/registry/base-nova/ui/progress"

export default function ProgressDemo() {
  const [value, setValue] = React.useState(18)
  React.useEffect(() => {
    const id = setInterval(() => setValue((v) => (v >= 100 ? 8 : Math.min(100, v + 9))), 900)
    return () => clearInterval(id)
  }, [])
  return (
    <div className="flex w-full max-w-xs flex-col gap-6">
      <Progress value={value}>
        <ProgressLabel>Uploading 24 files</ProgressLabel>
        <ProgressValue />
      </Progress>
      <Progress value={null} size="sm" aria-label="Syncing" />
    </div>
  )
}
