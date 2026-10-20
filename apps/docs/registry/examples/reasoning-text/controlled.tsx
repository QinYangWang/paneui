"use client"

import * as React from "react"

import { Button } from "@paneui/ui/components/button"
import { ReasoningText } from "@paneui/ui/components/reasoning-text"

const STEPS = ["Opening the spreadsheet", "Summing Q3 revenue", "Comparing with Q2", "Writing the summary"]

export default function ReasoningTextControlled() {
  const [step, setStep] = React.useState(0)
  return (
    <div className="flex flex-col items-start gap-4">
      <ReasoningText phrases={STEPS} index={step} />
      <Button variant="secondary" size="sm" onClick={() => setStep((s) => (s + 1) % STEPS.length)}>
        Next step
      </Button>
    </div>
  )
}
