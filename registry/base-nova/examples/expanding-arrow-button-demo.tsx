import { ExpandingArrowButton } from "@/registry/base-nova/ui/expanding-arrow-button"

export default function ExpandingArrowButtonDemo() {
  return (
    <div className="flex flex-col items-center gap-3">
      <ExpandingArrowButton>Continue to checkout</ExpandingArrowButton>
      <ExpandingArrowButton accentClassName="bg-success shadow-none text-white">
        Open the dashboard
      </ExpandingArrowButton>
    </div>
  )
}
