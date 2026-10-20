import { ChevronLeftIcon, ChevronRightIcon } from "@paneui/ui/icons"
import { Button } from "@paneui/ui/components/button"
import { ButtonGroup } from "@paneui/ui/components/button-group"

export default function ButtonGroupNested() {
  return (
    <ButtonGroup aria-label="Pages">
      <ButtonGroup>
        <Button variant="outline" size="icon-sm" aria-label="Previous page">
          <ChevronLeftIcon className="rtl:-scale-x-100" />
        </Button>
        <Button variant="outline" size="icon-sm" aria-label="Next page">
          <ChevronRightIcon className="rtl:-scale-x-100" />
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="outline" size="sm">
          1
        </Button>
        <Button variant="outline" size="sm">
          2
        </Button>
        <Button variant="outline" size="sm">
          3
        </Button>
      </ButtonGroup>
    </ButtonGroup>
  )
}
