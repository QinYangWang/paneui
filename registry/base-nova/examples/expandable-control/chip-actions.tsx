"use client"

import * as React from "react"

import { CopyIcon, EditIcon } from "@/components/icons"
import { ExpandableChip } from "@/registry/base-nova/ui/expandable-control"

export default function ExpandableControlChipActions() {
  const [copied, setCopied] = React.useState(false)
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex flex-wrap items-center justify-center gap-2">
        <ExpandableChip
          label="INV-2048"
          actionIcon={<CopyIcon />}
          actionLabel="Copy invoice number"
          onAction={() => setCopied(true)}
        />
        <ExpandableChip
          label="Due Oct 31"
          actionIcon={<EditIcon />}
          actionLabel="Edit due date"
          collapseOnAction={false}
          defaultExpanded
        />
        <ExpandableChip label="Archived" actionIcon={<EditIcon />} actionLabel="Edit status" disabled />
      </div>
      <p className="text-xs text-muted-foreground">{copied ? "Invoice number copied." : "Click a chip to reveal its action."}</p>
    </div>
  )
}
