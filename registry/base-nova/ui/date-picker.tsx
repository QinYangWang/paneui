"use client"

import * as React from "react"
import { Popover as PopoverPrimitive } from "@base-ui/react/popover"

import { CalendarIcon, ChevronsUpDownIcon } from "@/components/icons"
import { useControlSize, type ControlSize } from "@/lib/control-size"
import { cn } from "@/lib/utils"
import { Calendar, type CalendarProps } from "@/registry/base-nova/ui/calendar"
import { PopoverContent } from "@/registry/base-nova/ui/popover"
import { selectTriggerVariants } from "@/registry/base-nova/ui/select"

type DatePickerProps = Omit<Extract<CalendarProps, { mode?: "single" }>, "mode" | "className"> & {
  className?: string
  placeholder?: string
  /** How the chosen date reads on the trigger. */
  formatOptions?: Intl.DateTimeFormatOptions
  size?: ControlSize
  /** Keep the popup open after a date is picked. */
  keepOpen?: boolean
  "aria-label"?: string
}

/** A field that opens a calendar for one date. */
function DatePicker({
  value,
  defaultValue,
  onValueChange,
  placeholder = "Pick a date",
  formatOptions = { dateStyle: "medium" },
  size,
  keepOpen = false,
  locale,
  className,
  "aria-label": ariaLabel,
  ...calendarProps
}: DatePickerProps) {
  const resolved = useControlSize(size)
  const [open, setOpen] = React.useState(false)
  const [inner, setInner] = React.useState<Date | null>(defaultValue ?? null)
  const date = value !== undefined ? value : inner
  const text = date ? new Intl.DateTimeFormat(locale, formatOptions).format(date) : ""

  return (
    <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
      <PopoverPrimitive.Trigger
        data-slot="date-picker-trigger"
        data-size={resolved}
        data-placeholder={!text || undefined}
        aria-label={ariaLabel}
        className={cn(selectTriggerVariants({ size: resolved }), "min-w-44", className)}
      >
        <CalendarIcon className="text-muted-foreground" />
        <span className={cn("flex-1 truncate text-start tabular-nums", !text && "text-muted-foreground")}>{text || placeholder}</span>
        <ChevronsUpDownIcon className="text-muted-foreground" />
      </PopoverPrimitive.Trigger>
      <PopoverContent data-slot="date-picker-content" align="start" className="w-auto p-1">
        <Calendar
          mode="single"
          value={date}
          locale={locale}
          onValueChange={(d) => {
            if (value === undefined) setInner(d)
            onValueChange?.(d)
            if (d && !keepOpen) setOpen(false)
          }}
          {...calendarProps}
        />
      </PopoverContent>
    </PopoverPrimitive.Root>
  )
}

export { DatePicker }
export type { DatePickerProps }
