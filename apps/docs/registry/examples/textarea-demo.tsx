import { Label } from "@paneui/ui/components/label"
import { Textarea } from "@paneui/ui/components/textarea"

export default function TextareaDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-2">
      <Label htmlFor="note">Note</Label>
      <Textarea id="note" placeholder="Anything the agent should know?" />
    </div>
  )
}
