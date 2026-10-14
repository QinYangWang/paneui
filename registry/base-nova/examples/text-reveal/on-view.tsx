import { TextReveal } from "@/registry/base-nova/ui/text-reveal"

export default function TextRevealOnView() {
  return (
    <div className="h-56 w-full max-w-md overflow-y-auto overscroll-contain rounded-2xl bg-muted/50 px-6 shadow-well">
      <div className="flex h-72 items-end pb-4 text-sm text-muted-foreground">Scroll down inside this box ↓</div>
      <TextReveal
        as="h3"
        trigger="view"
        once={false}
        text="Plays each time it scrolls into view."
        className="mb-24 text-2xl font-semibold tracking-tight text-balance"
      />
    </div>
  )
}
