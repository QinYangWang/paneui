import { Outline, type OutlineItem } from "@paneui/ui/components/outline"

const items: OutlineItem[] = [
  { id: "outline-links-overview", title: "Overview", depth: 2 },
  { id: "outline-links-setup", title: "Setup", depth: 2 },
  { id: "outline-links-env", title: "Environment variables", depth: 3 },
]

export default function OutlineRouterLinks() {
  return (
    <Outline
      items={items}
      title="Contents"
      backToTop={false}
      maxHeight="16rem"
      className="w-56"
      // Swap the anchor for your router's link (or a button that scrolls a panel); spread the props onto it.
      renderLink={(props, item) => <a {...props} title={String(item.title)} />}
    />
  )
}
