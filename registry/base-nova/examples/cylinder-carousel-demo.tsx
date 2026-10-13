import { CylinderCarousel } from "@/registry/base-nova/ui/cylinder-carousel"

const PLACES = ["kyoto", "lisbon", "oslo", "lima", "hanoi", "porto", "cusco", "seoul", "bergen", "tbilisi"]

export default function CylinderCarouselDemo() {
  return (
    <CylinderCarousel label="Trip ideas" className="max-w-2xl" visibleItems={5}>
      {PLACES.map((place) => (
        <div key={place} className="relative size-full">
          <img
            src={`https://picsum.photos/seed/${place}/400/500`}
            alt=""
            draggable={false}
            className="pointer-events-none size-full object-cover"
          />
          <span className="absolute inset-x-2 bottom-2 rounded-full bg-card/85 px-2 py-0.5 text-center text-xs font-medium capitalize shadow-chip backdrop-blur">
            {place}
          </span>
        </div>
      ))}
    </CylinderCarousel>
  )
}
