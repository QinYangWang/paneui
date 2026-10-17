"use client"

import * as React from "react"

import { MenuIcon, SidebarIcon } from "@/components/icons"
import { cn } from "@/lib/utils"
import { Sidebar, SidebarProvider, useSidebar, type SidebarProps } from "@/registry/base-nova/ui/animated-sidebar"
import { Drawer, DrawerContent, DrawerTitle } from "@/registry/base-nova/ui/drawer"

/*
 * App chrome on one grid: a shell-coloured band holds the header row and the rail
 * sidebar, and the content is an inset panel beside them.
 *
 *   <AppShell>
 *     <AppShellHeader>                 ← leading slot holds <AppShellTrigger /> by default
 *       brand, nav, actions            ← start on the sidebar's label column
 *     </AppShellHeader>
 *     <AppShellSidebar>…</AppShellSidebar>   ← rail on desktop, drawer below lg
 *     <AppShellMain>…</AppShellMain>         ← inset panel
 *   </AppShell>
 *
 * Shared geometry, all derived from the sidebar's own variables:
 *   --sidebar-width-icon        rail width; the header's leading column is exactly this wide,
 *                               so the trigger centres on the rail icons in both states.
 *   --app-shell-label-inset     where header content starts: half the rail plus half an icon
 *                               plus the icon-label gap, i.e. the sidebar's label column.
 *   --app-shell-header-height   the header row; sticky offsets read it.
 */

const MOBILE_QUERY = "(width < 64rem)"

function subscribeMobile(onChange: () => void) {
  const mql = window.matchMedia(MOBILE_QUERY)
  mql.addEventListener("change", onChange)
  return () => mql.removeEventListener("change", onChange)
}

/** True below the lg breakpoint, where the sidebar becomes a drawer. False on the server. */
function useIsMobileShell() {
  return React.useSyncExternalStore(
    subscribeMobile,
    () => window.matchMedia(MOBILE_QUERY).matches,
    () => false
  )
}

type AppShellContextValue = {
  variant: "page" | "window"
  isMobile: boolean
  mobileOpen: boolean
  setMobileOpen: (open: boolean) => void
}

const AppShellContext = React.createContext<AppShellContextValue | null>(null)

function useAppShellContext() {
  const ctx = React.useContext(AppShellContext)
  if (!ctx) throw new Error("AppShell parts must be used inside <AppShell>")
  return ctx
}

/** Shell state plus the sidebar's own (`open`, `toggle`, …). */
function useAppShell() {
  const shell = useAppShellContext()
  const sidebar = useSidebar()
  return { ...sidebar, variant: shell.variant, isMobile: shell.isMobile, mobileOpen: shell.mobileOpen, setMobileOpen: shell.setMobileOpen }
}

type AppShellProps = React.ComponentProps<"div"> & {
  /**
   * `page`: fills the viewport; header and rail stick while the page scrolls.
   * `window`: a bounded, rounded frame whose panel scrolls on its own (give it a height).
   */
  variant?: "page" | "window"
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  /** ⌘/Ctrl key that toggles the rail. `null` turns it off. */
  shortcut?: string | null
}

