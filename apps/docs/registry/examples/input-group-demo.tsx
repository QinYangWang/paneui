import { ArrowUpIcon, SearchIcon } from "@paneui/ui/icons"
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput, InputGroupText } from "@paneui/ui/components/input-group"
import { Kbd } from "@paneui/ui/components/kbd"

export default function InputGroupDemo() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-3">
      <InputGroup>
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
        <InputGroupInput placeholder="Search issues" aria-label="Search issues" />
        <InputGroupAddon align="inline-end">
          <Kbd>⌘K</Kbd>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupAddon>
          <InputGroupText>https://</InputGroupText>
        </InputGroupAddon>
        <InputGroupInput placeholder="acme.dev" aria-label="Domain" />
        <InputGroupAddon align="inline-end">
          <InputGroupButton variant="secondary">Verify</InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput placeholder="Ask anything" aria-label="Message" />
        <InputGroupAddon align="inline-end">
          <InputGroupButton variant="default" size="icon-xs" aria-label="Send">
            <ArrowUpIcon />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}
