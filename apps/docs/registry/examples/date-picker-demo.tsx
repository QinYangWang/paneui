"use client"

import * as React from "react"

import { DatePicker } from "@paneui/ui/components/date-picker"
import { Field, FieldLabel } from "@paneui/ui/components/field"

export default function DatePickerDemo() {
  const [date, setDate] = React.useState<Date | null>(null)
  return (
    <Field className="w-56">
      <FieldLabel>Due date</FieldLabel>
      <DatePicker value={date} onValueChange={setDate} min={new Date()} aria-label="Due date" />
    </Field>
  )
}
