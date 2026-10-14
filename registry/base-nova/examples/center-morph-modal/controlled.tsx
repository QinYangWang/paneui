"use client"

import * as React from "react"

import { Button } from "@/registry/base-nova/ui/button"
import {
  CenterMorphModal,
  CenterMorphModalContent,
  CenterMorphModalDescription,
  CenterMorphModalFooter,
  CenterMorphModalHeader,
  CenterMorphModalTitle,
} from "@/registry/base-nova/ui/center-morph-modal"

export default function CenterMorphModalControlled() {
  const [open, setOpen] = React.useState(false)
  const [saving, setSaving] = React.useState(false)

  function save() {
    setSaving(true)
    window.setTimeout(() => {
      setSaving(false)
      setOpen(false)
    }, 900)
  }

  return (
    <>
      <Button variant="secondary" onClick={() => setOpen(true)}>
        Upgrade plan
      </Button>
      <CenterMorphModal open={open} onOpenChange={setOpen}>
        <CenterMorphModalContent>
          <CenterMorphModalHeader>
            <CenterMorphModalTitle>Switch to Pro?</CenterMorphModalTitle>
            <CenterMorphModalDescription>$12 per seat each month, prorated from today. Cancel anytime.</CenterMorphModalDescription>
          </CenterMorphModalHeader>
          <CenterMorphModalFooter>
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Not now
            </Button>
            <Button disabled={saving} onClick={save}>
              {saving ? "Upgrading…" : "Upgrade"}
            </Button>
          </CenterMorphModalFooter>
        </CenterMorphModalContent>
      </CenterMorphModal>
    </>
  )
}
