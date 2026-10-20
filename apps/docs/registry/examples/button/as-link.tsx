import { ArrowRightIcon } from "@paneui/ui/icons"
import { Button } from "@paneui/ui/components/button"

export default function ButtonAsLink() {
  return (
    <Button variant="secondary" nativeButton={false} render={<a href="#api-reference" />}>
      API reference
      <ArrowRightIcon className="rtl:-scale-x-100" data-icon="inline-end" />
    </Button>
  )
}
