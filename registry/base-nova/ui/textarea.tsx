import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex field-sizing-content min-h-16 w-full rounded-lg bg-background px-2.5 py-1.5 text-base shadow-well transition-[box-shadow,background-color] outline-none placeholder:text-muted-foreground/72 focus-visible:ring-2 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-64 dark:bg-input/32 aria-invalid:ring-2 aria-invalid:ring-destructive/30 md:text-ui",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
