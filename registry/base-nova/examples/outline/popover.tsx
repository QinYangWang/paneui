import { OutlinePopover, type OutlineItem } from "@/registry/base-nova/ui/outline"

const items: OutlineItem[] = [
  { id: "outline-popover-install", title: "Installation", depth: 2 },
  { id: "outline-popover-usage", title: "Usage", depth: 2 },
  { id: "outline-popover-props", title: "Props", depth: 3 },
  { id: "outline-popover-a11y", title: "Accessibility", depth: 2 },
]

export default function OutlinePopoverExample() {
  return <OutlinePopover items={items} className="w-full max-w-sm" />
}