function AppShell({
  variant = "page",
  open,
  defaultOpen = true,
  onOpenChange,
  shortcut = "b",
  className,
  style,
  ...props
}: AppShellProps) {
  const isMobile = useIsMobileShell()
  const [mobileOpen, setMobileOpen] = React.useState(false)

  // A drawer left open while the window grows past the breakpoint would reappear later.
  React.useEffect(() => {
    if (!isMobile) setMobileOpen(false)
  }, [isMobile])

  const ctx = React.useMemo(() => ({ variant, isMobile, mobileOpen, setMobileOpen }), [variant, isMobile, mobileOpen])

  return (
    <AppShellContext.Provider value={ctx}>
      <SidebarProvider
        open={open}
        defaultOpen={defaultOpen}
        onOpenChange={onOpenChange}
        shortcut={shortcut}
        data-slot="app-shell"
        data-variant={variant}
        style={
          {
            "--app-shell-header-height": "3rem",
            "--app-shell-label-inset": "calc(var(--sidebar-width-icon) / 2 + 1.0625rem)",
            ...style,
          } as React.CSSProperties
        }
        className={cn(
          "grid grid-cols-[auto_minmax(0,1fr)] bg-shell text-foreground",
          variant === "page"
            ? "min-h-svh grid-rows-[auto_1fr]"
            : // window corners: the panel sits 3px in from the bottom-right edge, so it follows the frame
              // sidebar rows sit 8px in from the window's left corners
              "frame-3xl frame-inset-0.75 grid-rows-[auto_minmax(0,1fr)] overflow-hidden shadow-raised [--sidebar-item-radius:calc(var(--radius-3xl)-var(--spacing)*2)]",
          className
        )}
        {...props}
      />
    </AppShellContext.Provider>
  )
}

type AppShellHeaderProps = React.ComponentProps<"header"> & {
  /** Content of the rail-wide leading column. Defaults to `<AppShellTrigger />`; `null` leaves it empty. */
  leading?: React.ReactNode
}

function AppShellHeader({ leading = <AppShellTrigger />, className, children, ...props }: AppShellHeaderProps) {
  const { variant } = useAppShellContext()
  return (
    <header
      data-slot="app-shell-header"
      className={cn(
        "col-span-full flex h-(--app-shell-header-height) min-w-0 items-center bg-shell pe-3",
        variant === "page" && "sticky top-0 z-40",
        className
      )}
      {...props}
    >
      {/* The slot ends on the label column; the trigger is centred in a rail-wide box inside it. */}
      <div data-slot="app-shell-header-leading" className="relative h-full w-(--app-shell-label-inset) shrink-0">
        <div className="absolute inset-y-0 start-0 grid w-(--sidebar-width-icon) place-items-center">{leading}</div>
      </div>
      <div data-slot="app-shell-header-content" className="flex h-full min-w-0 flex-1 items-center gap-1.5">
        {children}
      </div>
    </header>
  )
}

/** Toggles the rail on desktop and opens the drawer below lg. */
function AppShellTrigger({ className, onClick, ...props }: React.ComponentProps<"button">) {
  const { open, toggle, isMobile, mobileOpen, setMobileOpen } = useAppShell()
  const label = isMobile ? "Open navigation" : open ? "Collapse sidebar" : "Expand sidebar"
  return (
    <button
      type="button"
      data-slot="app-shell-trigger"
      data-state={open ? "expanded" : "collapsed"}
      aria-expanded={isMobile ? mobileOpen : open}
      onClick={(e) => {
        onClick?.(e)
        if (e.defaultPrevented) return
        // read the query at click time, so the first tap is right even before the store syncs
        if (window.matchMedia(MOBILE_QUERY).matches) setMobileOpen(true)
        else toggle()
      }}
      className={cn(
        "inline-flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-lg text-muted-foreground outline-none",
        "transition-[background-color,color] duration-150 ease-out hover:bg-secondary hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/50 [&_svg]:size-4",
        className
      )}
      {...props}
      aria-label={props["aria-label"] ?? label}
    >
      <SidebarIcon className="max-lg:hidden" />
      <MenuIcon className="lg:hidden" />
    </button>
  )
}

type AppShellSidebarProps = Omit<SidebarProps, "variant"> & {
  /** Title of the drawer the sidebar becomes below lg. Lead it with an 18px mark to land on the icon column. */
  mobileTitle?: React.ReactNode
}

