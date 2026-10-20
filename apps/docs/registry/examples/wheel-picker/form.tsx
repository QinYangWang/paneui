"use client"

import * as React from "react"

import { Button } from "@paneui/ui/components/button"
import { WheelPicker, WheelPickerGroup } from "@paneui/ui/components/wheel-picker"

const hours = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, "0"))
const minutes = ["00", "15", "30", "45"]

export default function WheelPickerForm() {
  const [saved, setSaved] = React.useState<string | null>(null)

  return (
    <form
      className="flex w-56 flex-col items-center gap-3"
      onSubmit={(event) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget)
        setSaved(`${data.get("hour")}:${data.get("minute")}`)
      }}
    >
      <WheelPickerGroup className="w-full" visibleCount={3}>
        <WheelPicker aria-label="Hour" name="hour" options={hours} defaultValue="22" />
        <WheelPicker aria-label="Minute" name="minute" options={minutes} defaultValue="30" />
      </WheelPickerGroup>
      <Button type="submit" size="sm" className="w-full">
        Set quiet hours
      </Button>
      <p className="text-xs text-muted-foreground">{saved ? `Quiet from ${saved}` : "Not saved yet"}</p>
    </form>
  )
}
