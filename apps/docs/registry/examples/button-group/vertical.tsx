import { MinusIcon, PlusIcon } from "@paneui/ui/icons"
import { Button } from "@paneui/ui/components/button"
import { ButtonGroup } from "@paneui/ui/components/button-group"

export default function ButtonGroupVertical() {
  return (
    <ButtonGroup orientation="vertical" aria-label="Zoom">
      <Button variant="outline" size="icon" aria-label="Zoom in">
        <PlusIcon />
      </Button>
      <Button variant="outline" size="icon" aria-label="Zoom out">
        <MinusIcon />
      </Button>
    </ButtonGroup>
  )
}
