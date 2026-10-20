"use client"

import {
  Combobox,
  ComboboxContent,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@paneui/ui/components/combobox"

const plans = [
  { value: "free", label: "Free" },
  { value: "pro", label: "Pro" },
  { value: "team", label: "Team" },
  { value: "enterprise", label: "Enterprise (contact sales)", disabled: true },
]

type Plan = (typeof plans)[number]

export default function ComboboxDisabled() {
  return (
    <div className="flex w-64 flex-col gap-3">
      <Combobox items={plans}>
        <ComboboxInput placeholder="Choose a plan" aria-label="Plan" />
        <ComboboxContent>
          <ComboboxList>
            {(plan: Plan) => (
              <ComboboxItem key={plan.value} value={plan} disabled={plan.disabled}>
                {plan.label}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
      <Combobox items={plans} disabled>
        <ComboboxInput placeholder="Plan locked by admin" aria-label="Locked plan" />
      </Combobox>
    </div>
  )
}
