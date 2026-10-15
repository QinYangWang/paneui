import { ChevronLeftIcon, ChevronRightIcon } from "@/components/icons"
import { Button } from "@/registry/base-nova/ui/button"
import { ButtonGroup } from "@/registry/base-nova/ui/button-group"

export default function ButtonGroupNested() {
  return (
    <ButtonGroup aria-label="Pages">
      <ButtonGroup>
        <Button variant="outline" size="icon-sm" aria-label="Previous page">
          <ChevronLeftIcon />
        </Button>
        <Button variant="outline" size="icon-sm" aria-label="Next page">
          <ChevronRightIcon />
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
