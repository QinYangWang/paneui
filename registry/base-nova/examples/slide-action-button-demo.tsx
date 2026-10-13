"use client"

import { SlideActionButton } from "@/registry/base-nova/ui/slide-action-button"

export default function SlideActionButtonDemo() {
  return (
    <div className="flex flex-col items-center gap-3">
      <SlideActionButton
        completeLabel="Paid $48.20"
        pendingLabel="Charging card"
        onComplete={() => new Promise((resolve) => setTimeout(resolve, 1200))}
      >
        Slide to pay $48.20
      </SlideActionButton>
      <SlideActionButton completeLabel="Door unlocked" className="w-64">
        Slide to unlock
      </SlideActionButton>
    </div>
  )
}
