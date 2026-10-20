import { Input } from "@paneui/ui/components/input"
import { Label } from "@paneui/ui/components/label"

export default function InputDemo() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-2">
      <Label htmlFor="email">Email</Label>
      <Input id="email" type="email" placeholder="you@example.com" />
    </div>
  )
}
