"use client"

import * as React from "react"

import { RefreshIcon } from "@/components/icons"
import {
  Alert,
  AlertAction,
  AlertClose,
  AlertContent,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from "@/registry/base-nova/ui/alert"
import { Button } from "@/registry/base-nova/ui/button"

export default function AlertDemo() {
  const [synced, setSynced] = React.useState(true)

  return (
    <div className="flex w-full max-w-md flex-col gap-2">
      <Alert variant="info">
        <AlertIcon />
        <AlertContent>
          <AlertTitle>Calendar connected</AlertTitle>
          <AlertDescription>New events will show up on Home within a minute.</AlertDescription>
        </AlertContent>
        <AlertClose />
      </Alert>

      <Alert variant="success" open={synced} onOpenChange={setSynced}>
        <AlertIcon />
        <AlertContent>
          <AlertTitle>Order placed</AlertTitle>
          <AlertDescription>Arrives Thursday. Receipt sent to your inbox.</AlertDescription>
        </AlertContent>
        <AlertClose />
      </Alert>

      <Alert variant="warning">
        <AlertIcon />
        <AlertContent>
          <AlertTitle>Card expires soon</AlertTitle>
          <AlertDescription>Update it before Nov 1 to keep renewals running.</AlertDescription>
        </AlertContent>
        <AlertAction>
          <Button size="xs" variant="secondary">
            Update
          </Button>
        </AlertAction>
      </Alert>

      <Alert variant="destructive">
        <AlertIcon />
        <AlertContent>
          <AlertTitle>Sync failed</AlertTitle>
          <AlertDescription>We couldn&apos;t reach your bank. Try again in a moment.</AlertDescription>
        </AlertContent>
        <AlertAction>
          <Button size="xs" variant="secondary">
            <RefreshIcon data-icon="inline-start" />
            Retry
          </Button>
        </AlertAction>
      </Alert>

      {!synced && (
        <Button size="sm" variant="ghost" className="self-start" onClick={() => setSynced(true)}>
          Show the dismissed alert again
        </Button>
      )}
    </div>
  )
}
