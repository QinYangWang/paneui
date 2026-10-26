"use client"

import * as React from "react"
import { useLocale } from "@paneui/ui/components/locale-provider"
import { AnimatePresence, motion } from "motion/react"

import { CheckIcon, ShieldIcon, XIcon } from "@paneui/ui/icons"
import { cn } from "@paneui/ui/lib/utils"
import { Badge } from "@paneui/ui/components/badge"
import { Button } from "@paneui/ui/components/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@paneui/ui/components/card"
import { IconChip } from "@paneui/ui/components/icon-chip"

type Status = "pending" | "approved" | "declined"

export function ApprovalCard({
  title = "Send payment to Cone King",
  details = [
    { label: "Amount", value: "$1,240.00" },
    { label: "From", value: "Operating · 4821" },
    { label: "Due", value: "Oct 15" },
  ],
  onApprove,
  onDecline,
  className,
}: {
  title?: string
  details?: { label: string; value: string }[]
  onApprove?: () => void
  onDecline?: () => void
  className?: string
}) {
  const l10n = useLocale().labels

  const [status, setStatus] = React.useState<Status>("pending")

  return (
    <Card className={cn("w-full max-w-sm", className)}>
      <CardHeader>
        <div className="flex items-center gap-2 text-ui text-muted-foreground">
          <IconChip size="sm" tone="primary">
            <ShieldIcon />
          </IconChip>
          {l10n.needsYourApproval}
        </div>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <dl className="flex flex-col gap-0.5 frame-2xl frame-p-1 bg-background dark:bg-input/32 shadow-well">
          {details.map((d) => (
            <div key={d.label} className="flex items-center justify-between rounded-inner px-3 py-2">
              <dt className="text-muted-foreground">{d.label}</dt>
              <dd className="font-medium tabular-nums">{d.value}</dd>
            </div>
          ))}
        </dl>
      </CardContent>
      <CardFooter className="min-h-9 justify-end">
        <AnimatePresence mode="wait" initial={false}>
          {status === "pending" ? (
            <motion.div
              key="actions"
              className="flex w-full gap-2"
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.15 }}
            >
              <Button
                variant="secondary"
                className="flex-1"
                onClick={() => {
                  setStatus("declined")
                  onDecline?.()
                }}
              >
                {l10n.decline}
              </Button>
              <Button
                className="flex-1"
                onClick={() => {
                  setStatus("approved")
                  onApprove?.()
                }}
              >
                {l10n.approve}
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="flex w-full items-center justify-between"
            >
              <Badge variant={status === "approved" ? "success" : "destructive"}>
                {status === "approved" ? <CheckIcon /> : <XIcon />}
                {status === "approved" ? l10n.approved : l10n.declined}
              </Badge>
              <Button variant="ghost" size="sm" onClick={() => setStatus("pending")}>
                {l10n.undo}
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </CardFooter>
    </Card>
  )
}
