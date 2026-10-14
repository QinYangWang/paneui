"use client"

import * as React from "react"

import { CheckCircleIcon } from "@/components/icons"
import { Button } from "@/registry/base-nova/ui/button"
import { TextScramble } from "@/registry/base-nova/ui/text-scramble"

export default function TextScrambleOnComplete() {
  const [decoded, setDecoded] = React.useState(false)
  const [value, setValue] = React.useState("••••••••••••")
  return (
    <div className="flex flex-col items-start gap-4">
      <div className="flex items-center gap-2 rounded-lg bg-muted px-3 py-2 font-mono text-sm shadow-well">
        <TextScramble value={value} onComplete={() => setDecoded(value !== "••••••••••••")} />
        {decoded && <CheckCircleIcon className="size-4 text-success" />}
      </div>
      <Button
        size="sm"
        variant="secondary"
        onClick={() => {
          setDecoded(false)
          setValue("sk-live-4f9a")
        }}
      >
        Reveal key
      </Button>
    </div>
  )
}
