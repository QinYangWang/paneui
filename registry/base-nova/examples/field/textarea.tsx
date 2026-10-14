"use client"

import * as React from "react"

import { Field, FieldControl, FieldDescription, FieldLabel } from "@/registry/base-nova/ui/field"
import { Textarea } from "@/registry/base-nova/ui/textarea"

export default function FieldTextarea() {
  const [bio, setBio] = React.useState("Platform lead.")
  return (
    <Field className="w-full max-w-sm">
      <FieldLabel>Bio</FieldLabel>
      <FieldControl render={<Textarea rows={3} maxLength={160} />} value={bio} onValueChange={(v) => setBio(String(v))} />
      <FieldDescription>{160 - bio.length} characters left.</FieldDescription>
    </Field>
  )
}
