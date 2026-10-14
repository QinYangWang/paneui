import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

// The theme adds a native 13px type scale (text-ui-2xs … text-ui-lg). Teach tailwind-merge
// that these are font sizes, so `cn("text-ui", "text-muted-foreground")` keeps both.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: ["ui", "ui-lg", "ui-sm", "ui-xs", "ui-2xs"] }],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
