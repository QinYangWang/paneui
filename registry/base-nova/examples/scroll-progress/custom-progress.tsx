"use client"

import * as React from "react"
import { animate, useMotionValue } from "motion/react"

import { Button } from "@/registry/base-nova/ui/button"
import { ScrollProgress } from "@/registry/base-nova/ui/scroll-progress"

export default function ScrollProgressCustomProgress() {
  const progress = useMotionValue(0)
  const [uploading, setUploading] = React.useState(false)

  const upload = () => {
    setUploading(true)
    progress.set(0)
    animate(progress, 1, { duration: 2.4, ease: "linear" }).then(() => setUploading(false))
  }

  return (
    <div className="flex w-full max-w-sm flex-col gap-3 rounded-xl bg-card p-4 shadow-raised">
      <div className="flex items-center gap-3">
        <ScrollProgress variant="ring" progress={progress} showValue label="Upload progress" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-foreground">offsite-photos.zip</p>
          <p className="text-xs text-muted-foreground">48 MB</p>
        </div>
        <Button size="sm" variant="secondary" onClick={upload} disabled={uploading}>
          {uploading ? "Uploading…" : "Upload"}
        </Button>
      </div>
      <div className="relative h-1 overflow-hidden rounded-full">
        <ScrollProgress position="absolute" progress={progress} thickness={4} label="Upload progress bar" />
      </div>
    </div>
  )
}
