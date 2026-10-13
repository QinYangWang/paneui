"use client"

import {
  MultiSelect,
  MultiSelectContent,
  MultiSelectEmpty,
  MultiSelectItem,
  MultiSelectList,
  MultiSelectTrigger,
} from "@/registry/base-nova/ui/multi-select"

const labels = ["Bug", "Design", "Docs", "Performance", "Accessibility", "Refactor", "Needs review", "Good first issue"]

export default function MultiSelectDemo() {
  return (
    <div className="w-80">
      <MultiSelect items={labels} defaultValue={["Design", "Accessibility"]}>
        <MultiSelectTrigger placeholder="Add labels" aria-label="Labels" />
        <MultiSelectContent>
          <MultiSelectEmpty>No labels found.</MultiSelectEmpty>
          <MultiSelectList>
            {(label: string) => (
              <MultiSelectItem key={label} value={label}>
                {label}
              </MultiSelectItem>
            )}
          </MultiSelectList>
        </MultiSelectContent>
      </MultiSelect>
    </div>
  )
}
