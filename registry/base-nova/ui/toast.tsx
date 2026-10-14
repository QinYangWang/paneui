"use client"

import * as React from "react"
import { Toast as ToastPrimitive } from "@base-ui/react/toast"

import { CheckCircleIcon, InfoIcon, LoaderIcon, WarningIcon, XCircleIcon, XIcon } from "@/components/icons"
import { cn } from "@/lib/utils"

/** Wrap your app once. Renders the stacked toast viewport bottom-right. */
function ToastProvider({ children, limit = 3, timeout = 5000, ...props }: ToastPrimitive.Provider.Props) {
  return (
    <ToastPrimitive.Provider limit={limit} timeout={timeout} {...props}>
      {children}
      <ToastPrimitive.Portal>
        <ToastPrimitive.Viewport
          data-slot="toast-viewport"
          className="fixed right-4 bottom-4 z-[60] mx-auto flex w-[calc(100%-2rem)] sm:right-6 sm:bottom-6 sm:w-90"
        >
          <ToastList />
        </ToastPrimitive.Viewport>
      </ToastPrimitive.Portal>
    </ToastPrimitive.Provider>
  )
}

const typeIcon: Record<string, React.ReactNode> = {
  success: <CheckCircleIcon className="text-success" />,
  error: <XCircleIcon className="text-destructive" />,
  warning: <WarningIcon className="text-warning" />,
  info: <InfoIcon className="text-primary" />,
  loading: <LoaderIcon className="animate-spin text-muted-foreground" />,
}

function ToastList() {
  const { toasts } = ToastPrimitive.useToastManager()
  return toasts.map((toast) => (
    <ToastPrimitive.Root
      key={toast.id}
      toast={toast}
      data-slot="toast"
      className={cn(
        // stacking math (Base UI css vars)
        "[--gap:0.75rem] [--peek:0.6rem] [--scale:calc(max(0,1_-_(var(--toast-index)_*_0.06)))] [--shrink:calc(1_-_var(--scale))] [--height:var(--toast-frontmost-height,var(--toast-height))] [--offset-y:calc(var(--toast-offset-y)_*_-1_+_(var(--toast-index)_*_var(--gap)_*_-1)_+_var(--toast-swipe-movement-y))]",
        "absolute right-0 bottom-0 left-0 z-[calc(1000_-_var(--toast-index))] h-(--height) origin-bottom select-none",
        "[transform:translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--toast-swipe-movement-y)_-_(var(--toast-index)_*_var(--peek))_-_(var(--shrink)_*_var(--height))))_scale(var(--scale))]",
        "data-expanded:h-(--toast-height) data-expanded:[transform:translateX(var(--toast-swipe-movement-x))_translateY(var(--offset-y))]",
        "data-starting-style:[transform:translateY(150%)] data-ending-style:opacity-0 data-ending-style:[transform:translateY(150%)] data-limited:opacity-0",
        "data-ending-style:data-[swipe-direction=right]:[transform:translateX(calc(var(--toast-swipe-movement-x)_+_150%))_translateY(var(--offset-y))]",
        "data-ending-style:data-[swipe-direction=down]:[transform:translateY(calc(var(--toast-swipe-movement-y)_+_150%))]",
        "transition-[transform,opacity,height] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] data-swiping:duration-0",
        "after:absolute after:top-full after:left-0 after:h-[calc(var(--gap)_+_1px)] after:w-full after:content-['']",
        "rounded-xl bg-popover text-popover-foreground shadow-surface"
      )}
    >
      <ToastPrimitive.Content className="flex items-start gap-3 overflow-hidden p-4 pr-10 transition-opacity duration-300 data-behind:opacity-0 data-expanded:opacity-100 [&_svg]:size-4.5 [&_svg]:shrink-0">
        {toast.type && typeIcon[toast.type] && <span className="mt-px flex">{typeIcon[toast.type]}</span>}
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <ToastPrimitive.Title className="text-sm font-medium" />
          <ToastPrimitive.Description className="text-sm text-muted-foreground" />
          {toast.actionProps && (
            <ToastPrimitive.Action className="mt-2 inline-flex h-7 w-fit cursor-pointer items-center rounded-md bg-secondary px-2.5 text-xs font-medium shadow-raised transition-[box-shadow,background-color,scale] duration-150 ease-out hover:bg-accent hover:shadow-raised-hover active:scale-96" />
          )}
        </div>
        <ToastPrimitive.Close
          aria-label="Close"
          className="absolute top-3 right-3 inline-flex size-6 cursor-pointer items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground [&_svg]:!size-3.5"
        >
          <XIcon />
        </ToastPrimitive.Close>
      </ToastPrimitive.Content>
    </ToastPrimitive.Root>
  ))
}

/** `const toast = useToast(); toast.add({ title, description, type: "success" })` */
const useToast = ToastPrimitive.useToastManager

export { ToastProvider, useToast }
