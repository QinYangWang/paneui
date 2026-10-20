"use client"

import {
  MultiSelect,
  MultiSelectContent,
  MultiSelectEmpty,
  MultiSelectItem,
  MultiSelectList,
  MultiSelectTrigger,
} from "@paneui/ui/components/multi-select"

type Person = { id: string; name: string; email: string }

const people: Person[] = [
  { id: "u1", name: "Aiko Tanaka", email: "aiko@studio.jp" },
  { id: "u2", name: "Daniel Ortiz", email: "daniel@ortiz.dev" },
  { id: "u3", name: "Mei Chen", email: "mei@lumen.app" },
  { id: "u4", name: "Priya Nair", email: "priya@northwind.io" },
]

export default function MultiSelectObjects() {
  return (
    <div className="w-80">
      <MultiSelect<Person> items={people} defaultValue={[people[2]]} itemToStringLabel={(p) => p.name}>
        <MultiSelectTrigger
          placeholder="Invite people"
          aria-label="Invitees"
          renderChip={(p: Person) => p.name.split(" ")[0]}
          getKey={(p: Person) => p.id}
        />
        <MultiSelectContent>
          <MultiSelectEmpty>No one by that name.</MultiSelectEmpty>
          <MultiSelectList>
            {(p: Person) => (
              <MultiSelectItem key={p.id} value={p}>
                <span className="flex flex-col">
                  <span>{p.name}</span>
                </span>
                <span className="ml-auto text-xs text-muted-foreground">{p.email}</span>
              </MultiSelectItem>
            )}
          </MultiSelectList>
        </MultiSelectContent>
      </MultiSelect>
    </div>
  )
}
