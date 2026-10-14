"use client"

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxSearch,
  ComboboxTrigger,
  ComboboxValue,
} from "@/registry/base-nova/ui/combobox"

const languages = ["English", "日本語", "繁體中文", "简体中文", "Español", "Français", "Deutsch", "Português"]

export default function ComboboxPopupSearch() {
  return (
    <div className="w-56">
      <Combobox items={languages} defaultValue="English">
        <ComboboxTrigger aria-label="Language">
          <ComboboxValue placeholder="Choose a language" />
        </ComboboxTrigger>
        <ComboboxContent>
          <ComboboxSearch placeholder="Search languages" aria-label="Search languages" />
          <ComboboxEmpty>No language matches that.</ComboboxEmpty>
          <ComboboxList>
            {(language: string) => (
              <ComboboxItem key={language} value={language}>
                {language}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  )
}
