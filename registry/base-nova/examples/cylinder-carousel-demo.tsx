import { CylinderCarousel } from "@/registry/base-nova/ui/cylinder-carousel"

/**
 * Offline placeholder: a small generated landscape (sky, sun, two ridges) as an
 * SVG data URL, so the demo needs no network.
 */
function scene(hue: number, width: number, height: number, seed: number) {
  const ridge = (base: number, amp: number, phase: number) => {
    const points = Array.from({ length: 9 }, (_, i) => {
      const x = (i / 8) * width
      const y = height * (base - amp * Math.abs(Math.sin(i * 1.3 + seed + phase)))
      return `${x.toFixed(0)},${y.toFixed(0)}`
    })
    return `M0,${height} L${points.join(" L")} L${width},${height} Z`
  }
  const sunX = width * (0.25 + ((seed * 0.37) % 0.5))
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><defs><linearGradient id="sky" x2="0" y2="1"><stop offset="0" stop-color="oklch(0.86 0.06 ${hue})"/><stop offset="1" stop-color="oklch(0.95 0.03 ${hue + 40})"/></linearGradient></defs><rect width="100%" height="100%" fill="url(#sky)"/><circle cx="${sunX.toFixed(0)}" cy="${(height * 0.32).toFixed(0)}" r="${(width * 0.09).toFixed(0)}" fill="oklch(0.97 0.05 ${hue + 60})"/><path d="${ridge(0.62, 0.22, 0)}" fill="oklch(0.68 0.08 ${hue + 20})"/><path d="${ridge(0.8, 0.16, 2)}" fill="oklch(0.48 0.09 ${hue + 30})"/></svg>`
  return `data:image/svg+xml,${encodeURIComponent(svg)}`
}

const PLACES = ["kyoto", "lisbon", "oslo", "lima", "hanoi", "porto", "cusco", "seoul", "bergen", "tbilisi"].map(
  (place, i) => ({ place, src: scene((i * 36 + 200) % 360, 400, 500, i + 1) })
)

export default function CylinderCarouselDemo() {
  return (
    <CylinderCarousel label="Trip ideas" className="max-w-2xl" visibleItems={5}>
      {PLACES.map(({ place, src }) => (
        <div key={place} className="relative size-full">
          <img src={src} alt="" draggable={false} className="pointer-events-none size-full object-cover" />
          <span className="absolute inset-x-2 bottom-2 rounded-full bg-card/85 px-2 py-0.5 text-center text-xs font-medium capitalize shadow-chip backdrop-blur">
            {place}
          </span>
        </div>
      ))}
    </CylinderCarousel>
  )
}
