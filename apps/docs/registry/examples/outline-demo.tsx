import { Outline, type OutlineItem } from "@paneui/ui/components/outline"

const items: OutlineItem[] = [
  { id: "outline-demo-install", title: "Installation", depth: 2 },
  { id: "outline-demo-usage", title: "Usage", depth: 2 },
  { id: "outline-demo-props", title: "Props", depth: 3 },
  { id: "outline-demo-events", title: "Events", depth: 3 },
  { id: "outline-demo-a11y", title: "Accessibility", depth: 2 },
]

export default function OutlineDemo() {
  return (
    <div className="flex w-full max-w-xl gap-8">
      <div className="flex min-w-0 flex-1 flex-col gap-3 text-ui text-muted-foreground">
        {items.map((i) => (
          <section key={i.id} className="flex flex-col gap-1">
            <h3 id={i.id} className="font-semibold text-foreground">
              {i.title}
            </h3>
            <p>Scroll the page and the line beside the outline follows the section you are reading.</p>
          </section>
        ))}
      </div>
      <Outline items={items} backToTop={false} maxHeight="20rem" className="w-48 shrink-0" />
    </div>
  )
}
