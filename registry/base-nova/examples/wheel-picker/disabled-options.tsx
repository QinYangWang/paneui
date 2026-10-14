"use client"

import * as React from "react"

import { WheelPicker, type WheelPickerOption } from "@/registry/base-nova/ui/wheel-picker"

const slots: WheelPickerOption[] = [
  { value: "09:00", label: "9:00 AM" },
  { value: "10:00", label: "10:00 AM", disabled: true },
  { value: "11:00", label: "11:00 AM" },
  { value: "13:00", label: "1:00 PM", disabled: true },
  { value: "14:00", label: "2:00 PM" },
  { value: "15:00", label: "3:00 PM" },
  { value: "16:00", label: "4:00 PM", disabled: true },
]

export default function WheelPickerDisabledOptions() {
  const [slot, setSlot] = React.useState("11:00")

  return (
    <div className="flex w-48 flex-col items-center gap-3">
      <WheelPicker aria-label="Appointment time" options={slots} value={slot} onValueChange={setSlot} className="w-full" />
      <p className="text-sm text-muted-foreground">
        Booked for <span className="font-medium text-foreground tabular-nums">{slot}</span>
      </p>
    </div>
  )
}
