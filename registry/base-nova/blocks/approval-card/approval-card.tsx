"use client"

import * as React from "react"
import { AnimatePresence, motion } from "motion/react"

import { CheckIcon, ShieldIcon, XIcon } from "@/components/icons"
import { cn } from "@/lib/utils"
import { Badge } from "@/registry/base-nova/ui/badge"
import { Button } from "@/registry/base-nova/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/registry/base-nova/ui/card"
import { IconChip } from "@/registry/base-nova/ui/icon-chip"

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
  const [status, setStatus] = React.useState<Status>("pending")

  return (
    <Card className={cn("w-full max-w-sm", className)}>
      <CardHeader>
        <div className="flex items-center gap-2 text-ui text-muted-foreground">
          <IconChip size="sm" tone="primary">
            <ShieldIcon />
          </IconChip>
          Needs your approval
        </div>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <dl className="flex flex-col gap-0.5 rounded-2xl bg-background dark:bg-input/32 p-1 shadow-well">
          {details.map((d) => (
            <div key={d.label} className="flex items-center justify-between rounded-xl px-3 py-2">
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
                Decline
              </Button>
              <Button
                className="flex-1"
                onClick={() => {
                  setStatus("approved")
                  onApprove?.()
                }}
              >
                Approve
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
                {status === "approved" ? "Approved" : "Declined"}
              </Badge>
              <Button variant="ghost" size="sm" onClick={() => setStatus("pending")}>
                Undo
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </CardFooter>
    </Card>
  )
}
