import { Input } from "@/registry/base-nova/ui/input"
import { Label } from "@/registry/base-nova/ui/label"

export default function LabelWithInput() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-2">
      <Label htmlFor="label-full-name">Full name</Label>
      <Input id="label-full-name" autoComplete="name" placeholder="Dana Reyes" />
    </div>
  )
}
