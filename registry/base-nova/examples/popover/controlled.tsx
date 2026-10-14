"use client"

import * as React from "react"

import { Button } from "@/registry/base-nova/ui/button"
import { Input } from "@/registry/base-nova/ui/input"
import { Label } from "@/registry/base-nova/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/registry/base-nova/ui/popover"

export default function PopoverControlled() {
  const [open, setOpen] = React.useState(false)
  const [name, setName] = React.useState("Kyoto trip")
  const [draft, setDraft] = React.useState(name)

  return (
    <Popover
      open={open}
      onOpenChange={(next) => {
        if (next) setDraft(name)
        setOpen(next)
      }}
    >
      <PopoverTrigger render={<Button variant="secondary" />}>{name}</PopoverTrigger>
      <PopoverContent>
        <form
          className="flex flex-col gap-3"
          onSubmit={(event) => {
            event.preventDefault()
            setName(draft.trim() || name)
            setOpen(false)
          }}
        >
          <PopoverHeader>
            <PopoverTitle>Rename project</PopoverTitle>
          </PopoverHeader>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="popover-project-name">Name</Label>
            <Input id="popover-project-name" value={draft} onChange={(event) => setDraft(event.target.value)} />
          </div>
          <PopoverFooter>
            <Button type="button" variant="ghost" size="sm" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" size="sm">
              Rename
            </Button>
          </PopoverFooter>
        </form>
      </PopoverContent>
    </Popover>
  )
}
