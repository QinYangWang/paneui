"use client"

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@paneui/ui/components/combobox"

const airports = ["HKG · Hong Kong", "TPE · Taipei", "NRT · Tokyo Narita", "SIN · Singapore", "LHR · London Heathrow"]

const sizes = [
  { size: "xs", label: "Extra small" },
  { size: "sm", label: "Small" },
  { size: "default", label: "Default" },
  { size: "lg", label: "Large" },
] as const

export default function ComboboxSizes() {
  return (
    <div className="flex w-64 flex-col gap-3">
      {sizes.map(({ size, label }) => (
        <Combobox key={size} size={size} items={airports}>
          <ComboboxInput placeholder={label} aria-label={`Airport (${label})`} />
          <ComboboxContent>
            <ComboboxEmpty>No airport found.</ComboboxEmpty>
            <ComboboxList>
              {(airport: string) => (
                <ComboboxItem key={airport} value={airport}>
                  {airport}
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      ))}
    </div>
  )
}
