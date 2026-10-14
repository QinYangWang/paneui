import { ArrowRightIcon } from "@/components/icons"
import { Button } from "@/registry/base-nova/ui/button"

export default function ButtonAsLink() {
  return (
    <Button variant="secondary" nativeButton={false} render={<a href="#api-reference" />}>
      API reference
      <ArrowRightIcon data-icon="inline-end" />
    </Button>
  )
}
