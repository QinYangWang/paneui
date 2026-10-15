"use client"

import {
  MultiSelect,
  MultiSelectContent,
  MultiSelectItem,
  MultiSelectList,
  MultiSelectTrigger,
} from "@/registry/base-nova/ui/multi-select"

const labels = ["Bug", "Design", "Docs", "Infra", "Research"]

export default function MultiSelectSizes() {
  return (
    <div className="flex w-72 flex-col gap-3">
      {(["sm", "default", "lg"] as const).map((size) => (
        <MultiSelect key={size} size={size} items={labels} defaultValue={["Design"]}>
          <MultiSelectTrigger placeholder="Labels" aria-label={`Labels (${size})`} />
          <MultiSelectContent>
            <MultiSelectList>
              {(label: string) => (
                <MultiSelectItem key={label} value={label}>
                  {label}
                </MultiSelectItem>
              )}
            </MultiSelectList>
          </MultiSelectContent>
        </MultiSelect>
      ))}
    </div>
  )
}
