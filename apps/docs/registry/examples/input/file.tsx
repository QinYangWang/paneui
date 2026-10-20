import { Input } from "@paneui/ui/components/input"
import { Label } from "@paneui/ui/components/label"

export default function InputFile() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-2">
      <Label htmlFor="input-receipt">Receipt</Label>
      <Input id="input-receipt" type="file" accept="image/*,.pdf" />
    </div>
  )
}
