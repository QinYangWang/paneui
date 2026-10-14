"use client"

import * as React from "react"
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog"

import { XIcon } from "@/components/icons"
import { cn } from "@/lib/utils"

/*
 * A modal whose full-size surface unfolds from its exact centre out to its
 * edges: the panel is laid out at final size and clipped to a small rounded
 * seed in the middle, which then opens to the whole rectangle. Content settles
 * in just behind the edges. Closing folds it back to the centre. Reduced motion
 * swaps the unfold for a plain fade. Base UI Dialog handles focus, Escape,
 * scroll lock and ARIA.
 */

const CenterMorphModal = DialogPrimitive.Root
const CenterMorphModalTrigger = DialogPrimitive.Trigger
const CenterMorphModalClose = DialogPrimitive.Close

function CenterMorphModalContent({
  className,
  children,
  showCloseButton = true,
  backdropClassName,
  ...props
}: DialogPrimitive.Popup.Props & {
  showCloseButton?: boolean
  backdropClassName?: string
  children?: React.ReactNode
}) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Backdrop
        data-slot="center-morph-modal-backdrop"
        className={cn(
          "fixed inset-0 z-50 bg-black/40 backdrop-blur-[3px] transition-opacity duration-300 data-ending-style:opacity-0 data-ending-style:duration-200 data-starting-style:opacity-0",
          backdropClassName
        )}
      />
      <DialogPrimitive.Popup
        data-slot="center-morph-modal-content"
        className={cn(
          "group/morph fixed top-1/2 left-1/2 z-50 flex w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 flex-col gap-4 rounded-3xl bg-popover p-6 text-popover-foreground shadow-surface outline-none",
          "[--morph-open:inset(0_round_var(--radius-3xl,1.5rem))] [--morph-seed:inset(calc(50%_-_1.25rem)_calc(50%_-_1.25rem)_round_var(--radius-3xl,1.5rem))]",
          "[clip-path:var(--morph-open)] transition-[clip-path,opacity,box-shadow] [transition-duration:550ms,220ms,550ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
          "data-starting-style:opacity-0 data-starting-style:shadow-none data-starting-style:[clip-path:var(--morph-seed)]",
          "data-ending-style:opacity-0 data-ending-style:shadow-none data-ending-style:duration-300 data-ending-style:ease-[cubic-bezier(0.4,0,1,1)] data-ending-style:[clip-path:var(--morph-seed)]",
          "motion-reduce:duration-200 motion-reduce:data-starting-style:[clip-path:var(--morph-open)] motion-reduce:data-ending-style:[clip-path:var(--morph-open)]",
          className
        )}
        {...props}
      >
        {/* the body trails the unfold a touch so it reads as being revealed, not wiped */}
        <div
          data-slot="center-morph-modal-body"
          className="contents [&>*]:transition-[opacity,scale,filter] [&>*]:delay-150 [&>*]:duration-400 [&>*]:ease-[cubic-bezier(0.22,1,0.36,1)] group-data-ending-style/morph:[&>*]:opacity-0 group-data-ending-style/morph:[&>*]:delay-0 group-data-ending-style/morph:[&>*]:duration-150 group-data-starting-style/morph:[&>*]:scale-[0.97] group-data-starting-style/morph:[&>*]:opacity-0 group-data-starting-style/morph:[&>*]:blur-[4px] motion-reduce:[&>*]:scale-100 motion-reduce:[&>*]:blur-none motion-reduce:[&>*]:delay-0"
        >
          {children}
        </div>
        {showCloseButton && (
          <DialogPrimitive.Close
            data-slot="center-morph-modal-close"
            aria-label="Close"
            className="absolute top-4 right-4 inline-flex size-8 cursor-pointer items-center justify-center rounded-full text-muted-foreground transition-[color,background-color,opacity] outline-none hover:bg-muted hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring group-data-starting-style/morph:opacity-0"
          >
            <XIcon size={16} />
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Popup>
    </DialogPrimitive.Portal>
  )
}

function CenterMorphModalHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="center-morph-modal-header" className={cn("flex flex-col gap-1.5 pr-8", className)} {...props} />
}

function CenterMorphModalTitle({ className, ...props }: DialogPrimitive.Title.Props) {
  return (
    <DialogPrimitive.Title
      data-slot="center-morph-modal-title"
      className={cn("text-lg leading-snug font-semibold tracking-tight", className)}
      {...props}
    />
  )
}

function CenterMorphModalDescription({ className, ...props }: DialogPrimitive.Description.Props) {
  return (
    <DialogPrimitive.Description
      data-slot="center-morph-modal-description"
      className={cn("text-[0.95rem] leading-relaxed text-muted-foreground", className)}
      {...props}
    />
  )
}

function CenterMorphModalFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="center-morph-modal-footer" className={cn("flex items-center justify-end gap-2 pt-2", className)} {...props} />
  )
}

export {
  CenterMorphModal,
  CenterMorphModalTrigger,
  CenterMorphModalClose,
  CenterMorphModalContent,
  CenterMorphModalHeader,
  CenterMorphModalTitle,
  CenterMorphModalDescription,
  CenterMorphModalFooter,
}
