import { ChromaticTextReveal } from "@/registry/base-nova/ui/chromatic-text-reveal"

export default function ChromaticTextRevealDemo() {
  return (
    <ChromaticTextReveal
      prefix="Components that feel"
      words={["tactile", "springy", "calm", "yours"]}
      className="text-3xl font-semibold tracking-tight"
    />
  )
}
