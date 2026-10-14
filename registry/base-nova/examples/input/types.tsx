import { Input } from "@/registry/base-nova/ui/input"
import { Label } from "@/registry/base-nova/ui/label"

export default function InputTypes() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="input-password">Password</Label>
        <Input id="input-password" type="password" defaultValue="correct-horse" />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="input-number">Guests</Label>
        <Input id="input-number" type="number" min={1} max={8} defaultValue={2} />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="input-date">Check-in</Label>
        <Input id="input-date" type="date" defaultValue="2026-11-12" />
      </div>
    </div>
  )
}
