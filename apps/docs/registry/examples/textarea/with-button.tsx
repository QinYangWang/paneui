import { Button } from "@paneui/ui/components/button"
import { Label } from "@paneui/ui/components/label"
import { Textarea } from "@paneui/ui/components/textarea"

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
