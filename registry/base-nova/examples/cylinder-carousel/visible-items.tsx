import { CylinderCarousel } from "@/registry/base-nova/ui/cylinder-carousel"

const ALBUMS = [
  { title: "Night Drive", artist: "Halcyon" },
  { title: "Paper Moons", artist: "Ilse Mar" },
  { title: "Low Tide", artist: "The Quays" },
  { title: "Glasshouse", artist: "Ondine" },
  { title: "North Line", artist: "Fen" },
  { title: "Slow Bloom", artist: "Marlowe" },
]

const TINTS = ["bg-primary/20", "bg-success/20", "bg-warning/20", "bg-destructive/15", "bg-accent", "bg-secondary"]

export default function CylinderCarouselVisibleItems() {
  return (
    <CylinderCarousel label="Albums" visibleItems={3} aspectRatio={1} className="max-w-xl">
      {ALBUMS.map((a, i) => (
        <div key={a.title} className={`flex size-full flex-col justify-end gap-0.5 p-4 ${TINTS[i % TINTS.length]}`}>
          <p className="text-sm font-semibold tracking-tight text-foreground">{a.title}</p>
          <p className="text-xs text-muted-foreground">{a.artist}</p>
        </div>
      ))}
    </CylinderCarousel>
  )
}
