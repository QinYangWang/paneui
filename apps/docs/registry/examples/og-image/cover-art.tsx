import { OG_IMAGE_HEIGHT, OG_IMAGE_WIDTH, OgCoverArt } from "@paneui/ui/components/og-image"

const SLUGS = ["designing-for-desktop-density", "one-accent-eight-roles"]

export default function OgImageCoverArt() {
  return (
    <div className="grid w-full max-w-3xl gap-4 sm:grid-cols-2">
      {SLUGS.map((slug) => (
        <div key={slug} className="overflow-hidden rounded-xl shadow-raised">
          <svg viewBox={`0 0 ${OG_IMAGE_WIDTH} ${OG_IMAGE_HEIGHT}`} role="img" aria-label={`Cover for ${slug}`} className="block h-auto w-full">
            <foreignObject width={OG_IMAGE_WIDTH} height={OG_IMAGE_HEIGHT}>
              <OgCoverArt seed={slug} />
            </foreignObject>
          </svg>
        </div>
      ))}
      <div className="overflow-hidden rounded-xl shadow-raised">
        <svg viewBox={`0 0 ${OG_IMAGE_WIDTH} ${OG_IMAGE_HEIGHT}`} role="img" aria-label="Image cover" className="block h-auto w-full">
          <foreignObject width={OG_IMAGE_WIDTH} height={OG_IMAGE_HEIGHT}>
            <OgCoverArt image="https://paneui.dev/covers/night.jpg" />
          </foreignObject>
        </svg>
      </div>
      <div className="overflow-hidden rounded-xl shadow-raised">
        <svg viewBox={`0 0 ${OG_IMAGE_WIDTH} ${OG_IMAGE_HEIGHT}`} role="img" aria-label="Custom palette cover" className="block h-auto w-full">
          <foreignObject width={OG_IMAGE_WIDTH} height={OG_IMAGE_HEIGHT}>
            <OgCoverArt palette={["#fff4e6", "#ff8a3d", "#ffd36e", "#8fd3ff"]} />
          </foreignObject>
        </svg>
      </div>
    </div>
  )
}
