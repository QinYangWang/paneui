import { Label } from "@/registry/base-nova/ui/label"
import { Textarea } from "@/registry/base-nova/ui/textarea"

export default function TextareaDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-2">
      <Label htmlFor="note">Note</Label>
      <Textarea id="note" placeholder="Anything the agent should know?" />
    </div>
  )
}
