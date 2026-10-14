"use client"

import * as React from "react"
import { AnimatePresence, motion } from "motion/react"

import { AlertCircleIcon, CheckIcon, ChevronRightIcon, LoaderIcon } from "@/components/icons"
import { cn } from "@/lib/utils"

export type TaskStatus = "queued" | "running" | "done" | "failed"

const statusText: Record<TaskStatus, string> = {
  queued: "Queued",
  running: "Running",
  done: "Done",
  failed: "Failed",
}

function StatusMark({ status }: { status: TaskStatus }) {
  return (
    <span className="relative inline-flex size-7 shrink-0 items-center justify-center">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={status}
          initial={{ scale: 0.4, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.4, opacity: 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 28 }}
          className={cn(
            "inline-flex size-7 items-center justify-center rounded-full",
            status === "done" && "bg-success text-white",
            status === "failed" && "bg-destructive/14 text-destructive",
            status === "running" && "bg-primary/14 text-primary",
            status === "queued" && "bg-muted shadow-well"
          )}
        >
          {status === "done" && <CheckIcon size={15} />}
          {status === "failed" && <AlertCircleIcon size={16} />}
          {status === "running" && <LoaderIcon size={15} className="animate-spin" />}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

export function TaskRow({
  title,
  detail,
  status = "queued",
  onClick,
  className,
}: {
  title: string
  detail?: string
  status?: TaskStatus
  onClick?: () => void
  className?: string
}) {
  return (
    <button
      type="button"
      data-slot="task-row"
      data-status={status}
      onClick={onClick}
      className={cn(
        "group/task flex w-full cursor-pointer items-center gap-3 rounded-2xl px-3 py-2.5 text-left transition-[background-color,box-shadow] outline-none hover:bg-card hover:shadow-raised focus-visible:ring-3 focus-visible:ring-ring",
        className
      )}
    >
      <StatusMark status={status} />
      <span className="flex min-w-0 flex-1 flex-col">
        <span className={cn("truncate text-[0.95rem] font-medium", status === "done" && "text-muted-foreground")}>{title}</span>
        {detail && <span className="truncate text-sm text-muted-foreground">{detail}</span>}
      </span>
      <span className="text-sm text-muted-foreground tabular-nums">{statusText[status]}</span>
      <ChevronRightIcon size={16} className="text-muted-foreground transition-transform group-hover/task:translate-x-0.5" />
    </button>
  )
}

export function TaskList({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="task-list" className={cn("flex flex-col gap-0.5", className)} {...props} />
}
