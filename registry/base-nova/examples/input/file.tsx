import { Input } from "@/registry/base-nova/ui/input"
import { Label } from "@/registry/base-nova/ui/label"

export default function InputFile() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-2">
      <Label htmlFor="input-receipt">Receipt</Label>
      <Input id="input-receipt" type="file" accept="image/*,.pdf" />
    </div>
  )
}
