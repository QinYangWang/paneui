"use client"

import { DirectionProvider } from "@base-ui/react/direction-provider"
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@paneui/ui/components/combobox"

const cities = ["القاهرة", "دبي", "الرياض", "عمّان", "بيروت", "الدار البيضاء", "تونس"]

export default function ComboboxRtl() {
  return (
    <DirectionProvider direction="rtl">
      <div dir="rtl" className="w-64">
        <Combobox items={cities}>
          <ComboboxInput placeholder="ابحث عن مدينة" aria-label="المدينة" />
          <ComboboxContent>
            <ComboboxEmpty>لا توجد نتائج.</ComboboxEmpty>
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
    </DirectionProvider>
  )
}
