import { Label } from "@/registry/base-nova/ui/label"
import { Textarea } from "@/registry/base-nova/ui/textarea"

export default function TextareaInvalid() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-2">
      <Label htmlFor="textarea-invalid">Reason for refund</Label>
      <Textarea id="textarea-invalid" aria-invalid aria-describedby="textarea-invalid-error" />
      <p id="textarea-invalid-error" className="text-xs text-destructive">
        Tell us what went wrong so we can route your request.
      </p>
    </div>
  )
}
