import { type LightboxItem, MorphingLightbox } from "@/registry/base-nova/ui/morphing-lightbox"

/** Offline placeholder: a soft two-stop gradient as an SVG data URL. */
function placeholder(hue: number, w: number, h: number) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}"><defs><linearGradient id="g" x2="1" y2="1"><stop offset="0" stop-color="oklch(0.85 0.06 ${hue})"/><stop offset="1" stop-color="oklch(0.6 0.13 ${hue + 30})"/></linearGradient></defs><rect width="100%" height="100%" fill="url(#g)"/></svg>`
  return `data:image/svg+xml,${encodeURIComponent(svg)}`
}

const PRODUCTS: LightboxItem[] = [
  { alt: "Linen shirt, front", hue: 60, w: 600, h: 800 },
  { alt: "Linen shirt, back", hue: 70, w: 600, h: 800 },
  { alt: "Collar detail", hue: 80, w: 800, h: 800 },
  { alt: "Fabric close-up", hue: 90, w: 800, h: 600 },
].map(({ hue, w, h, alt }) => ({ alt, src: placeholder(hue, w, h), width: w, height: h }))

export default function MorphingLightboxSquareThumbnails() {
  return (
    <MorphingLightbox
      items={PRODUCTS}
      className="w-full max-w-md grid-cols-4 sm:grid-cols-4"
      thumbnailClassName="aspect-square"
    />
  )
}
