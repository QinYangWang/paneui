import { ChromaticTextReveal } from "@/registry/base-nova/ui/chromatic-text-reveal"

export default function ChromaticTextRevealCustomColors() {
  return (
    <ChromaticTextReveal
      prefix="Status:"
      words={["building", "testing", "deployed"]}
      colors={["var(--warning)", "var(--primary)", "var(--success)"]}
      className="text-2xl font-semibold tracking-tight"
    />
  )
}
