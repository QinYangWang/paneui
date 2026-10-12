import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button relative inline-flex shrink-0 cursor-pointer items-center justify-center rounded-full text-sm font-medium whitespace-nowrap transition-[box-shadow,background-color,color,transform] duration-150 outline-none select-none focus-visible:ring-3 focus-visible:ring-ring active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:ring-3 aria-invalid:ring-destructive/30 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-primary bg-linear-to-b from-white/14 to-transparent text-primary-foreground shadow-primary text-shadow-[0_1px_0_rgb(0_0_0/0.15)] hover:from-white/20 active:from-transparent active:shadow-pressed",
        secondary:
          "bg-secondary bg-linear-to-b from-white/4 to-transparent text-secondary-foreground shadow-raised hover:shadow-raised-hover active:from-transparent active:shadow-pressed",
        outline:
          "bg-transparent text-foreground shadow-[inset_0_0_0_1px_var(--input)] hover:bg-muted active:shadow-pressed",
        ghost: "text-foreground hover:bg-muted active:shadow-pressed aria-expanded:bg-muted",
        destructive:
          "bg-destructive bg-linear-to-b from-white/14 to-transparent text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.25),0_0_0_1px_color-mix(in_oklch,var(--destructive),black_20%),0_1px_2px_rgb(0_0_0/0.3)] hover:from-white/20 active:shadow-pressed",
        link: "rounded-md text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 gap-1.5 px-4 has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3",
        xs: "h-6 gap-1 px-2.5 text-xs [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 gap-1.5 px-3.5 text-[0.8rem] [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-10 gap-2 px-5 text-[0.95rem]",
        icon: "size-9",
        "icon-xs": "size-6 [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
