"use client"

import * as React from "react"

import { Button } from "@/registry/base-nova/ui/button"
import {
  Drawer,
  DrawerBody,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/registry/base-nova/ui/drawer"
import { Input } from "@/registry/base-nova/ui/input"
import { Label } from "@/registry/base-nova/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/registry/base-nova/ui/select"
import { Switch } from "@/registry/base-nova/ui/switch"
import { useToast } from "@/registry/base-nova/ui/toast"

const regions = [
  { value: "ap-northeast-1", label: "Tokyo (ap-northeast-1)" },
  { value: "us-east-1", label: "N. Virginia (us-east-1)" },
  { value: "eu-central-1", label: "Frankfurt (eu-central-1)" },
]

const toggles = [
  { id: "approve", label: "Require approval for destructive tools", hint: "rm, force-push, schema drops", on: true },
  { id: "digest", label: "Daily usage digest", hint: "Sent to owners at 09:00", on: true },
  { id: "spend", label: "Alert at 80% of spend cap", hint: "Email and Slack", on: true },
  { id: "beta", label: "Early access models", hint: "May change without notice", on: false },
]

export function SettingsDrawer({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const toast = useToast()
  return (
    <Drawer side="right" open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Workspace settings</DrawerTitle>
          <DrawerDescription>Defaults for every project in acme-prod.</DrawerDescription>
        </DrawerHeader>
        <DrawerBody className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <Label htmlFor="ws-name">Workspace name</Label>
            <Input id="ws-name" defaultValue="acme-prod" />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Default region</Label>
            <Select items={regions} defaultValue="ap-northeast-1">
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {regions.map((r) => (
                  <SelectItem key={r.value} value={r.value}>
                    {r.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-4">
            {toggles.map((t) => (
              <Label key={t.id} className="items-start justify-between gap-4">
                <span className="flex flex-col gap-0.5">
                  <span>{t.label}</span>
                  <span className="text-xs font-normal text-muted-foreground">{t.hint}</span>
                </span>
                <Switch defaultChecked={t.on} />
              </Label>
            ))}
          </div>
        </DrawerBody>
        <DrawerFooter>
          <DrawerClose render={<Button variant="ghost" />}>Cancel</DrawerClose>
          <DrawerClose render={<Button />} onClick={() => toast.add({ title: "Settings saved", description: "Applied to 12 projects.", type: "success" })}>
            Save changes
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
