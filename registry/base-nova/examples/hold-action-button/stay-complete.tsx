"use client"

import * as React from "react"

import { CheckIcon } from "@/components/icons"
import { Button } from "@/registry/base-nova/ui/button"
import { HoldActionButton } from "@/registry/base-nova/ui/hold-action-button"

export default function HoldActionButtonStayComplete() {
  const [signed, setSigned] = React.useState(false)
  const [run, setRun] = React.useState(0)
  return (
    <div className="flex flex-col items-center gap-3">
      <HoldActionButton
        key={run}
        tone="success"
        resetDelay={null}
        onHoldComplete={() => setSigned(true)}
        completeLabel={
          <>
            <CheckIcon />
            Lease signed
          </>
        }
      >
        Hold to sign lease
      </HoldActionButton>
      <p className="text-sm text-muted-foreground">
        {signed ? "Signed today. A copy is on its way to your inbox." : "Not signed yet."}
      </p>
      {signed && (
        <Button
          size="sm"
          variant="ghost"
          onClick={() => {
            setSigned(false)
            setRun((n) => n + 1)
          }}
        >
          Reset
        </Button>
      )}
    </div>
  )
}
