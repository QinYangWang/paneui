import { cn } from "@paneui/ui/lib/utils"

/**
 * The 田 window as a section marker: four quadrants, one filled. Section n fills quadrant n,
 * so the page reads as one window being walked through pane by pane.
 */
export function PaneMark({ index, className }: { index: 0 | 1 | 2 | 3; className?: string }) {
  return (
    <span aria-hidden className={cn("grid size-4 shrink-0 grid-cols-2 gap-0.5 rounded-xs", className)}>
      {[0, 1, 2, 3].map((i) => (
        <span key={i} className={cn("rounded-xs", i === index ? "bg-primary" : "bg-foreground/15")} />
      ))}
    </span>
  )
}

/** Eyebrow above a section title: the quadrant marker, a number and a short label. */
export function Eyebrow({ index, children }: { index: 0 | 1 | 2 | 3; children: React.ReactNode }) {
  return (
    <p className="flex items-center gap-2.5 font-mono text-ui-sm text-muted-foreground uppercase tracking-wider">
      <PaneMark index={index} />
      <span className="tabular-nums">{`0${index + 1}`}</span>
      <span aria-hidden className="h-px w-6 bg-border" />
      <span>{children}</span>
    </p>
  )
}
