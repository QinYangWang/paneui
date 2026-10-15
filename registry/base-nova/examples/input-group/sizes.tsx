import { SearchIcon } from "@/components/icons"
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/registry/base-nova/ui/input-group"

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
