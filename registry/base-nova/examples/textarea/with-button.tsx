import { Button } from "@/registry/base-nova/ui/button"
import { Label } from "@/registry/base-nova/ui/label"
import { Textarea } from "@/registry/base-nova/ui/textarea"

export default function TextareaWithButton() {
  return (
    <form className="flex w-full max-w-sm flex-col gap-2">
      <Label htmlFor="textarea-feedback">Feedback</Label>
      <Textarea id="textarea-feedback" placeholder="What should we improve?" />
      <Button type="submit" size="sm" className="self-end">
        Send feedback
      </Button>
    </form>
  )
}
