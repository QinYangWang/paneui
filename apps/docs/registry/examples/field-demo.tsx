"use client"

import * as React from "react"

import { Button } from "@paneui/ui/components/button"
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@paneui/ui/components/field"
import { Input } from "@paneui/ui/components/input"

export default function FieldDemo() {
  const [email, setEmail] = React.useState("")
  const [error, setError] = React.useState<string>()
  return (
    <form
      noValidate
      className="flex w-full max-w-sm flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault()
        setError(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) ? undefined : "Enter a valid email address.")
      }}
    >
      <FieldGroup>
        <Field>
          <FieldLabel>Workspace name</FieldLabel>
          <Input defaultValue="Northwind" />
          <FieldDescription>Shown in invites and on invoices.</FieldDescription>
        </Field>
        <Field invalid={!!error}>
          <FieldLabel>Billing email</FieldLabel>
          <Input
            type="email"
            value={email}
            placeholder="billing@company.com"
            onChange={(e) => {
              setEmail(e.target.value)
              if (error) setError(undefined)
            }}
          />
          <FieldError>{error}</FieldError>
        </Field>
      </FieldGroup>
      <Button type="submit" className="self-start">
        Save
      </Button>
    </form>
  )
}
