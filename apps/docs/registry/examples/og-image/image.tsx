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

export default function OgImageBackground() {
  return (
    <div className="grid w-full max-w-3xl gap-4 sm:grid-cols-2">
      <Preview title="Summer reading" siteName="Field Notes" date="Jul 4, 2026" image="https://paneui.dev/covers/sky.jpg" />
      <Preview title="Night shift" siteName="Field Notes" mode="dark" image="https://paneui.dev/covers/night.jpg" />
      <Preview title="Designing for desktop density" siteName="Field Notes" pattern="shader" palette="random" />
      <Preview title="One accent, eight roles" siteName="Field Notes" pattern="shader" palette={["#ffffff", "#ff8a3d", "#ffd36e", "#8fd3ff"]} />
    </div>
  )
}
