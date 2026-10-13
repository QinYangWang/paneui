"use client"

import * as React from "react"

import { CheckIcon, CopyIcon } from "@/components/icons"
import { cn } from "@/lib/utils"

export function CopyButton({ value, className }: { value: string; className?: string }) {
  const [copied, setCopied] = React.useState(false)
  return (
    <button
      type="button"
      aria-label="Copy"
      onClick={async () => {
        await navigator.clipboard.writeText(value)
        setCopied(true)
        setTimeout(() => setCopied(false), 1500)
      }}
      className={cn(
        "inline-flex size-8 cursor-pointer items-center justify-center rounded-full bg-secondary text-muted-foreground shadow-raised transition hover:text-foreground active:shadow-pressed",
        className
      )}
    >
      {copied ? <CheckIcon size={15} className="text-success" /> : <CopyIcon size={15} />}
    </button>
  )
}
