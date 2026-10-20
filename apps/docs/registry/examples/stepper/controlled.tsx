"use client"

import * as React from "react"

import { Stepper } from "@paneui/ui/components/stepper"

const PRICE = 18

export default function StepperControlled() {
  const [tickets, setTickets] = React.useState<number | null>(2)
  const total = (tickets ?? 0) * PRICE

  return (
    <div className="flex w-full max-w-xs items-center justify-between gap-6">
      <div className="flex flex-col gap-1">
        <span className="text-sm font-medium">Tickets</span>
        <span className="text-xs text-muted-foreground tabular-nums">Total ${total}</span>
      </div>
      <Stepper aria-label="Tickets" value={tickets} onValueChange={setTickets} min={1} max={6} />
    </div>
  )
}
