"use client"

import * as React from "react"

import { SlideActionButton } from "@/registry/base-nova/ui/slide-action-button"

export default function SlideActionButtonAsync() {
  const attempts = React.useRef(0)
  const [note, setNote] = React.useState("The first attempt fails on purpose.")
  return (
    <div className="flex flex-col items-center gap-3">
      <SlideActionButton
        pendingLabel="Contacting bank"
        completeLabel="Transfer sent"
        onComplete={() =>
          new Promise<void>((resolve, reject) => {
            const fail = attempts.current++ % 2 === 0
            setTimeout(() => {
              setNote(fail ? "Bank declined. The thumb sprang back; try again." : "Sent. Resets in 2 seconds.")
              if (fail) reject(new Error("declined"))
              else resolve()
            }, 1200)
          })
        }
      >
        Slide to send $250
      </SlideActionButton>
      <p className="text-sm text-muted-foreground">{note}</p>
    </div>
  )
}
