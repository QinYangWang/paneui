import { cn } from "@/lib/utils"

/** Round initials mark (the library has no Avatar primitive yet). */
export function Avatar({ name, size = "default", className }: { name: string; size?: "sm" | "default"; className?: string }) {
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
        "inline-grid shrink-0 place-items-center rounded-full bg-primary/12 font-semibold text-primary shadow-chip",
        size === "sm" ? "size-6 text-xs" : "size-8 text-xs",
        className
      )}
    >
      {initials}
    </span>
  )
}
