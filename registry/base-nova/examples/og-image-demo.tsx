import { OG_IMAGE_HEIGHT, OG_IMAGE_WIDTH, OgImage } from "@/registry/base-nova/ui/og-image"

/** The card at its real 1200×630 size, scaled down by the SVG view box. */
export default function OgImageDemo() {
  return (
    <div className="w-full max-w-2xl overflow-hidden rounded-xl shadow-raised">
      <svg viewBox={`0 0 ${OG_IMAGE_WIDTH} ${OG_IMAGE_HEIGHT}`} role="img" aria-label="Share card preview" className="block h-auto w-full">
        <foreignObject width={OG_IMAGE_WIDTH} height={OG_IMAGE_HEIGHT}>
          <OgImage
            title="Designing for desktop density"
            description="Why a compact type scale and alpha hairlines keep dense screens calm."
            siteName="Field Notes"
            author="Mira Chen"
            date="Oct 17, 2026"
            tags={["design", "type"]}
          />
        </foreignObject>
      </svg>
    </div>
  )
}
