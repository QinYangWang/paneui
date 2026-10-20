"use client"

import * as React from "react"

import { Checkbox } from "@paneui/ui/components/checkbox"
import { Label } from "@paneui/ui/components/label"

const channels = ["Email", "Push", "SMS"]

export default function CheckboxDemo() {
  const [selected, setSelected] = React.useState<string[]>(["Email"])
  const all = selected.length === channels.length
  const some = selected.length > 0 && !all

  return (
    <div className="flex flex-col gap-3">
      <Label className="gap-3">
        <Checkbox
          checked={all}
          indeterminate={some}
          onCheckedChange={(checked) => setSelected(checked ? channels : [])}
        />
        Notify me everywhere
      </Label>
      <div className="flex flex-col gap-3 pl-7">
        {channels.map((channel) => (
          <Label key={channel} className="gap-3 font-normal">
            <Checkbox
              checked={selected.includes(channel)}
              onCheckedChange={(checked) =>
                setSelected((prev) => (checked ? [...prev, channel] : prev.filter((c) => c !== channel)))
              }
            />
            {channel}
          </Label>
        ))}
      </div>
      <Label className="gap-3">
        <Checkbox disabled defaultChecked />
        Security alerts (always on)
      </Label>
    </div>
  )
}
