"use client"

import { Switch as SwitchPrimitive } from "@base-ui/react/switch"

import { cn } from "@/lib/utils"

function Switch({ className, ...props }: SwitchPrimitive.Root.Props) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "peer group/switch relative inline-flex h-6 w-10 shrink-0 cursor-pointer items-center rounded-full bg-muted p-0.5 shadow-well transition-[background-color,box-shadow] duration-200 outline-none focus-visible:ring-3 focus-visible:ring-ring data-checked:bg-primary data-checked:shadow-none data-disabled:cursor-not-allowed data-disabled:opacity-50",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className="pointer-events-none block size-5 rounded-full bg-background shadow-raised transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-active/switch:scale-x-110 data-checked:translate-x-4"
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
