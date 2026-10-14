import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "h-8 w-full min-w-0 rounded-lg bg-background px-2.5 py-1 text-base shadow-well transition-[box-shadow,background-color] outline-none placeholder:text-muted-foreground/72 file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-ui-sm file:font-medium focus-visible:ring-2 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-64 dark:bg-input/32 aria-invalid:ring-2 aria-invalid:ring-destructive/30 md:text-ui",
        className
      )}
      {...props}
    />
  )
}

export { Input }
