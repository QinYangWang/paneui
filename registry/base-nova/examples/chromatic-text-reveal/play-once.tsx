import { ChromaticTextReveal } from "@/registry/base-nova/ui/chromatic-text-reveal"

export default function ChromaticTextRevealPlayOnce() {
  return (
    <ChromaticTextReveal
      prefix="Shipped in"
      words={["minutes", "seconds", "one click"]}
      loop={false}
      className="text-2xl font-semibold tracking-tight"
    />
  )
}