function AppShellSidebar({
  mobileTitle,
  className,
  panelClassName,
  children,
  "aria-label": ariaLabel = "Sidebar",
  ...props
}: AppShellSidebarProps) {
  const { variant, isMobile, mobileOpen, setMobileOpen } = useAppShellContext()
  return (
    <>
      <Sidebar
        variant="sidebar"
        aria-label={ariaLabel}
        // on the band with no seam: the panel's hairline draws the edge
        panelClassName={cn("border-x-0", panelClassName)}
        className={cn(
          "col-start-1 row-start-2 max-lg:hidden",
          variant === "page" &&
            // eslint-disable-next-line shadcn/no-arbitrary-values -- the viewport below the header row
            "sticky top-(--app-shell-header-height) h-[calc(100svh-var(--app-shell-header-height))] self-start",
          className
        )}
        {...props}
      >
        {children}
      </Sidebar>
      {isMobile && (
        <Drawer side="left" open={mobileOpen} onOpenChange={setMobileOpen}>
          {/* eslint-disable-next-line shadcn/no-arbitrary-values -- 20rem drawer that never exceeds the viewport minus a 1rem gutter */}
          <DrawerContent className="w-[min(20rem,calc(100vw-1rem))]">
            {/* The drawer is portalled out of the shell, so it opens its own provider for the sidebar variables. */}
            <SidebarProvider
              shortcut={null}
              className="min-h-0 flex-1 flex-col"
              style={{ "--sidebar-width": "100%" } as React.CSSProperties}
              // a link inside the drawer navigates, so the drawer has done its job
              onClickCapture={(e) => {
                if ((e.target as HTMLElement).closest("a[href]")) setMobileOpen(false)
              }}
            >
              {/* Same height as the close button's band; an 18px mark leading the title centres on the icon column. */}
              {/* eslint-disable-next-line shadcn/no-arbitrary-values -- half the rail minus half the 18px mark */}
              <div className="flex h-16 shrink-0 items-center ps-[calc(var(--sidebar-width-icon)/2_-_0.5625rem)] pe-14">
                <DrawerTitle className="flex min-w-0 items-center gap-2 text-ui-lg font-semibold">{mobileTitle ?? "Navigation"}</DrawerTitle>
              </div>
              <Sidebar
                variant="sidebar"
                collapsible="none"
                aria-label={ariaLabel}
                className="min-h-0 flex-1"
                panelClassName="border-x-0 bg-transparent"
              >
                {children}
              </Sidebar>
            </SidebarProvider>
          </DrawerContent>
        </Drawer>
      )}
    </>
  )
}

/**
 * The inset panel. In `page` shells it scrolls with the page and a sticky cap redraws its
 * rounded top under the header; keep at least 1rem of top padding in your content.
 */
function AppShellMain({ className, children, ...props }: React.ComponentProps<"main">) {
  const { variant } = useAppShellContext()
  return (
    <main
      data-slot="app-shell-main"
      className={cn(
        // The hairline is an inset ring, not a border: a 0.5px border is snapped to a whole pixel
        // in some browsers, which would shift the cap below off the panel's edge.
        // eslint-disable-next-line shadcn/no-arbitrary-values -- 0.5px hairline: one device pixel on high-density screens
        "relative col-start-2 row-start-2 min-w-0 bg-background inset-ring-[0.5px] inset-ring-shell-border me-0.75 mb-0.75 max-lg:ms-0.75",
        variant === "page" ? "rounded-shell" : "overflow-y-auto overscroll-contain rounded-inner",
        className
      )}
      {...props}
    >
      {variant === "page" && (
        <div aria-hidden data-slot="app-shell-cap" className="pointer-events-none sticky top-(--app-shell-header-height) z-30 h-0">
          {/* The band colour fills the square corners; the taller rounded face is clipped to the cap so its ring has no bottom edge. */}
          <div className="absolute inset-x-0 top-0 h-4 overflow-hidden bg-shell">
            {/* eslint-disable-next-line shadcn/no-arbitrary-values -- the same 0.5px hairline as the panel */}
            <div className="h-8 rounded-t-shell bg-background inset-ring-[0.5px] inset-ring-shell-border" />
          </div>
        </div>
      )}
      {children}
    </main>
  )
}

export { AppShell, AppShellHeader, AppShellTrigger, AppShellSidebar, AppShellMain, useAppShell }
export type { AppShellProps, AppShellHeaderProps, AppShellSidebarProps }
