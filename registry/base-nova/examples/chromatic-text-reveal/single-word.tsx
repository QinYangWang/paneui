import { ChromaticTextReveal } from "@/registry/base-nova/ui/chromatic-text-reveal"

export default function ChromaticTextRevealSingleWord() {
  return (
    <h2 className="text-4xl font-semibold tracking-tight text-balance">
      <ChromaticTextReveal words={["Launch week"]} delay={0.3} />
    </h2>
  )
}
