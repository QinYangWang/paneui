import { Label } from "@paneui/ui/components/label"
import { Textarea } from "@paneui/ui/components/textarea"

export default function TextareaDisabled() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-2">
      <Label htmlFor="textarea-disabled">Agent instructions</Label>
      <Textarea id="textarea-disabled" disabled defaultValue="Managed by your workspace admin." />
    </div>
  )
}
