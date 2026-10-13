import { type LightboxItem, MorphingLightbox } from "@/registry/base-nova/ui/morphing-lightbox"

const PHOTOS: LightboxItem[] = [
  { seed: "harbour", alt: "Harbour at dawn", caption: "Harbour at dawn — the first ferry leaves at 6:10." },
  { seed: "alley", alt: "Lantern-lit alley", caption: "The alley behind the hotel, lanterns on by seven." },
  { seed: "ridge", alt: "Mountain ridge", caption: "Ridge walk, day two. Four hours, worth every step." },
  { seed: "market", alt: "Morning market", caption: "Morning market. Go early for the good peaches." },
  { seed: "tram", alt: "Old tram", caption: "Line 28 — sit on the left for the river views." },
  { seed: "garden", alt: "Quiet garden", caption: "A quiet garden ten minutes from the station." },
].map(({ seed, alt, caption }) => ({
  src: `https://picsum.photos/seed/${seed}/800/600`,
  thumbnail: `https://picsum.photos/seed/${seed}/400/300`,
  width: 800,
  height: 600,
  alt,
  caption,
}))

export default function MorphingLightboxDemo() {
  return <MorphingLightbox items={PHOTOS} className="w-full max-w-lg" />
}
