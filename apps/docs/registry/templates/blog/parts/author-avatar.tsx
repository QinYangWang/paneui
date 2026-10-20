import { cn } from "@paneui/ui/lib/utils"

/** Round initials mark (the library has no Avatar primitive yet). */
export function Avatar({ name, size = "default", className }: { name: string; size?: "sm" | "default" | "lg"; className?: string }) {
  const initials = name
    .split(/\s+/)
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()
  return (
    <span
      aria-hidden
      className={cn(
        "inline-grid shrink-0 place-items-center rounded-full bg-linear-to-b from-primary/20 to-primary/8 font-semibold text-primary shadow-raised",
        size === "sm" && "size-6 text-xs",
        size === "default" && "size-9 text-sm",
        size === "lg" && "size-16 text-xl",
        className
      )}
    >
      {initials}
    </span>
  )
}
