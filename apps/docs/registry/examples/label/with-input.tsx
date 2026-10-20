import { Input } from "@paneui/ui/components/input"
import { Label } from "@paneui/ui/components/label"

export default function LabelWithInput() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-2">
      <Label htmlFor="label-full-name">Full name</Label>
      <Input id="label-full-name" autoComplete="name" placeholder="Dana Reyes" />
    </div>
  )
}
