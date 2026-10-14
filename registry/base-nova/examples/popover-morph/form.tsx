"use client"

import * as React from "react"

import { MailIcon } from "@/components/icons"
import { Button } from "@/registry/base-nova/ui/button"
import { Input } from "@/registry/base-nova/ui/input"
import { Label } from "@/registry/base-nova/ui/label"
import {
  MorphPopover,
  MorphPopoverCloseButton,
  MorphPopoverContent,
  MorphPopoverDescription,
  MorphPopoverFooter,
  MorphPopoverHeader,
  MorphPopoverTitle,
  MorphPopoverTrigger,
} from "@/registry/base-nova/ui/popover-morph"

export default function PopoverMorphForm() {
  const [open, setOpen] = React.useState(false)
  const [sent, setSent] = React.useState<string | null>(null)

  return (
    <div className="flex flex-col items-center gap-3">
      <MorphPopover open={open} onOpenChange={setOpen}>
        <MorphPopoverTrigger>
          <MailIcon />
          Invite
        </MorphPopoverTrigger>
        <MorphPopoverContent>
          <MorphPopoverCloseButton />
          <MorphPopoverHeader>
            <MorphPopoverTitle>Invite a teammate</MorphPopoverTitle>
            <MorphPopoverDescription>They get edit access to this project.</MorphPopoverDescription>
          </MorphPopoverHeader>
          <form
            id="invite-form"
            className="flex flex-col gap-2"
            onSubmit={(event) => {
              event.preventDefault()
              const email = new FormData(event.currentTarget).get("email")
              setSent(String(email))
              setOpen(false)
            }}
          >
            <Label htmlFor="invite-email">Email</Label>
            <Input id="invite-email" name="email" type="email" required placeholder="mei@example.com" />
          </form>
          <MorphPopoverFooter>
            <Button type="submit" form="invite-form" size="sm">
              Send invite
            </Button>
          </MorphPopoverFooter>
        </MorphPopoverContent>
      </MorphPopover>
      <p className="text-xs text-muted-foreground">{sent ? `Invite sent to ${sent}.` : "No invites sent yet."}</p>
    </div>
  )
}
