"use client"

import {
  Combobox,
  ComboboxCollection,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
} from "@paneui/ui/components/combobox"

type Zone = { value: string; label: string }

const zones: { value: string; items: Zone[] }[] = [
  {
    value: "Asia",
    items: [
      { value: "Asia/Tokyo", label: "Tokyo" },
      { value: "Asia/Taipei", label: "Taipei" },
      { value: "Asia/Hong_Kong", label: "Hong Kong" },
      { value: "Asia/Singapore", label: "Singapore" },
    ],
  },
  {
    value: "Europe",
    items: [
      { value: "Europe/London", label: "London" },
      { value: "Europe/Berlin", label: "Berlin" },
      { value: "Europe/Lisbon", label: "Lisbon" },
    ],
  },
  {
    value: "Americas",
    items: [
      { value: "America/New_York", label: "New York" },
      { value: "America/Los_Angeles", label: "Los Angeles" },
      { value: "America/Sao_Paulo", label: "São Paulo" },
    ],
  },
]

export default function ComboboxDemo() {
  return (
    <div className="w-64">
      <Combobox items={zones}>
        <ComboboxInput placeholder="Search time zones" aria-label="Time zone" />
        <ComboboxContent>
          <ComboboxEmpty>No time zone matches that.</ComboboxEmpty>
          <ComboboxList>
            {(group: { value: string; items: Zone[] }) => (
              <ComboboxGroup key={group.value} items={group.items}>
                <ComboboxLabel>{group.value}</ComboboxLabel>
                <ComboboxCollection>
                  {(zone: Zone) => (
                    <ComboboxItem key={zone.value} value={zone}>
                      {zone.label}
                    </ComboboxItem>
                  )}
                </ComboboxCollection>
              </ComboboxGroup>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  )
}
