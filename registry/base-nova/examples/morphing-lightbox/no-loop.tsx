import { type LightboxItem, MorphingLightbox } from "@/registry/base-nova/ui/morphing-lightbox"

/** Offline placeholder: a soft two-stop gradient as an SVG data URL. */
function placeholder(hue: number, w = 800, h = 600) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}"><defs><linearGradient id="g" x2="1" y2="1"><stop offset="0" stop-color="oklch(0.8 0.08 ${hue})"/><stop offset="1" stop-color="oklch(0.55 0.12 ${hue + 40})"/></linearGradient></defs><rect width="100%" height="100%" fill="url(#g)"/></svg>`
  return `data:image/svg+xml,${encodeURIComponent(svg)}`
}

const STEPS: LightboxItem[] = [
  { alt: "Step 1: unbox the kit", caption: "Step 1 — Unbox the kit and lay out the parts.", hue: 258 },
  { alt: "Step 2: attach the base", caption: "Step 2 — Attach the base with the four short screws.", hue: 200 },
  { alt: "Step 3: fit the shelf", caption: "Step 3 — Fit the shelf; it clicks when it's level.", hue: 150 },
  { alt: "Step 4: done", caption: "Step 4 — Done. Tighten everything once more after a week.", hue: 90 },
].map(({ hue, ...rest }) => ({ ...rest, src: placeholder(hue), width: 800, height: 600 }))

export default function MorphingLightboxNoLoop() {
  return <MorphingLightbox items={STEPS} loop={false} className="w-full max-w-lg" />
}
