import { SearchIcon } from "@paneui/ui/icons"
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@paneui/ui/components/input-group"

export default function InputGroupSizes() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-3">
      {(["xs", "sm", "default", "lg"] as const).map((size) => (
        <InputGroup key={size} size={size}>
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
          <InputGroupInput placeholder={`Search (${size})`} aria-label={`Search ${size}`} />
          <InputGroupAddon align="inline-end">
            <InputGroupButton>Go</InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      ))}
    </div>
  )
}
