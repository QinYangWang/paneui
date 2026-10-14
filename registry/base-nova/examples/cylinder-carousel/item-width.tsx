import { CylinderCarousel } from "@/registry/base-nova/ui/cylinder-carousel"

const STORIES = ["You", "Mina", "Leo", "Ava", "Sam", "Noor", "Kai", "Rio", "Elle"]

export default function CylinderCarouselItemWidth() {
  return (
    <CylinderCarousel
      label="Stories"
      itemWidth={96}
      aspectRatio={1.6}
      visibleItems={7}
      dragSpeed={2}
      defaultIndex={2}
      className="max-w-2xl"
    >
      {STORIES.map((name) => (
        <div key={name} className="flex size-full items-end bg-linear-to-b from-muted to-primary/30 p-2">
          <p className="text-xs font-medium text-foreground">{name}</p>
        </div>
      ))}
    </CylinderCarousel>
  )
}
