"use client"

import * as React from "react"

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@paneui/ui/components/combobox"

const assignees = ["Aiko Tanaka", "Daniel Ortiz", "Mei Chen", "Lucas Ferreira", "Priya Nair"]

export default function ComboboxControlled() {
  const [value, setValue] = React.useState<string | null>("Mei Chen")
  return (
    <div className="flex w-64 flex-col gap-2">
      <Combobox items={assignees} value={value} onValueChange={setValue}>
        <ComboboxInput placeholder="Assign to…" aria-label="Assignee" />
        <ComboboxContent>
          <ComboboxEmpty>Nobody by that name.</ComboboxEmpty>
          <ComboboxList>
            {(person: string) => (
              <ComboboxItem key={person} value={person}>
                {person}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
      <p className="text-xs text-muted-foreground">{value ? `Assigned to ${value}` : "Unassigned"}</p>
    </div>
  )
}
