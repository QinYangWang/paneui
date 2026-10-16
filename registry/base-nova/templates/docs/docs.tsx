"use client"

import * as React from "react"

import { CommandPalette } from "@/registry/base-nova/blocks/command-palette/command-palette"
import { Drawer, DrawerContent, DrawerTitle } from "@/registry/base-nova/ui/drawer"

import { DocsChromeContext } from "./parts/chrome"
import { DocsNav } from "./parts/docs-nav"
import { ClassicLayout, FluxLayout, HomeLayout, NotebookLayout, SpaciousLayout } from "./parts/layouts"
import { SEARCH_ITEMS } from "./parts/site"

export type DocsLayout = "classic" | "notebook" | "flux" | "spacious" | "home"

const LAYOUTS: Record<DocsLayout, React.ComponentType> = {
  classic: ClassicLayout,
  notebook: NotebookLayout,
  flux: FluxLayout,
  spacious: SpaciousLayout,
  home: HomeLayout,
}

/**
 * A documentation site in one of five layouts. Every layout shares the header parts, the page
 * tree, the search palette and the navigation drawer; `layout` decides where they sit.
 */
export function DocsTemplate({ layout = "classic" }: { layout?: DocsLayout }) {
  const [navOpen, setNavOpen] = React.useState(false)
  const [searchOpen, setSearchOpen] = React.useState(false)
  const chrome = React.useMemo(() => ({ openSearch: () => setSearchOpen(true), openNav: () => setNavOpen(true) }), [])
  const Layout = LAYOUTS[layout]

  return (
    <DocsChromeContext.Provider value={chrome}>
      <Layout />
      <Drawer side="left" open={navOpen} onOpenChange={setNavOpen}>
        <DrawerContent className="w-72">
          <DrawerTitle className="sr-only">Docs navigation</DrawerTitle>
          <div className="flex min-h-0 flex-1 flex-col pt-8">
            <DocsNav />
          </div>
        </DrawerContent>
      </Drawer>
      <CommandPalette items={SEARCH_ITEMS} open={searchOpen} onOpenChange={setSearchOpen} placeholder="Search docs…" />
    </DocsChromeContext.Provider>
  )
}
