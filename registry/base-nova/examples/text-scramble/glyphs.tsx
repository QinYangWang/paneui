"use client"

import * as React from "react"

import { Button } from "@/registry/base-nova/ui/button"
import { TextScramble } from "@/registry/base-nova/ui/text-scramble"

const CODES = ["7F3A-91C2", "B04E-5D18", "E6A9-2F70"]

export default function TextScrambleGlyphs() {
  const [i, setI] = React.useState(0)
  return (
    <div className="flex flex-col items-start gap-4">
      <div className="flex flex-col gap-1">
        <span className="text-xs text-muted-foreground">Recovery code</span>
        <TextScramble value={CODES[i]} glyphs="0123456789ABCDEF" className="font-mono text-xl" />
      </div>
      <Button size="sm" variant="secondary" onClick={() => setI((n) => (n + 1) % CODES.length)}>
        Generate new code
      </Button>
    </div>
  )
}
