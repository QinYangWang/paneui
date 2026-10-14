import { ExpandingArrowButton } from "@/registry/base-nova/ui/expanding-arrow-button"

export default function ExpandingArrowButtonAsLink() {
  return (
    <ExpandingArrowButton nativeButton={false} render={<a href="#pricing" />}>
      See pricing plans
    </ExpandingArrowButton>
  )
}
