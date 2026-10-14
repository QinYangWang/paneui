"use client"

import * as React from "react"

import { Button } from "@/registry/base-nova/ui/button"
import {
  MultiSelect,
  MultiSelectContent,
  MultiSelectEmpty,
  MultiSelectItem,
  MultiSelectList,
  MultiSelectTrigger,
} from "@/registry/base-nova/ui/multi-select"

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

export default function MultiSelectControlled() {
  const [value, setValue] = React.useState<string[]>(["Monday", "Wednesday", "Friday"])
  return (
    <div className="flex w-80 flex-col gap-3">
      <MultiSelect items={days} value={value} onValueChange={setValue}>
        <MultiSelectTrigger placeholder="Workout days" aria-label="Workout days" />
        <MultiSelectContent>
          <MultiSelectEmpty>No day matches that.</MultiSelectEmpty>
          <MultiSelectList>
            {(day: string) => (
              <MultiSelectItem key={day} value={day}>
                {day}
              </MultiSelectItem>
            )}
          </MultiSelectList>
        </MultiSelectContent>
      </MultiSelect>
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground tabular-nums">{value.length} days a week</span>
        <div className="flex gap-2">
          <Button size="xs" variant="ghost" onClick={() => setValue(days.slice(0, 5))}>
            Weekdays
          </Button>
          <Button size="xs" variant="ghost" onClick={() => setValue([])}>
            Clear
          </Button>
        </div>
      </div>
    </div>
  )
}
