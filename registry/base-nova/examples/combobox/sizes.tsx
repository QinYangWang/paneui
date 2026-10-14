"use client"

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/registry/base-nova/ui/combobox"

const airports = ["HKG · Hong Kong", "TPE · Taipei", "NRT · Tokyo Narita", "SIN · Singapore", "LHR · London Heathrow"]

export default function ComboboxSizes() {
  return (
    <div className="flex w-64 flex-col gap-3">
      {(["sm", "default"] as const).map((size) => (
        <Combobox key={size} items={airports}>
          <ComboboxInput size={size} placeholder={size === "sm" ? "Small" : "Default"} aria-label={`Airport (${size})`} />
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
