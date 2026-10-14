import { ChromaticTextReveal } from "@/registry/base-nova/ui/chromatic-text-reveal"

export default function ChromaticTextRevealTiming() {
  return (
    <div className="flex flex-col items-start gap-4">
      <ChromaticTextReveal
        prefix="Fast:"
        words={["draft", "review", "merge"]}
        duration={0.5}
        pauseDuration={0.9}
        className="text-xl font-semibold tracking-tight"
      />
      <ChromaticTextReveal
        prefix="Slow:"
        words={["breathe", "focus", "begin"]}
        duration={1.6}
        pauseDuration={3}
        className="text-xl font-semibold tracking-tight"
      />
    </div>
  )
}
