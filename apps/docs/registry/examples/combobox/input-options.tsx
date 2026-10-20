"use client"

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@paneui/ui/components/combobox"

const cities = ["Amsterdam", "Barcelona", "Copenhagen", "Dublin", "Edinburgh", "Florence"]

export default function ComboboxInputOptions() {
  return (
    <div className="w-64">
      <Combobox items={cities}>
        <ComboboxInput
          showSearchIcon={false}
          showTrigger={false}
          placeholder="Type a city"
          aria-label="City"
        />
        <ComboboxContent>
          <ComboboxEmpty>No city matches that.</ComboboxEmpty>
          <ComboboxList>
            {(city: string) => (
              <ComboboxItem key={city} value={city}>
                {city}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  )
}
