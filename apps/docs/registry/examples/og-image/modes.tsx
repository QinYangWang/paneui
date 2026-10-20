import { OG_IMAGE_HEIGHT, OG_IMAGE_WIDTH, OgImage, type OgImageProps } from "@paneui/ui/components/og-image"

function Preview(props: OgImageProps) {
  return (
    <div className="overflow-hidden rounded-xl shadow-raised">
      <svg viewBox={`0 0 ${OG_IMAGE_WIDTH} ${OG_IMAGE_HEIGHT}`} role="img" aria-label={props.title} className="block h-auto w-full">
        <foreignObject width={OG_IMAGE_WIDTH} height={OG_IMAGE_HEIGHT}>
          <OgImage {...props} />
        </foreignObject>
      </svg>
    </div>
  )
}

export default function OgImageModes() {
  return (
    <div className="grid w-full max-w-3xl gap-4 sm:grid-cols-2">
      <Preview title="One accent, eight roles" siteName="Field Notes" date="Sep 2, 2026" accent="green" />
      <Preview title="One accent, eight roles" siteName="Field Notes" date="Sep 2, 2026" accent="green" mode="dark" />
      <Preview title="Small websites" siteName="Field Notes" tags={["web"]} accent="rose" />
      <Preview title="Small websites" siteName="Field Notes" tags={["web"]} accent="neutral" mode="dark" />
    </div>
  )
}
