"use client"

import * as React from "react"

import { BellIcon, ChevronRightIcon, LockIcon, UserIcon } from "@/components/icons"
import { Button } from "@/registry/base-nova/ui/button"
import { Switch } from "@/registry/base-nova/ui/switch"
import { Label } from "@/registry/base-nova/ui/label"
import {
  MorphingModal,
  MorphingModalContent,
  MorphingModalDescription,
  MorphingModalHeader,
  MorphingModalLink,
  MorphingModalTitle,
  MorphingModalTrigger,
  MorphingModalView,
} from "@/registry/base-nova/ui/morphing-modal"

export default function MorphingModalViewChange() {
  const [view, setView] = React.useState("main")

  return (
    <div className="flex flex-col items-center gap-3">
      <MorphingModal onViewChange={setView}>
        <MorphingModalTrigger render={<Button variant="secondary" />}>Settings</MorphingModalTrigger>
        <MorphingModalContent>
          <MorphingModalView name="main">
            <MorphingModalHeader>
              <MorphingModalTitle>Settings</MorphingModalTitle>
            </MorphingModalHeader>
            <div className="-mx-2 flex flex-col">
              <MorphingModalLink to="profile">
                <UserIcon className="text-muted-foreground" />
                <span className="flex-1">Profile</span>
                <ChevronRightIcon className="text-muted-foreground rtl:-scale-x-100" />
              </MorphingModalLink>
              <MorphingModalLink to="notifications">
                <BellIcon className="text-muted-foreground" />
                <span className="flex-1">Notifications</span>
                <ChevronRightIcon className="text-muted-foreground rtl:-scale-x-100" />
              </MorphingModalLink>
              <MorphingModalLink to="security">
                <LockIcon className="text-muted-foreground" />
                <span className="flex-1">Security</span>
                <ChevronRightIcon className="text-muted-foreground rtl:-scale-x-100" />
              </MorphingModalLink>
            </div>
          </MorphingModalView>
          <MorphingModalView name="profile">
            <MorphingModalHeader>
              <MorphingModalTitle>Profile</MorphingModalTitle>
              <MorphingModalDescription>Mei Lin · mei@acme.design</MorphingModalDescription>
            </MorphingModalHeader>
          </MorphingModalView>
          <MorphingModalView name="notifications">
            <MorphingModalHeader>
              <MorphingModalTitle>Notifications</MorphingModalTitle>
            </MorphingModalHeader>
            <Label className="justify-between">
              Weekly digest
              <Switch defaultChecked />
            </Label>
            <Label className="justify-between">
              Mentions
              <Switch defaultChecked />
            </Label>
          </MorphingModalView>
          <MorphingModalView name="security">
            <MorphingModalHeader>
              <MorphingModalTitle>Security</MorphingModalTitle>
              <MorphingModalDescription>Two-factor authentication is on. Last sign-in from Taipei, 2 hours ago.</MorphingModalDescription>
            </MorphingModalHeader>
          </MorphingModalView>
        </MorphingModalContent>
      </MorphingModal>
      <p className="text-xs text-muted-foreground">
        Last view: <span className="font-medium text-foreground">{view}</span>
      </p>
    </div>
  )
}
