"use client"

import * as React from "react"

import { Button } from "@/registry/base-nova/ui/button"
import { TextScramble } from "@/registry/base-nova/ui/text-scramble"

const WORDS = ["Tokyo", "Lisbon", "Reykjavík"]

export default function TextScrambleDuration() {
  const [i, setI] = React.useState(0)
  return (
    <div className="flex flex-col items-start gap-4">
      <div className="flex flex-col gap-2 text-sm">
        <div className="flex gap-3">
          <span className="w-24 text-muted-foreground">300ms</span>
          <TextScramble value={WORDS[i]} duration={300} className="font-medium" />
        </div>
        <div className="flex gap-3">
          <span className="w-24 text-muted-foreground">Auto</span>
          <TextScramble value={WORDS[i]} className="font-medium" />
        </div>
        <div className="flex gap-3">
          <span className="w-24 text-muted-foreground">1600ms</span>
          <TextScramble value={WORDS[i]} duration={1600} className="font-medium" />
        </div>
      </div>
      <Button size="sm" variant="secondary" onClick={() => setI((n) => (n + 1) % WORDS.length)}>
        Next city
      </Button>
    </div>
  )
}
