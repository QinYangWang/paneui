import { Label } from "@/registry/base-nova/ui/label"
import { Textarea } from "@/registry/base-nova/ui/textarea"

export default function TextareaDisabled() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-2">
      <Label htmlFor="textarea-disabled">Agent instructions</Label>
      <Textarea id="textarea-disabled" disabled defaultValue="Managed by your workspace admin." />
    </div>
  )
}
