import { cn } from "@/lib/utils"

/*
 * Generated cover artwork in CSS, so posts need no image files. Every colour
 * is a theme token, so the art follows light and dark. Four compositions.
 * Standalone covers add the image outline (outline-black/10, dark:outline-white/10).
 */
export function CoverArt({ variant, className }: { variant: 0 | 1 | 2 | 3; className?: string }) {
  return (
    <div
      role="img"
      aria-label="Abstract cover illustration"
      className={cn(
        "relative isolate overflow-hidden bg-linear-to-br from-primary/18 via-muted to-background dark:from-primary/25",
        className
      )}
    >
      {variant === 0 && (
        // Nested rounded squares, drawn concentric: 32 = 16 + 16, 16 = 10 + 6.
        <div className="absolute inset-0 grid place-items-center">
          <div className="grid size-3/5 max-w-72 place-items-center rounded-4xl bg-card/70 p-4 shadow-surface">
            <div className="grid size-full place-items-center rounded-xl bg-primary/14 p-1.5 shadow-well">
              <div className="size-full rounded-md bg-primary shadow-primary" />
            </div>
          </div>
        </div>
      )}
      {variant === 1 && (
        // Staggered pills easing in.
        <div className="absolute inset-0 flex flex-col justify-center gap-3 px-12">
          {[90, 72, 56, 40].map((w, i) => (
            <div
              key={w}
              className={cn(
                "h-6 rounded-full shadow-raised",
                i === 0 ? "w-11/12 bg-primary" : i === 1 ? "w-9/12 bg-primary/60" : i === 2 ? "w-7/12 bg-primary/35" : "w-5/12 bg-card"
              )}
            />
          ))}
        </div>
      )}
      {variant === 2 && (
        // A lightness ramp of one hue.
        <div className="absolute inset-0 flex items-end gap-2 px-10 pb-10">
          {["h-1/5 bg-primary/10", "h-2/5 bg-primary/25", "h-3/5 bg-primary/45", "h-4/5 bg-primary/70", "h-11/12 bg-primary", "h-3/4 bg-foreground/80"].map((c) => (
            <div key={c} className={cn("flex-1 rounded-xl shadow-raised", c)} />
          ))}
        </div>
      )}
      {variant === 3 && (
        // Fixed-width digits.
        <div className="absolute inset-0 grid place-items-center">
          <div className="flex gap-2 font-mono text-5xl font-semibold text-primary tabular-nums sm:text-6xl">
            {["1", "0", "4", "8"].map((d, i) => (
              <span key={i} className="grid h-20 w-14 place-items-center rounded-2xl bg-card/80 shadow-raised sm:h-24 sm:w-16">
                {d}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
