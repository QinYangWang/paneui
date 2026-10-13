"use client"

import * as React from "react"

import { WheelPicker, WheelPickerGroup } from "@/registry/base-nova/ui/wheel-picker"

const hours = Array.from({ length: 12 }, (_, i) => String(i + 1))
const minutes = Array.from({ length: 12 }, (_, i) => String(i * 5).padStart(2, "0"))
const periods = ["AM", "PM"]

export default function WheelPickerDemo() {
  const [hour, setHour] = React.useState("7")
  const [minute, setMinute] = React.useState("30")
  const [period, setPeriod] = React.useState("AM")

  return (
    <div className="flex w-64 flex-col items-center gap-3">
      <WheelPickerGroup className="w-full">
        <WheelPicker aria-label="Hour" options={hours} value={hour} onValueChange={setHour} />
        <WheelPicker aria-label="Minute" options={minutes} value={minute} onValueChange={setMinute} />
        <WheelPicker aria-label="AM or PM" options={periods} value={period} onValueChange={setPeriod} />
      </WheelPickerGroup>
      <p className="text-sm text-muted-foreground">
        Alarm set for{" "}
        <span className="font-medium text-foreground tabular-nums">
          {hour}:{minute} {period}
        </span>
      </p>
    </div>
  )
}
