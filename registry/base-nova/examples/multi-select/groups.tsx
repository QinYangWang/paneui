"use client"

import {
  MultiSelect,
  MultiSelectCollection,
  MultiSelectContent,
  MultiSelectEmpty,
  MultiSelectGroup,
  MultiSelectItem,
  MultiSelectLabel,
  MultiSelectList,
  MultiSelectSeparator,
  MultiSelectTrigger,
} from "@/registry/base-nova/ui/multi-select"

type Group = { value: string; items: string[] }

const groups: Group[] = [
  { value: "Frontend", items: ["React", "Vue", "Svelte"] },
  { value: "Backend", items: ["Node.js", "Go", "Rust"] },
  { value: "Data", items: ["PostgreSQL", "Redis"] },
]

export default function MultiSelectGroups() {
  return (
    <div className="w-80">
      <MultiSelect items={groups} defaultValue={["React", "Go"]}>
        <MultiSelectTrigger placeholder="Pick your stack" aria-label="Stack" />
        <MultiSelectContent>
          <MultiSelectEmpty>Nothing matches that.</MultiSelectEmpty>
          <MultiSelectList>
            {(group: Group, index: number) => (
              <MultiSelectGroup key={group.value} items={group.items}>
                {index > 0 && <MultiSelectSeparator />}
                <MultiSelectLabel>{group.value}</MultiSelectLabel>
                <MultiSelectCollection>
                  {(item: string) => (
                    <MultiSelectItem key={item} value={item}>
                      {item}
                    </MultiSelectItem>
                  )}
                </MultiSelectCollection>
              </MultiSelectGroup>
            )}
          </MultiSelectList>
        </MultiSelectContent>
      </MultiSelect>
    </div>
  )
}
