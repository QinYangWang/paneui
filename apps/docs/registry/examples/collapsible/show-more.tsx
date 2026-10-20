"use client"

import * as React from "react"

import { Collapsible, CollapsiblePanel, CollapsibleTrigger } from "@paneui/ui/components/collapsible"

const visible = ["Renew passport", "Book airport taxi"]
const more = ["Exchange yen", "Download offline maps", "Pack chargers"]

export default function CollapsibleShowMore() {
  const [open, setOpen] = React.useState(false)

  return (
    <Collapsible open={open} onOpenChange={setOpen} className="w-full max-w-xs">
      <ul className="flex flex-col gap-2 px-3 text-sm">
        {visible.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <CollapsiblePanel>
        <ul className="flex flex-col gap-2 px-3 pt-2 text-sm">
          {more.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </CollapsiblePanel>
      <CollapsibleTrigger chevron={false} className="mt-2 self-start">
        {open ? "Show less" : `Show ${more.length} more`}
      </CollapsibleTrigger>
    </Collapsible>
  )
}
