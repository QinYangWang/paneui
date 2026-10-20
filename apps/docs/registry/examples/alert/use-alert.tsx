"use client"

import * as React from "react"

import {
  Alert,
  AlertAction,
  AlertContent,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  useAlert,
} from "@paneui/ui/components/alert"
import { Button } from "@paneui/ui/components/button"

function GotIt() {
  const { dismiss } = useAlert()
  return (
    <Button size="xs" variant="secondary" onClick={dismiss}>
      Got it
    </Button>
  )
}

export default function AlertUseAlert() {
  const [open, setOpen] = React.useState(true)

  return (
    <div className="flex w-full max-w-md flex-col items-start gap-2">
      <Alert variant="success" open={open} onOpenChange={setOpen} className="w-full">
        <AlertIcon />
        <AlertContent>
          <AlertTitle>Backup complete</AlertTitle>
          <AlertDescription>12,480 photos copied to your drive.</AlertDescription>
        </AlertContent>
        <AlertAction>
          <GotIt />
        </AlertAction>
      </Alert>
      {!open && (
        <Button size="sm" variant="ghost" onClick={() => setOpen(true)}>
          Show again
        </Button>
      )}
    </div>
  )
}
