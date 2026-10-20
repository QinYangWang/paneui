"use client"

import * as React from "react"

import { Button } from "@paneui/ui/components/button"
import {
  Drawer,
  DrawerBody,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  type DrawerSide,
} from "@paneui/ui/components/drawer"
import { Label } from "@paneui/ui/components/label"
import { Switch } from "@paneui/ui/components/switch"

const settings = [
  { label: "Auto-approve under $50", on: true },
  { label: "Daily digest at 8:00", on: true },
  { label: "Flight status alerts", on: true },
  { label: "Price-drop watch", on: false },
]

function SideDrawer({ side }: { side: DrawerSide }) {
  return (
    <Drawer side={side}>
      <DrawerTrigger render={<Button variant="secondary" />}>Open {side}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Agent settings</DrawerTitle>
          <DrawerDescription>Choose what Hark can do without checking with you first.</DrawerDescription>
        </DrawerHeader>
        <DrawerBody className="flex flex-col gap-4">
          {settings.map((s) => (
            <Label key={s.label} className="justify-between gap-3">
              {s.label}
              <Switch defaultChecked={s.on} />
            </Label>
          ))}
        </DrawerBody>
        <DrawerFooter>
          <DrawerClose render={<Button variant="ghost" />}>Cancel</DrawerClose>
          <DrawerClose render={<Button />}>Save changes</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export default function DrawerDemo() {
  return (
    <div className="flex items-center gap-3">
      <SideDrawer side="left" />
      <SideDrawer side="right" />
    </div>
  )
}
