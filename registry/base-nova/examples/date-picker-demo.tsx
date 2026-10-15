"use client"

import * as React from "react"

import { DatePicker } from "@/registry/base-nova/ui/date-picker"
import { Field, FieldLabel } from "@/registry/base-nova/ui/field"

export default function DatePickerDemo() {
  const [date, setDate] = React.useState<Date | null>(null)
  return (
    <Field className="w-56">
      <FieldLabel>Due date</FieldLabel>
      <DatePicker value={date} onValueChange={setDate} min={new Date()} aria-label="Due date" />
    </Field>
  )
}
