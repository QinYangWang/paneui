"use client"

import * as React from "react"

import { LockIcon } from "@/components/icons"
import { SlideActionButton } from "@/registry/base-nova/ui/slide-action-button"

export default function SlideActionButtonStayComplete() {
  const [armed, setArmed] = React.useState(false)
  return (
    <div className="flex flex-col items-center gap-3">
      <SlideActionButton
        resetDelay={null}
        thumbIcon={<LockIcon />}
        completeLabel="Alarm armed"
        aria-label="Slide to arm the alarm"
        onComplete={() => setArmed(true)}
      >
        Slide to arm
      </SlideActionButton>
      <p className="text-sm text-muted-foreground">{armed ? "Home is armed. Sensors are watching." : "Alarm is off."}</p>
    </div>
  )
}
