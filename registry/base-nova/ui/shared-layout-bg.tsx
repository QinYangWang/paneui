"use client"

import * as React from "react"
import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"

/*
 * A hover highlight shared by a group of items: one raised pill glides between
 * whichever item is hovered or focused (motion shared layout), blurs in when the
 * pointer enters the group and blurs out when it leaves. Works for menus, nav
 * links, lists and rows; follows keyboard focus as well as the pointer.
 */

const PILL_SPRING = { type: "spring", stiffness: 380, damping: 32, mass: 0.6 } as const

type SharedLayoutBgContextValue = {
  active: string | null
  setActive: (id: string | null) => void
  layoutId: string
  pillClassName?: string
  inset: number
  reduce: boolean
}

const SharedLayoutBgContext = React.createContext<SharedLayoutBgContextValue | null>(null)

function SharedLayoutBg({
  className,
  pillClassName,
  inset = 0,
  orientation = "vertical",
  onPointerLeave,
  onBlur,
  ...props
}: React.ComponentProps<"div"> & {
  /** Classes for the gliding pill (colour, radius, shadow). */
  pillClassName?: string
  /** How far (px) the pill reaches past each item horizontally. */
  inset?: number
  orientation?: "vertical" | "horizontal"
}) {
  const [active, setActive] = React.useState<string | null>(null)
  const layoutId = `shared-layout-bg-${React.useId()}`
  const reduce = useReducedMotion() ?? false

  const ctx = React.useMemo(
    () => ({ active, setActive, layoutId, pillClassName, inset, reduce }),
    [active, layoutId, pillClassName, inset, reduce]
  )

  return (
    <SharedLayoutBgContext.Provider value={ctx}>
      <div
        data-slot="shared-layout-bg"
        data-orientation={orientation}
        onPointerLeave={(e) => {
          onPointerLeave?.(e)
          setActive(null)
        }}
        onBlur={(e) => {
          onBlur?.(e)
          // focus moved outside the group entirely
          if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setActive(null)
        }}
        className={cn("flex data-[orientation=horizontal]:flex-row data-[orientation=vertical]:flex-col", className)}
        {...props}
      />
    </SharedLayoutBgContext.Provider>
  )
}

function SharedLayoutBgItem({
  render,
  className,
  children,
  disabled,
  ...props
}: useRender.ComponentProps<"div"> & { disabled?: boolean }) {
  const ctx = React.useContext(SharedLayoutBgContext)
  if (!ctx) throw new Error("SharedLayoutBgItem must be used within <SharedLayoutBg>")
  const id = React.useId()
  const { active, setActive, layoutId, pillClassName, inset, reduce } = ctx
  const groupActive = active !== null

  const content = (
    <>
      {/* Every item keeps a wrapper while the group is active, so the pill only
          blurs in on entering the group and out on leaving; moving between
          items is a pure shared-layout glide of the inner pill. */}
      <AnimatePresence initial={false}>
        {groupActive && (
          <motion.span
            aria-hidden
            initial={{ opacity: 0, filter: reduce ? "blur(0px)" : "blur(6px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: reduce ? "blur(0px)" : "blur(6px)" }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-none absolute inset-y-0 block"
            style={{ left: -inset, right: -inset }}
          >
            {active === id && (
              <motion.span
                layoutId={layoutId}
                transition={reduce ? { duration: 0 } : PILL_SPRING}
                className={cn(
                  "block size-full rounded-xl bg-secondary shadow-raised",
                  pillClassName
                )}
              />
            )}
          </motion.span>
        )}
      </AnimatePresence>
      <span className="relative z-10 flex min-w-0 flex-1 items-center gap-[inherit]">{children}</span>
    </>
  )

  return useRender({
    defaultTagName: "div",
    render,
    props: mergeProps<"div">(
      {
        "data-slot": "shared-layout-bg-item",
        "data-active": active === id ? "" : undefined,
        "aria-disabled": disabled || undefined,
        className: cn("relative flex items-center", disabled && "pointer-events-none opacity-50", className),
        onPointerEnter: () => {
          if (!disabled) setActive(id)
        },
        onFocus: () => {
          if (!disabled) setActive(id)
        },
      } as React.ComponentProps<"div">,
      props,
      { children: content }
    ),
  })
}

export { SharedLayoutBg, SharedLayoutBgItem }
