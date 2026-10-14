import { ChromaticTextReveal } from "@/registry/base-nova/ui/chromatic-text-reveal"

export default function ChromaticTextRevealInline() {
  return (
    <p className="max-w-sm text-base text-pretty text-muted-foreground">
      One registry for every surface you ship:{" "}
      <ChromaticTextReveal
        words={["dashboards", "landing pages", "settings"]}
        startOnView={false}
        className="font-medium text-foreground"
      />
    </p>
  )
}
