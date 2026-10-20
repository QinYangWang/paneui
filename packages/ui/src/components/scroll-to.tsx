"use client"

import * as React from "react"
import type { VariantProps } from "class-variance-authority"

import { Button, buttonVariants } from "@paneui/ui/components/button"
import { type ScrollTarget, useSmoothScroll } from "@paneui/ui/components/smooth-scroll"

type ScrollToProps = Omit<React.ComponentProps<typeof Button>, "onClick"> &
  VariantProps<typeof buttonVariants> & {
    /** Where to go: a px offset, a CSS selector or an element. */
    to: ScrollTarget
    /** Extra px from the target, e.g. -64 to clear a sticky header. */
    offset?: number
    /** Ease duration in seconds (eased path only). */
    duration?: number
    /** Move keyboard focus to the target after scrolling (selector / element targets). */
    focusTarget?: boolean
    onClick?: React.MouseEventHandler<HTMLButtonElement>
  }

/**
 * Button that eases to a target through the nearest SmoothScroll, or native
 * smooth scrolling when there is none. Jumps instantly under reduced motion.
 */
function ScrollTo({ to, offset, duration, focusTarget = false, onClick, ...props }: ScrollToProps) {
  const { scrollTo, container } = useSmoothScroll()

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(event)
    if (event.defaultPrevented) return
    scrollTo(to, { offset, duration })
    if (!focusTarget || typeof to === "number") return
    const root: ParentNode = container?.current ?? document
    const el = typeof to === "string" ? root.querySelector<HTMLElement>(to) : to
    if (!el) return
    if (!el.hasAttribute("tabindex")) el.setAttribute("tabindex", "-1")
    el.focus({ preventScroll: true })
  }

  return <Button data-slot="scroll-to" variant="secondary" onClick={handleClick} {...props} />
}

export { ScrollTo, type ScrollToProps }
