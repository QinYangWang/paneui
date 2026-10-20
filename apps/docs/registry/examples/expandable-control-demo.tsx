"use client"

import * as React from "react"

import { BellIcon, BookmarkIcon, PinIcon, XIcon } from "@paneui/ui/icons"
import { ExpandableButton, ExpandableChip } from "@paneui/ui/components/expandable-control"

export default function ExpandableControlDemo() {
  const [tags, setTags] = React.useState(["Design", "Q4 launch", "Customer feedback"])
  return (
    <div className="flex flex-col items-center gap-5">
      <div className="flex items-center gap-2">
        <ExpandableButton icon={<BellIcon />} label="Notify me" />
        <ExpandableButton icon={<BookmarkIcon />} label="Saved" defaultExpanded />
        <ExpandableButton icon={<PinIcon />} label="Pinned to sidebar" />
      </div>
      <div className="flex flex-wrap items-center justify-center gap-2">
        {tags.map((tag) => (
          <ExpandableChip
            key={tag}
            label={tag}
            actionIcon={<XIcon />}
            actionLabel={`Remove ${tag}`}
            actionTone="destructive"
            onAction={() => setTags((t) => t.filter((x) => x !== tag))}
          />
        ))}
        {tags.length === 0 && (
          <button
            type="button"
            onClick={() => setTags(["Design", "Q4 launch", "Customer feedback"])}
            className="text-sm text-muted-foreground underline-offset-4 hover:underline"
          >
            Restore tags
          </button>
        )}
      </div>
    </div>
  )
}
