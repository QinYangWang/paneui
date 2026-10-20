"use client"

import type * as React from "react"

import { CheckIcon } from "@paneui/ui/icons"
import { Button } from "@paneui/ui/components/button"
import { Input } from "@paneui/ui/components/input"
import { Label } from "@paneui/ui/components/label"
import {
  MorphingModal,
  MorphingModalBack,
  MorphingModalClose,
  MorphingModalContent,
  MorphingModalDescription,
  MorphingModalFooter,
  MorphingModalHeader,
  MorphingModalTitle,
  MorphingModalTrigger,
  MorphingModalView,
  useMorphingModal,
} from "@paneui/ui/components/morphing-modal"

function NextButton({ to, children }: { to: string; children: React.ReactNode }) {
  const { push } = useMorphingModal()
  return <Button onClick={() => push(to)}>{children}</Button>
}

export default function MorphingModalSteps() {
  return (
    <MorphingModal defaultView="name">
      <MorphingModalTrigger render={<Button variant="secondary" />}>Create workspace</MorphingModalTrigger>
      <MorphingModalContent>
        <MorphingModalView name="name">
          <MorphingModalHeader>
            <MorphingModalTitle>Name your workspace</MorphingModalTitle>
            <MorphingModalDescription>Step 1 of 2. You can rename it later.</MorphingModalDescription>
          </MorphingModalHeader>
          <div className="flex flex-col gap-2">
            <Label htmlFor="workspace-name">Workspace name</Label>
            <Input id="workspace-name" defaultValue="Acme Design" />
          </div>
          <MorphingModalFooter>
            <NextButton to="url">Continue</NextButton>
          </MorphingModalFooter>
        </MorphingModalView>

        <MorphingModalView name="url">
          <MorphingModalHeader>
            <MorphingModalTitle>Pick a URL</MorphingModalTitle>
            <MorphingModalDescription>Step 2 of 2. Teammates use it to sign in.</MorphingModalDescription>
          </MorphingModalHeader>
          <div className="flex flex-col gap-2">
            <Label htmlFor="workspace-url">URL</Label>
            <Input id="workspace-url" defaultValue="acme-design.app" />
          </div>
          <MorphingModalFooter>
            <MorphingModalBack />
            <NextButton to="done">Create workspace</NextButton>
          </MorphingModalFooter>
        </MorphingModalView>

        <MorphingModalView name="done">
          <MorphingModalHeader>
            <MorphingModalTitle>Workspace ready</MorphingModalTitle>
            <MorphingModalDescription>Acme Design is live at acme-design.app.</MorphingModalDescription>
          </MorphingModalHeader>
          <MorphingModalFooter>
            <MorphingModalClose render={<Button />}>
              <CheckIcon data-icon="inline-start" />
              Done
            </MorphingModalClose>
          </MorphingModalFooter>
        </MorphingModalView>
      </MorphingModalContent>
    </MorphingModal>
  )
}
