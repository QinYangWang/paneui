"use client"

import * as React from "react"

import { Button } from "@/registry/base-nova/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/registry/base-nova/ui/dialog"
import { Input } from "@/registry/base-nova/ui/input"
import { Label } from "@/registry/base-nova/ui/label"

export default function DialogWithForm() {
  const [open, setOpen] = React.useState(false)
  const [name, setName] = React.useState("Qinyang")
  return (
    <div className="flex flex-col items-center gap-2">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger render={<Button variant="secondary" />}>Edit profile</DialogTrigger>
        <DialogContent>
          <form
            className="flex flex-col gap-4"
            onSubmit={(event) => {
              event.preventDefault()
              const data = new FormData(event.currentTarget)
              setName(String(data.get("name") || name))
              setOpen(false)
            }}
          >
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>This is how teammates see you in comments and mentions.</DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-2">
              <Label htmlFor="profile-name">Display name</Label>
              <Input id="profile-name" name="name" defaultValue={name} />
            </div>
            <DialogFooter>
              <DialogClose render={<Button type="button" variant="secondary" />}>Cancel</DialogClose>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      <p className="text-sm text-muted-foreground">Signed in as {name}</p>
    </div>
  )
}
