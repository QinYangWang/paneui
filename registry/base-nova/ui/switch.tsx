"use client"

import { Switch as SwitchPrimitive } from "@base-ui/react/switch"

import { cn } from "@/lib/utils"

function Switch({ className, ...props }: SwitchPrimitive.Root.Props) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "peer group/switch relative inline-flex h-5 w-8 shrink-0 cursor-pointer items-center rounded-full bg-foreground/16 p-0.5 transition-[background-color,box-shadow] duration-200 outline-none focus-visible:ring-2 focus-visible:ring-ring/50 data-checked:bg-primary data-checked:shadow-none data-disabled:cursor-not-allowed data-disabled:opacity-64",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className="pointer-events-none block size-4 rounded-full bg-background shadow-raised transition-transform duration-200 ease-out data-checked:translate-x-3 dark:bg-foreground dark:data-checked:bg-background"
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
