import { ArrowUpIcon, AttachIcon } from "@paneui/ui/icons"
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupText, InputGroupTextarea } from "@paneui/ui/components/input-group"

export default function InputGroupTextareaExample() {
  return (
    <InputGroup className="max-w-sm">
      <InputGroupTextarea placeholder="Reply to the thread…" aria-label="Reply" />
      <InputGroupAddon align="block-end">
        <InputGroupButton size="icon-xs" aria-label="Attach a file">
          <AttachIcon />
        </InputGroupButton>
        <InputGroupText className="ms-auto">Markdown</InputGroupText>
        <InputGroupButton variant="default" size="icon-xs" aria-label="Send">
          <ArrowUpIcon />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  )
}
