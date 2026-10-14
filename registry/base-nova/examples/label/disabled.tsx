import { Input } from "@/registry/base-nova/ui/input"
import { Label } from "@/registry/base-nova/ui/label"

export default function LabelDisabled() {
  return (
    <div data-disabled="true" className="group flex w-full max-w-xs flex-col gap-2">
      <Label htmlFor="label-disabled">Billing email</Label>
      <Input id="label-disabled" disabled defaultValue="billing@example.com" />
    </div>
  )
}
