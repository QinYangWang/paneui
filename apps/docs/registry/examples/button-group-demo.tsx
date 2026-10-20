import { ChevronDownIcon, MinusIcon, PlusIcon } from "@paneui/ui/icons"
import { Button } from "@paneui/ui/components/button"
import { ButtonGroup, ButtonGroupSeparator, ButtonGroupText } from "@paneui/ui/components/button-group"
import { Input } from "@paneui/ui/components/input"

export default function ButtonGroupDemo() {
  return (
    <div className="flex flex-col items-center gap-4">
      <ButtonGroup aria-label="Text alignment">
        <Button variant="outline">Left</Button>
        <Button variant="outline">Center</Button>
        <Button variant="outline">Right</Button>
      </ButtonGroup>
      <ButtonGroup aria-label="Deploy">
        <Button>Deploy</Button>
        <ButtonGroupSeparator />
        <Button size="icon" aria-label="Deploy options">
          <ChevronDownIcon />
        </Button>
      </ButtonGroup>
      <ButtonGroup aria-label="Seats">
        <ButtonGroupText>Seats</ButtonGroupText>
        <Input defaultValue="8" aria-label="Seats" className="w-14 text-center" />
        <Button variant="outline" size="icon" aria-label="Remove a seat">
          <MinusIcon />
        </Button>
        <Button variant="outline" size="icon" aria-label="Add a seat">
          <PlusIcon />
        </Button>
      </ButtonGroup>
    </div>
  )
}
