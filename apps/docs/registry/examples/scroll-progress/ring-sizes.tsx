"use client"

import { useMotionValue } from "motion/react"

import { ScrollProgress } from "@paneui/ui/components/scroll-progress"

export default function ScrollProgressRingSizes() {
  const progress = useMotionValue(0.62)
  return (
    <div className="flex items-center gap-4">
      <ScrollProgress variant="ring" progress={progress} size={32} thickness={2} label="Small ring" />
      <ScrollProgress variant="ring" progress={progress} size={44} showValue label="Default ring" />
      <ScrollProgress variant="ring" progress={progress} size={64} thickness={5} showValue label="Large ring" />
    </div>
  )
}
