"use client"

import * as React from "react"

import { Button } from "@/registry/base-nova/ui/button"
import { TextScramble } from "@/registry/base-nova/ui/text-scramble"

export default function TextScrambleOnMount() {
  const [run, setRun] = React.useState(0)
  return (
    <div className="flex flex-col items-start gap-4">
      <TextScramble
        key={run}
        value="Welcome back, Mei"
        scrambleOnMount
        className="text-2xl font-semibold tracking-tight"
      />
      <Button size="sm" variant="secondary" onClick={() => setRun((n) => n + 1)}>
        Replay
      </Button>
    </div>
  )
}
