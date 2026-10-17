"use client"

import * as React from "react"

import { EyeIcon, EyeOffIcon, MinusIcon, PlusIcon } from "@/components/icons"
import { ActionSwapBlurIcon } from "@/registry/base-nova/ui/action-swap-blur"
import { Button } from "@/registry/base-nova/ui/button"
import { DigitSwap } from "@/registry/base-nova/ui/digit-swap"

export default function DigitSwapDemo() {
  const [seats, setSeats] = React.useState(12)
  const [shown, setShown] = React.useState(false)
  const price = (seats * 8).toLocaleString("en-US")

  return (
    <div className="flex flex-col items-start gap-5">
      <div className="flex items-center gap-3">
        <Button variant="secondary" size="icon-sm" aria-label="Remove seat" onClick={() => setSeats((n) => Math.max(1, n - 1))}>
          <MinusIcon />
        </Button>
        <div className="text-center">
          <DigitSwap value={`$${price}/mo`} suffixLength={3} staggerFrom="end" className="text-3xl font-semibold tracking-tight" suffixClassName="text-base font-medium text-muted-foreground" />
          <p className="text-xs text-muted-foreground">
            <DigitSwap value={seats} /> seats
          </p>
        </div>
        <Button variant="secondary" size="icon-sm" aria-label="Add seat" onClick={() => setSeats((n) => n + 1)}>
          <PlusIcon />
        </Button>
      </div>
      <div className="flex items-center gap-2 rounded-2xl bg-muted py-1.5 pr-1.5 pl-4 font-mono text-sm shadow-well">
        <DigitSwap value={shown ? "4111 2045 7731 4242" : "•••• •••• •••• 4242"} stagger={0.015} />
        <Button variant="ghost" size="icon-sm" aria-label={shown ? "Hide card number" : "Show card number"} onClick={() => setShown((s) => !s)}>
          <ActionSwapBlurIcon value={shown ? "hide" : "show"}>
            {shown ? <EyeOffIcon /> : <EyeIcon />}
          </ActionSwapBlurIcon>
        </Button>
      </div>
    </div>
  )
}
