import { Outline, type OutlineItem } from "@paneui/ui/components/outline"

const items: OutlineItem[] = [
  { id: "outline-variants-install", title: "Installation", depth: 2 },
  { id: "outline-variants-usage", title: "Usage", depth: 2 },
  { id: "outline-variants-props", title: "Props", depth: 3 },
  { id: "outline-variants-events", title: "Events", depth: 3 },
  { id: "outline-variants-a11y", title: "Accessibility", depth: 2 },
]

const VARIANTS = [
  { variant: "section", label: "section" },
  { variant: "range", label: "range" },
  { variant: "progress", label: "progress" },
] as const

export default function OutlineVariants() {
  return (
    <div className="flex w-full flex-col gap-8">
      <div className="flex flex-wrap gap-6">
        {VARIANTS.map(({ variant, label }) => (
          <div key={variant} className="flex flex-col gap-1">
            <p className="text-ui-sm text-muted-foreground">{label}</p>
            <Outline items={items} title="On this page" variant={variant} backToTop={false} maxHeight="12rem" className="w-44" />
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-3 text-ui text-muted-foreground">
        {items.map((i) => (
          <section key={i.id} className="flex flex-col gap-1">
            <h3 id={i.id} className="font-semibold text-foreground">
              {i.title}
            </h3>
            <p>Scroll the page: the three outlines show the same position in three different ways.</p>
          </section>
        ))}
      </div>
    </div>
  )
}
